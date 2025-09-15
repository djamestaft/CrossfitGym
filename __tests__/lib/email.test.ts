import { sendFMSNotificationEmails, sendTestEmail } from '../../lib/email'

// Mock Resend
const mockSend = jest.fn()
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}))

const mockSubmission = {
  id: 'fms_test_123',
  name: 'John Smith',
  email: 'john@example.com',
  phone: '0412345678',
  preferredTime: 'morning',
  goals: 'Improve mobility and reduce back pain',
  injuryFlags: ['Current pain or injury'],
  experience: 'beginner',
  submittedAt: '2025-09-15T10:00:00.000Z',
  referralSource: 'Google Search',
  utmSource: 'google',
}

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variables
    delete process.env.RESEND_API_KEY
    delete process.env.ADMIN_EMAIL
    delete process.env.FROM_EMAIL
  })

  describe('sendFMSNotificationEmails', () => {
    it('should return false when RESEND_API_KEY is not configured', async () => {
      const result = await sendFMSNotificationEmails(mockSubmission)

      expect(result).toEqual({
        success: false,
        reason: 'Email service not configured',
      })
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should send both admin and customer emails when configured', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      process.env.ADMIN_EMAIL = 'admin@test.com'
      process.env.FROM_EMAIL = 'noreply@test.com'

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })

      const result = await sendFMSNotificationEmails(mockSubmission)

      expect(result).toEqual({
        success: true,
        adminEmailId: 'admin-email-id',
        customerEmailId: 'customer-email-id',
      })

      expect(mockSend).toHaveBeenCalledTimes(2)

      // Check admin email
      expect(mockSend).toHaveBeenNthCalledWith(1, {
        from: 'noreply@test.com',
        to: 'admin@test.com',
        subject: 'New FMS Assessment Request - John Smith',
        html: expect.stringContaining('New FMS Assessment Request'),
      })

      // Check customer email
      expect(mockSend).toHaveBeenNthCalledWith(2, {
        from: 'noreply@test.com',
        to: 'john@example.com',
        subject: 'Your FMS Assessment Request - Geelong Movement Co',
        html: expect.stringContaining(
          'Your FMS Assessment Request is Confirmed'
        ),
      })
    })

    it('should use default email addresses when env vars not set', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })

      await sendFMSNotificationEmails(mockSubmission)

      expect(mockSend).toHaveBeenNthCalledWith(1, {
        from: 'noreply@geelongmovement.com',
        to: 'admin@geelongmovement.com',
        subject: 'New FMS Assessment Request - John Smith',
        html: expect.any(String),
      })
    })

    it('should handle email sending errors', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'

      mockSend.mockRejectedValueOnce(new Error('Email service error'))

      const result = await sendFMSNotificationEmails(mockSubmission)

      expect(result).toEqual({
        success: false,
        error: 'Email service error',
      })
    })

    it('should include injury flags warning in admin email when present', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })

      await sendFMSNotificationEmails(mockSubmission)

      const adminEmailHtml = mockSend.mock.calls[0][0].html
      expect(adminEmailHtml).toContain('⚠️ Health Considerations')
      expect(adminEmailHtml).toContain('Current pain or injury')
    })

    it('should not include injury warning when no flags present', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'

      const submissionNoInjuries = {
        ...mockSubmission,
        injuryFlags: ['None of the above'],
      }

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })

      await sendFMSNotificationEmails(submissionNoInjuries)

      const adminEmailHtml = mockSend.mock.calls[0][0].html
      expect(adminEmailHtml).not.toContain('⚠️ Health Considerations')
    })

    it('should include marketing information when present', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })

      await sendFMSNotificationEmails(mockSubmission)

      const adminEmailHtml = mockSend.mock.calls[0][0].html
      expect(adminEmailHtml).toContain('Marketing Information')
      expect(adminEmailHtml).toContain('Google Search')
      expect(adminEmailHtml).toContain('google')
    })

    it('should format customer name correctly in email', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })

      await sendFMSNotificationEmails(mockSubmission)

      const customerEmailHtml = mockSend.mock.calls[1][0].html
      expect(customerEmailHtml).toContain('Hi John,') // First name only
    })
  })

  describe('sendTestEmail', () => {
    it('should only work in development environment', async () => {
      const originalNodeEnv = process.env.NODE_ENV
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      })

      await expect(sendTestEmail()).rejects.toThrow(
        'Test emails can only be sent in development environment'
      )

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalNodeEnv,
        writable: true,
      })
    })

    it('should send test email in development', async () => {
      const originalNodeEnv = process.env.NODE_ENV
      
      // Clear module cache and set NODE_ENV
      jest.resetModules()
      process.env.NODE_ENV = 'development'
      process.env.RESEND_API_KEY = 'test-api-key'

      // Dynamically import after setting NODE_ENV
      const { sendTestEmail: freshSendTestEmail } = await import(
        '../../lib/email'
      )

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })

      const result = await freshSendTestEmail()

      expect(result.success).toBe(true)
      expect(mockSend).toHaveBeenCalledTimes(2)

      // Verify test data structure
      expect(mockSend).toHaveBeenNthCalledWith(1, {
        from: expect.any(String),
        to: expect.any(String),
        subject: 'New FMS Assessment Request - John Smith',
        html: expect.stringContaining('test_fms_123'),
      })

      // Restore NODE_ENV and reset modules
      process.env.NODE_ENV = originalNodeEnv
      jest.resetModules()
    })
  })

  describe('Email template content', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = 'test-api-key'
      process.env.ADMIN_EMAIL = 'admin@test.com'
      process.env.FROM_EMAIL = 'noreply@test.com'

      mockSend
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'customer-email-id' } })
    })

    it('should include all required information in admin email', async () => {
      await sendFMSNotificationEmails(mockSubmission)

      const adminEmailHtml = mockSend.mock.calls[0][0].html

      // Contact information
      expect(adminEmailHtml).toContain('John Smith')
      expect(adminEmailHtml).toContain('john@example.com')
      expect(adminEmailHtml).toContain('0412345678')
      expect(adminEmailHtml).toContain('morning')

      // Assessment details
      expect(adminEmailHtml).toContain('beginner')
      expect(adminEmailHtml).toContain('Improve mobility and reduce back pain')
      expect(adminEmailHtml).toContain('Current pain or injury')

      // Submission metadata
      expect(adminEmailHtml).toContain('fms_test_123')
      expect(adminEmailHtml).toContain('15/09/2025') // Australian date format

      // Next steps
      expect(adminEmailHtml).toContain('Contact client within 1 business day')
      expect(adminEmailHtml).toContain('Schedule 45-minute FMS assessment')
    })

    it('should include all required information in customer email', async () => {
      await sendFMSNotificationEmails(mockSubmission)

      const customerEmailHtml = mockSend.mock.calls[1][0].html

      // Personalization
      expect(customerEmailHtml).toContain('Hi John,')

      // Summary information
      expect(customerEmailHtml).toContain('morning')
      expect(customerEmailHtml).toContain('beginner')
      expect(customerEmailHtml).toContain(
        'Improve mobility and reduce back pain'
      )

      // Next steps
      expect(customerEmailHtml).toContain('call you within 1 business day')
      expect(customerEmailHtml).toContain('approximately 45 minutes')
      expect(customerEmailHtml).toContain('comfortable workout clothes')

      // Reference information
      expect(customerEmailHtml).toContain('fms_test_123')
      expect(customerEmailHtml).toContain('15/09/2025')
    })
  })
})
