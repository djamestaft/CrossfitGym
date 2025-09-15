/**
 * Comprehensive tests for FMS form localStorage functionality
 * These tests verify the form state persistence, recovery, and cleanup behavior
 */

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'
import { FMSForm } from '../../components/fms-form'

// Mock fetch
global.fetch = jest.fn()

// Mock gtag for analytics
const mockGtag = jest.fn()
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
})

// Mock @marsidev/react-turnstile Turnstile component
jest.mock('@/components/turnstile', () => ({
  Turnstile: ({ onTokenChange, onError }: any) => {
    // Mock Turnstile component with auto-success for testing
    React.useEffect(() => {
      if (onTokenChange) {
        onTokenChange('mock-turnstile-token')
      }
    }, [onTokenChange])
    return <div data-testid="turnstile-mock">Turnstile Mock</div>
  },
}))

// Mock Next.js environment
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
})

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

describe('FMS Form localStorage Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    ;(fetch as jest.Mock).mockClear()
    mockGtag.mockClear()
    mockLocalStorage.getItem.mockClear()
    mockLocalStorage.setItem.mockClear()
    mockLocalStorage.removeItem.mockClear()

    // Default localStorage behavior - no saved data
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Initial load behavior', () => {
    it('should load default form data when localStorage is empty', () => {
      render(<FMSForm />)

      // Check that default empty form is rendered
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
      expect(screen.getByLabelText(/phone number/i)).toHaveValue('')

      // Should have attempted to read from localStorage
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('fms_form_data')
    })

    it('should load saved form data from localStorage on mount', () => {
      const savedData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0412345678',
        preferredTime: 'afternoon',
        goals: 'Improve flexibility',
        injuryFlags: ['None of the above'],
        experience: 'intermediate',
      }

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedData))

      render(<FMSForm />)

      expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Smith')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('jane@example.com')
      expect(screen.getByLabelText(/phone number/i)).toHaveValue('0412345678')
    })

    it('should handle corrupted localStorage data gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json-string')

      render(<FMSForm />)

      // Should still render with default values
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('should handle localStorage read errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      render(<FMSForm />)

      // Should still render with default values
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    // Note: SSR test is skipped due to testing environment complexity
  })

  describe('Form data saving behavior', () => {
    it('should save form data to localStorage on every field change', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup()
      render(<FMSForm />)

      // Type in name field
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      })

      // Should save to localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'fms_form_data',
        expect.stringContaining('"name":"John Doe"')
      )

      // Clear mock to test next save
      mockLocalStorage.setItem.mockClear()

      // Type in email field
      await act(async () => {
        await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      })

      // Should save again with updated data
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'fms_form_data',
        expect.stringContaining('"email":"john@example.com"')
      )
    })

    it('should save complete form state including all fields', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      // Fill out all fields in step 1
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Alice Johnson')
        await user.type(screen.getByLabelText(/email address/i), 'alice@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/morning/i))
      })

      // Should save complete form data
      const savedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1])
      expect(savedData).toEqual({
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '0412345678',
        preferredTime: 'morning',
        goals: '',
        injuryFlags: [],
        experience: '',
      })
    })

    it('should persist step 2 data when navigating between steps', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      // Complete step 1
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Bob Wilson')
        await user.type(screen.getByLabelText(/email address/i), 'bob@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/afternoon/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      // Fill step 2 fields
      await act(async () => {
        await user.type(
          screen.getByLabelText(/what are your movement goals/i),
          'Build strength and improve mobility'
        )
        await user.click(screen.getByLabelText(/beginner/i))
      })

      // Should save step 2 data
      const latestSave = JSON.parse(mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1][1])
      expect(latestSave.goals).toBe('Build strength and improve mobility')
      expect(latestSave.experience).toBe('beginner')
    })

    it('should handle injury flag selection in localStorage', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      // Complete step 1
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Carol Davis')
        await user.type(screen.getByLabelText(/email address/i), 'carol@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/evening/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      // Select injury flags
      await act(async () => {
        await user.click(screen.getByLabelText(/current pain or injury/i))
        await user.click(screen.getByLabelText(/chronic condition/i))
      })

      // Should save injury flags
      const latestSave = JSON.parse(mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1][1])
      expect(latestSave.injuryFlags).toEqual(['Current pain or injury', 'Chronic condition'])
    })

    it('should handle mutual exclusion of "None of the above" with other injury flags', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      // Complete step 1
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'David Miller')
        await user.type(screen.getByLabelText(/email address/i), 'david@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/morning/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      // Select "None of the above" - should clear other flags
      await act(async () => {
        await user.click(screen.getByLabelText(/current pain or injury/i))
        await user.click(screen.getByLabelText(/none of the above/i))
      })

      // Should only have "None of the above" selected
      const latestSave = JSON.parse(mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1][1])
      expect(latestSave.injuryFlags).toEqual(['None of the above'])
    })

    it('should handle localStorage write errors gracefully', async () => {
      const user = userEvent.setup()
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      render(<FMSForm />)

      // Form should still function despite localStorage errors
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Eve Wilson')
      })

      // Input should still work
      expect(screen.getByLabelText(/full name/i)).toHaveValue('Eve Wilson')
    })
  })

  describe('Form state cleanup after submission', () => {
    it('should clear localStorage after successful submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          submissionId: 'fms_test_123',
          nextSteps: {
            contactWindow: '1 business day',
            assessmentDuration: '45 minutes',
            preparation: 'Wear comfortable workout clothes',
          },
        }),
      })

      render(<FMSForm />)

      // Fill and submit form
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Frank Garcia')
        await user.type(screen.getByLabelText(/email address/i), 'frank@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/morning/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      await act(async () => {
        await user.type(
          screen.getByLabelText(/what are your movement goals/i),
          'Improve overall fitness'
        )
        await user.click(screen.getByLabelText(/beginner/i))
        await user.click(screen.getByText('Book My Assessment'))
      })

      // Wait for successful submission
      await waitFor(() => {
        expect(screen.getByText('Thank You!')).toBeInTheDocument()
      })

      // localStorage should be cleared
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('fms_form_data')
    })

    it('should not clear localStorage on failed submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          message: 'Server error occurred',
        }),
      })

      render(<FMSForm />)

      // Fill and submit form
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Grace Lee')
        await user.type(screen.getByLabelText(/email address/i), 'grace@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/afternoon/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      await act(async () => {
        await user.type(
          screen.getByLabelText(/what are your movement goals/i),
          'Recover from injury'
        )
        await user.click(screen.getByLabelText(/intermediate/i))
        await user.click(screen.getByText('Book My Assessment'))
      })

      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText('Server error occurred')).toBeInTheDocument()
      })

      // localStorage should NOT be cleared
      expect(mockLocalStorage.removeItem).not.toHaveBeenCalled()
    })

    it('should handle localStorage removal errors gracefully', async () => {
      const user = userEvent.setup()
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          submissionId: 'fms_test_123',
          nextSteps: {
            contactWindow: '1 business day',
            assessmentDuration: '45 minutes',
            preparation: 'Wear comfortable workout clothes',
          },
        }),
      })

      render(<FMSForm />)

      // Fill and submit form
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Henry Chen')
        await user.type(screen.getByLabelText(/email address/i), 'henry@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/evening/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      await act(async () => {
        await user.type(
          screen.getByLabelText(/what are your movement goals/i),
          'Build muscle mass'
        )
        await user.click(screen.getByLabelText(/advanced/i))
        await user.click(screen.getByText('Book My Assessment'))
      })

      // Should still show success despite localStorage error
      await waitFor(() => {
        expect(screen.getByText('Thank You!')).toBeInTheDocument()
      })
    })
  })

  describe('Form recovery after page refresh', () => {
    it('should restore form progress after simulated page refresh', async () => {
      const user = userEvent.setup()

      // Simulate filling form step 1
      const { rerender } = render(<FMSForm />)

      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Iris Brown')
        await user.type(screen.getByLabelText(/email address/i), 'iris@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/morning/i))
      })

      // Simulate page refresh by re-rendering component
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
        name: 'Iris Brown',
        email: 'iris@example.com',
        phone: '0412345678',
        preferredTime: 'morning',
        goals: '',
        injuryFlags: [],
        experience: '',
      }))

      rerender(<FMSForm />)

      // Form should be restored
      expect(screen.getByLabelText(/full name/i)).toHaveValue('Iris Brown')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('iris@example.com')
      expect(screen.getByLabelText(/phone number/i)).toHaveValue('0412345678')
      expect(screen.getByLabelText(/morning/i)).toBeChecked()
    })

    it('should restore step 2 progress after simulated page refresh', async () => {
      const user = userEvent.setup()

      // Fill complete form
      const { rerender } = render(<FMSForm />)

      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Jack Taylor')
        await user.type(screen.getByLabelText(/email address/i), 'jack@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/afternoon/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      await act(async () => {
        await user.type(
          screen.getByLabelText(/what are your movement goals/i),
          'Prepare for marathon running'
        )
        await user.click(screen.getByLabelText(/advanced/i))
      })

      // Simulate page refresh with saved step 2 data
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
        name: 'Jack Taylor',
        email: 'jack@example.com',
        phone: '0412345678',
        preferredTime: 'afternoon',
        goals: 'Prepare for marathon running',
        injuryFlags: [],
        experience: 'advanced',
      }))

      rerender(<FMSForm />)

      // Should restore step 2 state
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      expect(screen.getByLabelText(/what are your movement goals/i)).toHaveValue('Prepare for marathon running')
      expect(screen.getByLabelText(/advanced/i)).toBeChecked()
    })

    it('should restore injury flags after simulated page refresh', async () => {
      const user = userEvent.setup()

      const { rerender } = render(<FMSForm />)

      // Complete step 1
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Karen White')
        await user.type(screen.getByLabelText(/email address/i), 'karen@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/evening/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      // Select injury flags
      await act(async () => {
        await user.click(screen.getByLabelText(/previous surgery/i))
        await user.click(screen.getByLabelText(/recent accident\/trauma/i))
      })

      // Simulate page refresh
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
        name: 'Karen White',
        email: 'karen@example.com',
        phone: '0412345678',
        preferredTime: 'evening',
        goals: '',
        injuryFlags: ['Previous surgery', 'Recent accident/trauma'],
        experience: '',
      }))

      rerender(<FMSForm />)

      // Should restore injury flags
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      expect(screen.getByLabelText(/previous surgery/i)).toBeChecked()
      expect(screen.getByLabelText(/recent accident\/trauma/i)).toBeChecked()
    })
  })

  describe('Edge cases and error handling', () => {
    it('should handle localStorage quota exceeded during save', async () => {
      const user = userEvent.setup()
      let callCount = 0
      mockLocalStorage.setItem.mockImplementation(() => {
        callCount++
        if (callCount > 2) {
          throw new Error('Storage quota exceeded')
        }
      })

      render(<FMSForm />)

      // Should work initially
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Leo Zhang')
      })

      expect(screen.getByLabelText(/full name/i)).toHaveValue('Leo Zhang')

      // Should continue to work even after quota exceeded
      await act(async () => {
        await user.type(screen.getByLabelText(/email address/i), 'leo@example.com')
      })

      expect(screen.getByLabelText(/email address/i)).toHaveValue('leo@example.com')
    })

    it('should handle malformed JSON in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('{"name": "Test", "email": "test@example.com"')

      render(<FMSForm />)

      // Should render with default values
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('should handle empty string in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('')

      render(<FMSForm />)

      // Should render with default values
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('should handle null value in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('null')

      render(<FMSForm />)

      // Should render with default values
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('should handle undefined value in localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('undefined')

      render(<FMSForm />)

      // Should render with default values
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('should handle localStorage being disabled', () => {
      // Mock localStorage being completely disabled
      Object.defineProperty(window, 'localStorage', {
        value: null,
        writable: true,
      })

      render(<FMSForm />)

      // Should render with default values without crashing
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('should handle localStorage methods being undefined', () => {
      // Mock localStorage with undefined methods
      Object.defineProperty(window, 'localStorage', {
        value: {},
        writable: true,
      })

      render(<FMSForm />)

      // Should render with default values without crashing
      expect(screen.getByLabelText(/full name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('should handle extremely large form data', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      // Type a very long goals text
      const longText = 'A'.repeat(10000)

      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Max Power')
        await user.type(screen.getByLabelText(/email address/i), 'max@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/morning/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      await act(async () => {
        await user.type(screen.getByLabelText(/what are your movement goals/i), longText)
      })

      // Should attempt to save large data
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
      const savedData = JSON.parse(mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1][1])
      expect(savedData.goals).toBe(longText)
    })
  })

  describe('Form abandonment tracking', () => {
    it('should track form abandonment when user starts but doesn\'t complete', () => {
      const { unmount } = render(<FMSForm />)

      // Start filling form
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'Noah Davis' },
      })

      unmount()

      // Should track abandonment
      expect(mockGtag).toHaveBeenCalledWith('event', 'fms_form_abandon', {
        event_category: 'engagement',
        event_label: 'abandoned_step_1',
        value: expect.any(Number),
        custom_parameters: {
          form_id: 'fms_assessment',
          step_number: 1,
          time_spent_seconds: expect.any(Number),
        },
      })
    })

    it('should not track abandonment if form was not started', () => {
      const { unmount } = render(<FMSForm />)
      unmount()

      expect(mockGtag).not.toHaveBeenCalledWith('event', 'fms_form_abandon', expect.any(Object))
    })

    it('should track abandonment from step 2', async () => {
      const user = userEvent.setup()
      const { unmount } = render(<FMSForm />)

      // Complete step 1
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Olivia Martinez')
        await user.type(screen.getByLabelText(/email address/i), 'olivia@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/afternoon/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      unmount()

      // Should track abandonment from step 2
      expect(mockGtag).toHaveBeenCalledWith('event', 'fms_form_abandon', {
        event_category: 'engagement',
        event_label: 'abandoned_step_2',
        value: expect.any(Number),
        custom_parameters: {
          form_id: 'fms_assessment',
          step_number: 2,
          time_spent_seconds: expect.any(Number),
        },
      })
    })

    it('should not track abandonment if form was successfully submitted', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          submissionId: 'fms_test_123',
          nextSteps: {
            contactWindow: '1 business day',
            assessmentDuration: '45 minutes',
            preparation: 'Wear comfortable workout clothes',
          },
        }),
      })

      const { unmount } = render(<FMSForm />)

      // Fill and submit form
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Paul Johnson')
        await user.type(screen.getByLabelText(/email address/i), 'paul@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/morning/i))
        await user.click(screen.getByText('Continue to Step 2'))
      })

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      })

      await act(async () => {
        await user.type(
          screen.getByLabelText(/what are your movement goals/i),
          'Get in shape'
        )
        await user.click(screen.getByLabelText(/beginner/i))
        await user.click(screen.getByText('Book My Assessment'))
      })

      // Wait for successful submission
      await waitFor(() => {
        expect(screen.getByText('Thank You!')).toBeInTheDocument()
      })

      // Clear gtag calls
      mockGtag.mockClear()

      unmount()

      // Should not track abandonment after successful submission
      expect(mockGtag).not.toHaveBeenCalledWith('event', 'fms_form_abandon', expect.any(Object))
    })

    it('should include accurate time tracking in abandonment events', () => {
      const { unmount } = render(<FMSForm />)

      // Start filling form
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'Quinn Roberts' },
      })

      // Advance time
      act(() => {
        jest.advanceTimersByTime(5000) // 5 seconds
      })

      unmount()

      // Should track abandonment with time spent
      expect(mockGtag).toHaveBeenCalledWith('event', 'fms_form_abandon', {
        event_category: 'engagement',
        event_label: 'abandoned_step_1',
        value: expect.any(Number),
        custom_parameters: {
          form_id: 'fms_assessment',
          step_number: 1,
          time_spent_seconds: expect.any(Number),
        },
      })

      // Verify time spent is reasonable
      const timeSpent = mockGtag.mock.calls[0][1].value
      expect(timeSpent).toBeGreaterThanOrEqual(4) // At least 4 seconds
      expect(timeSpent).toBeLessThanOrEqual(6) // At most 6 seconds
    })

    it('should handle gtag being unavailable during abandonment tracking', () => {
      // Mock gtag being undefined
      const originalGtag = (window as any).gtag
      delete (window as any).gtag

      const { unmount } = render(<FMSForm />)

      // Start filling form
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'Ruby Wilson' },
      })

      expect(() => {
        unmount()
      }).not.toThrow()

      // Restore gtag
      (window as any).gtag = originalGtag
    })
  })

  describe('Performance and optimization', () => {
    it('should not save to localStorage more frequently than needed', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      // Clear initial save calls
      mockLocalStorage.setItem.mockClear()

      // Type multiple characters quickly
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Sophie Chen')
      })

      // Should have saved, but not excessively
      expect(mockLocalStorage.setItem.mock.calls.length).toBeLessThan(15)
    })

    it('should handle rapid successive saves gracefully', async () => {
      const user = userEvent.setup()
      let saveCount = 0
      mockLocalStorage.setItem.mockImplementation(() => {
        saveCount++
        // Simulate slow storage
        return new Promise(resolve => setTimeout(resolve, 10))
      })

      render(<FMSForm />)

      // Type rapidly
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'Tom Anderson')
        await user.type(screen.getByLabelText(/email address/i), 'tom@example.com')
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
      })

      // Should not crash or hang
      expect(screen.getByLabelText(/full name/i)).toHaveValue('Tom Anderson')
      expect(screen.getByLabelText(/email address/i)).toHaveValue('tom@example.com')
      expect(screen.getByLabelText(/phone number/i)).toHaveValue('0412345678')
    })
  })
})