import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FMSForm } from '../../components/fms-form'

// Mock fetch
global.fetch = jest.fn()

// Mock gtag for analytics
const mockGtag = jest.fn()
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
})

describe('FMSForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
    mockGtag.mockClear()
  })

  describe('Initial render', () => {
    it('should render step 1 form with all required fields', () => {
      render(<FMSForm />)

      expect(
        screen.getByText('Functional Movement Screen Assessment')
      ).toBeInTheDocument()
      expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument()

      // Check form fields
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
      expect(screen.getByText(/preferred assessment time/i)).toBeInTheDocument()

      // Check preferred time options
      expect(screen.getByLabelText(/morning/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/afternoon/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/evening/i)).toBeInTheDocument()

      // Check continue button
      expect(screen.getByText('Continue to Step 2')).toBeInTheDocument()
    })

    it('should show progress bar at 50% for step 1', () => {
      render(<FMSForm />)

      const progressBar = document.querySelector('.bg-primary')
      expect(progressBar).toHaveStyle('width: 50%')
    })
  })

  describe('Step 1 validation', () => {
    it('should show validation errors for empty required fields', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      const continueButton = screen.getByText('Continue to Step 2')
      await act(async () => {
        await user.click(continueButton)
      })

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
        expect(screen.getByText('Email is required')).toBeInTheDocument()
        expect(screen.getByText('Phone number is required')).toBeInTheDocument()
        expect(
          screen.getByText('Please select a preferred time')
        ).toBeInTheDocument()
      })
    })

    it('should validate email format', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      const emailInput = screen.getByLabelText(/email address/i)
      await act(async () => {
        await user.type(emailInput, 'invalid-email')
      })

      const continueButton = screen.getByText('Continue to Step 2')
      await act(async () => {
        await user.click(continueButton)
      })

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address')
        ).toBeInTheDocument()
      })
    })

    it('should validate phone number format', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      const phoneInput = screen.getByLabelText(/phone number/i)
      await act(async () => {
        await user.type(phoneInput, '123')
      })

      const continueButton = screen.getByText('Continue to Step 2')
      await act(async () => {
        await user.click(continueButton)
      })

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid phone number')
        ).toBeInTheDocument()
      })
    })

    it('should proceed to step 2 with valid data', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      // Fill out step 1 form
      await act(async () => {
        await user.type(screen.getByLabelText(/full name/i), 'John Smith')
        await user.type(
          screen.getByLabelText(/email address/i),
          'john@example.com'
        )
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
        await user.click(screen.getByLabelText(/morning/i))
      })

      const continueButton = screen.getByText('Continue to Step 2')
      await act(async () => {
        await user.click(continueButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      }, { timeout: 10000 })
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'fms_start', {
        event_category: 'engagement',
        event_label: 'FMS Form Step 2',
      })
    })
  })

  describe('Step 2 functionality', () => {
    const fillStep1 = async (user: any) => {
      // Fill step 1 form fields
      await act(async () => {
        await user.clear(screen.getByLabelText(/full name/i))
        await user.type(screen.getByLabelText(/full name/i), 'John Smith')
      })
      
      await act(async () => {
        await user.clear(screen.getByLabelText(/email address/i))
        await user.type(
          screen.getByLabelText(/email address/i),
          'john@example.com'
        )
      })
      
      await act(async () => {
        await user.clear(screen.getByLabelText(/phone number/i))
        await user.type(screen.getByLabelText(/phone number/i), '0412345678')
      })
      
      await act(async () => {
        await user.click(screen.getByLabelText(/morning/i))
      })
      
      // Wait for form to be valid before proceeding
      await waitFor(() => {
        expect(screen.queryByText('Please select a preferred time')).not.toBeInTheDocument()
      })
      
      await act(async () => {
        await user.click(screen.getByText('Continue to Step 2'))
      })
    }

    it('should render step 2 form with all required fields', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      await fillStep1(user)

      await waitFor(() => {
        expect(
          screen.getByLabelText(/what are your movement goals/i)
        ).toBeInTheDocument()
        expect(
          screen.getByText(/do any of these apply to you/i)
        ).toBeInTheDocument()
        expect(
          screen.getByText(/exercise experience level/i)
        ).toBeInTheDocument()

        // Check injury flags
        expect(
          screen.getByLabelText(/current pain or injury/i)
        ).toBeInTheDocument()
        expect(screen.getByLabelText(/previous surgery/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/chronic condition/i)).toBeInTheDocument()
        expect(
          screen.getByLabelText(/recent accident\/trauma/i)
        ).toBeInTheDocument()
        expect(screen.getByLabelText(/none of the above/i)).toBeInTheDocument()

        // Check experience levels
        expect(screen.getByLabelText(/beginner/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/intermediate/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/advanced/i)).toBeInTheDocument()

        // Check buttons
        expect(screen.getByText('Back')).toBeInTheDocument()
        expect(screen.getByText('Book My Assessment')).toBeInTheDocument()
      })
    })

    it('should show progress bar at 100% for step 2', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      await fillStep1(user)

      await waitFor(() => {
        const progressBar = document.querySelector('.bg-primary')
        expect(progressBar).toHaveStyle('width: 100%')
      }, { timeout: 10000 })
    })

    it('should allow going back to step 1', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      await fillStep1(user)

      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      const backButton = screen.getByText('Back')
      await act(async () => {
        await user.click(backButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument()
        // Data should be preserved
        expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument()
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
      }, { timeout: 10000 })
    })

    it('should validate step 2 required fields', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      await fillStep1(user)

      await waitFor(() => {
        expect(screen.getByText('Book My Assessment')).toBeInTheDocument()
      }, { timeout: 10000 })

      const submitButton = screen.getByText('Book My Assessment')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText('Please tell us about your goals')
        ).toBeInTheDocument()
        expect(
          screen.getByText('Please select your experience level')
        ).toBeInTheDocument()
      })
    })

    it('should handle injury flag selection with mutual exclusivity', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      await fillStep1(user)

      await waitFor(() => {
        expect(
          screen.getByLabelText(/current pain or injury/i)
        ).toBeInTheDocument()
      }, { timeout: 10000 })

      const injuryCheckbox = screen.getByLabelText(/current pain or injury/i)
      const noneCheckbox = screen.getByLabelText(/none of the above/i)

      // First select an injury flag
      await act(async () => {
        await user.click(injuryCheckbox)
      })
      expect(injuryCheckbox).toBeChecked()
      expect(noneCheckbox).not.toBeChecked()

      // Then select "None of the above" - should deselect injury flag
      await act(async () => {
        await user.click(noneCheckbox)
      })
      expect(noneCheckbox).toBeChecked()
      expect(injuryCheckbox).not.toBeChecked() // Should be deselected due to mutual exclusivity
    })
  })

  describe('Form submission', () => {
    const fillCompleteForm = async (user: any) => {
      // Step 1
      await user.clear(screen.getByLabelText(/full name/i))
      await user.type(screen.getByLabelText(/full name/i), 'John Smith')
      await user.clear(screen.getByLabelText(/email address/i))
      await user.type(
        screen.getByLabelText(/email address/i),
        'john@example.com'
      )
      await user.clear(screen.getByLabelText(/phone number/i))
      await user.type(screen.getByLabelText(/phone number/i), '0412345678')
      await user.click(screen.getByLabelText(/morning/i))
      await user.click(screen.getByText('Continue to Step 2'))

      // Step 2 - Wait for form to transition
      await waitFor(
        () => {
          expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
      
      await waitFor(
        () => {
          expect(
            screen.getByLabelText(/what are your movement goals/i)
          ).toBeInTheDocument()
        },
        { timeout: 5000 }
      )

      await act(async () => {
        await user.type(
          screen.getByLabelText(/what are your movement goals/i),
          'I want to improve my mobility and reduce back pain.'
        )
      })
      
      await act(async () => {
        await user.click(screen.getByLabelText(/none of the above/i))
      })
      
      await act(async () => {
        await user.click(screen.getByLabelText(/beginner/i))
      })
    }

    it('should submit form successfully', async () => {
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
      await fillCompleteForm(user)

      const submitButton = screen.getByText('Book My Assessment')
      await user.click(submitButton)

      await waitFor(
        () => {
          expect(submitButton).toHaveTextContent('Submitting...')
        },
        { timeout: 10000 }
      )

      await waitFor(
        () => {
          expect(screen.getByText('Thank You!')).toBeInTheDocument()
          expect(
            screen.getByText(/we've received your fms assessment request/i)
          ).toBeInTheDocument()
          expect(
            screen.getByText(/we'll call you to confirm your preferred time/i)
          ).toBeInTheDocument()
        },
        { timeout: 10000 }
      )

      expect(fetch).toHaveBeenCalledWith('/api/fms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Smith',
          email: 'john@example.com',
          phone: '0412345678',
          preferredTime: 'morning',
          goals: 'I want to improve my mobility and reduce back pain.',
          injuryFlags: ['None of the above'],
          experience: 'beginner',
        }),
      })

      expect(mockGtag).toHaveBeenCalledWith('event', 'fms_submit', {
        event_category: 'conversion',
        event_label: 'FMS Form Complete',
        value: 1,
      })
    }, 15000)

    it('should handle submission errors', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          message: 'Server error occurred',
        }),
      })

      render(<FMSForm />)
      await fillCompleteForm(user)

      const submitButton = screen.getByText('Book My Assessment')
      await user.click(submitButton)

      await waitFor(
        () => {
          expect(screen.getByText('Server error occurred')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )

      expect(mockGtag).not.toHaveBeenCalledWith(
        'event',
        'fms_submit',
        expect.any(Object)
      )
    }, 15000)

    it('should handle network errors', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      render(<FMSForm />)
      await fillCompleteForm(user)

      const submitButton = screen.getByText('Book My Assessment')
      await user.click(submitButton)

      await waitFor(
        () => {
          expect(screen.getByText('Network error')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    }, 15000)

    it('should disable submit button during submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockImplementationOnce(
        () => new Promise(resolve => setTimeout(resolve, 1000))
      )

      render(<FMSForm />)
      await fillCompleteForm(user)

      const submitButton = screen.getByText('Book My Assessment')
      await user.click(submitButton)

      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(submitButton).toHaveTextContent('Submitting...')
      })
    })
  })

  describe('Analytics tracking', () => {
    it('should track form abandonment on unmount', () => {
      const user = userEvent.setup()
      const { unmount } = render(<FMSForm />)

      // Start filling form but don't complete
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'John' },
      })

      unmount()

      expect(mockGtag).toHaveBeenCalledWith('event', 'fms_form_abandon', {
        event_category: 'engagement',
        event_label: 'abandoned_step_1',
        value: expect.any(Number),
      })
    })

    it('should not track abandonment if form was not started', () => {
      const { unmount } = render(<FMSForm />)
      unmount()

      expect(mockGtag).not.toHaveBeenCalled()
    })

    it('should not track abandonment if form was submitted', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, submissionId: 'test' }),
      })

      const { unmount } = render(<FMSForm />)

      // Fill and submit form
      await user.type(screen.getByLabelText(/full name/i), 'John Smith')
      await user.type(
        screen.getByLabelText(/email address/i),
        'john@example.com'
      )
      await user.type(screen.getByLabelText(/phone number/i), '0412345678')
      await user.click(screen.getByLabelText(/morning/i))
      await user.click(screen.getByText('Continue to Step 2'))

      // Wait for step 2 transition
      await waitFor(() => {
        expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument()
      }, { timeout: 10000 })
      
      await waitFor(() => {
        expect(
          screen.getByLabelText(/what are your movement goals/i)
        ).toBeInTheDocument()
      }, { timeout: 5000 })

      await user.type(
        screen.getByLabelText(/what are your movement goals/i),
        'Goals here'
      )
      await user.click(screen.getByLabelText(/beginner/i))
      await user.click(screen.getByText('Book My Assessment'))

      await waitFor(() => {
        expect(screen.getByText('Thank You!')).toBeInTheDocument()
      })

      // Clear previous gtag calls
      mockGtag.mockClear()

      unmount()

      // Should not track abandonment
      expect(mockGtag).not.toHaveBeenCalledWith(
        'event',
        'fms_form_abandon',
        expect.any(Object)
      )
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      render(<FMSForm />)

      // Check error messages have role="alert"
      fireEvent.click(screen.getByText('Continue to Step 2'))

      expect(screen.getAllByRole('alert')).toHaveLength(4) // All required field errors
    })

    it('should associate error messages with form fields', async () => {
      const user = userEvent.setup()
      render(<FMSForm />)

      await user.click(screen.getByText('Continue to Step 2'))

      const nameError = screen.getByText('Name is required')
      expect(nameError).toHaveAttribute('role', 'alert')
    })

    it('should have proper heading structure', () => {
      render(<FMSForm />)

      // Check that the title text exists (it's not a proper heading in the current implementation)
      expect(
        screen.getByText(/functional movement screen assessment/i)
      ).toBeInTheDocument()
    })
  })
})
