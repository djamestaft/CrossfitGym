/**
 * Integration tests for the complete FMS form submission flow
 * These tests verify the end-to-end functionality from form submission to email delivery
 */

import { NextRequest } from 'next/server'
import { POST } from '../../app/api/fms/submit/route'

// Mock the email service
const mockSendFMSNotificationEmails = jest.fn()
jest.mock('../../lib/email', () => ({
  sendFMSNotificationEmails: mockSendFMSNotificationEmails,
}))

describe('FMS Form Integration Tests', () => {
  const validSubmissionData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '0434567890',
    preferredTime: 'afternoon' as const,
    goals: 'I want to improve my posture and reduce shoulder pain from desk work. Also interested in building strength.',
    injuryFlags: ['Current pain or injury'],
    experience: 'intermediate' as const,
    referralSource: 'Facebook Ad',
    utmSource: 'facebook',
    utmMedium: 'social',
    utmCampaign: 'summer-fitness',
  }

  const createMockRequest = (
    body: any,
    headers: Record<string, string> = {}
  ): NextRequest => {
    const defaultHeaders = {
      'content-type': 'application/json',
      origin: 'https://geelongmovement.com',
      'x-forwarded-for': '203.45.67.89',
      'user-agent': 'Mozilla/5.0 (compatible; Integration Test)',
      ...headers,
    }

    return {
      json: () => Promise.resolve(body),
      headers: {
        get: (name: string) => defaultHeaders[name.toLowerCase()] || null,
      },
    } as NextRequest
  }

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NODE_ENV = 'production'
    
    // Mock successful email sending by default
    mockSendFMSNotificationEmails.mockResolvedValue({
      success: true,
      adminEmailId: 'admin-email-123',
      customerEmailId: 'customer-email-456',
    })
  })

  afterEach(() => {
    delete process.env.NODE_ENV
  })

  describe('Complete submission flow', () => {
    it('should process complete FMS submission with all features', async () => {
      const request = createMockRequest(validSubmissionData)
      const response = await POST(request)
      const data = await response.json()

      // Verify successful response
      expect(response.status).toBe(201)
      expect(data).toEqual({
        success: true,
        message: 'FMS assessment request submitted successfully',
        submissionId: expect.stringMatching(/^fms_[a-z0-9]+_[a-z0-9]+$/),
        nextSteps: {
          contactWindow: '1 business day',
          assessmentDuration: '45 minutes',
          preparation: 'Wear comfortable workout clothes',
        },
      })

      // Verify email service was called with correct data
      expect(mockSendFMSNotificationEmails).toHaveBeenCalledWith({
        ...validSubmissionData,
        submittedAt: expect.any(String),
        clientIP: '203.45.67.89',
        userAgent: 'Mozilla/5.0 (compatible; Integration Test)',
        id: expect.stringMatching(/^fms_[a-z0-9]+_[a-z0-9]+$/),
      })
    })

    it('should handle submission with injury flags requiring special attention', async () => {
      const submissionWithInjuries = {
        ...validSubmissionData,
        injuryFlags: ['Current pain or injury', 'Previous surgery', 'Chronic condition'],
        goals: 'Recovering from knee surgery 6 months ago. Want to rebuild strength safely.',
      }

      const request = createMockRequest(submissionWithInjuries)
      const response = await POST(request)

      expect(response.status).toBe(201)
      
      const emailCallArgs = mockSendFMSNotificationEmails.mock.calls[0][0]
      expect(emailCallArgs.injuryFlags).toEqual([
        'Current pain or injury',
        'Previous surgery', 
        'Chronic condition'
      ])
      expect(emailCallArgs.goals).toContain('surgery')
    })

    it('should handle beginner-level submissions', async () => {
      const beginnerSubmission = {
        ...validSubmissionData,
        experience: 'beginner' as const,
        goals: 'Complete beginner wanting to start fitness journey safely.',
        injuryFlags: ['None of the above'],
      }

      const request = createMockRequest(beginnerSubmission)
      const response = await POST(request)

      expect(response.status).toBe(201)
      
      const emailCallArgs = mockSendFMSNotificationEmails.mock.calls[0][0]
      expect(emailCallArgs.experience).toBe('beginner')
      expect(emailCallArgs.injuryFlags).toEqual(['None of the above'])
    })

    it('should handle advanced athlete submissions', async () => {
      const athleteSubmission = {
        ...validSubmissionData,
        name: 'Mike Rodriguez',
        email: 'mike.rodriguez@example.com',
        experience: 'advanced' as const,
        goals: 'Professional footballer looking to improve movement efficiency and prevent injuries during season.',
        injuryFlags: ['None of the above'],
        preferredTime: 'morning' as const,
      }

      const request = createMockRequest(athleteSubmission)
      const response = await POST(request)

      expect(response.status).toBe(201)
      
      const emailCallArgs = mockSendFMSNotificationEmails.mock.calls[0][0]
      expect(emailCallArgs.experience).toBe('advanced')
      expect(emailCallArgs.goals).toContain('Professional footballer')
    })
  })

  describe('Marketing attribution tracking', () => {
    it('should capture and store UTM parameters', async () => {
      const submissionWithUTM = {
        ...validSubmissionData,
        referralSource: 'Google Ads',
        utmSource: 'google',
        utmMedium: 'cpc',
        utmCampaign: 'fms-assessment-q3',
      }

      const request = createMockRequest(submissionWithUTM)
      const response = await POST(request)

      expect(response.status).toBe(201)
      
      const emailCallArgs = mockSendFMSNotificationEmails.mock.calls[0][0]
      expect(emailCallArgs.referralSource).toBe('Google Ads')
      expect(emailCallArgs.utmSource).toBe('google')
      expect(emailCallArgs.utmMedium).toBe('cpc')
      expect(emailCallArgs.utmCampaign).toBe('fms-assessment-q3')
    })

    it('should handle submissions without marketing attribution', async () => {
      const { referralSource, utmSource, utmMedium, utmCampaign, ...submissionWithoutUTM } = validSubmissionData

      const request = createMockRequest(submissionWithoutUTM)
      const response = await POST(request)

      expect(response.status).toBe(201)
      
      const emailCallArgs = mockSendFMSNotificationEmails.mock.calls[0][0]
      expect(emailCallArgs.referralSource).toBeUndefined()
      expect(emailCallArgs.utmSource).toBeUndefined()
    })
  })

  describe('Email notification reliability', () => {
    it('should continue with successful response even if email fails', async () => {
      mockSendFMSNotificationEmails.mockResolvedValue({
        success: false,
        error: 'SMTP server unavailable',
      })

      const request = createMockRequest(validSubmissionData)
      const response = await POST(request)
      const data = await response.json()

      // Should still return success
      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.submissionId).toBeDefined()
    })

    it('should handle email service throwing exceptions', async () => {
      mockSendFMSNotificationEmails.mockRejectedValue(new Error('Email service crashed'))

      const request = createMockRequest(validSubmissionData)
      const response = await POST(request)

      // Should return error when email service throws
      expect(response.status).toBe(500)
      expect((await response.json()).success).toBe(false)
    })
  })

  describe('Security integration', () => {
    it('should validate origin in production environment', async () => {
      const request = createMockRequest(validSubmissionData, {
        origin: 'https://malicious-site.com',
      })

      const response = await POST(request)
      
      expect(response.status).toBe(403)
      expect((await response.json()).message).toBe('Invalid origin')
      expect(mockSendFMSNotificationEmails).not.toHaveBeenCalled()
    })

    it('should rate limit multiple rapid submissions', async () => {
      const requests = Array.from({ length: 5 }, () =>
        createMockRequest(validSubmissionData, {
          'x-forwarded-for': '192.168.1.100', // Same IP for rate limiting
        })
      )

      const responses = await Promise.all(requests.map(req => POST(req)))

      // First 3 should succeed
      expect(responses[0].status).toBe(201)
      expect(responses[1].status).toBe(201)
      expect(responses[2].status).toBe(201)

      // 4th and 5th should be rate limited
      expect(responses[3].status).toBe(429)
      expect(responses[4].status).toBe(429)

      // Only 3 emails should be sent
      expect(mockSendFMSNotificationEmails).toHaveBeenCalledTimes(3)
    })

    it('should sanitize potentially malicious input', async () => {
      const maliciousSubmission = {
        ...validSubmissionData,
        name: 'John<script>alert("xss")</script>Smith',
        goals: 'My goals include <img src=x onerror=alert(1)> improving fitness',
      }

      const request = createMockRequest(maliciousSubmission)
      const response = await POST(request)

      expect(response.status).toBe(201)
      
      const emailCallArgs = mockSendFMSNotificationEmails.mock.calls[0][0]
      // Verify scripts are removed (exact sanitization depends on implementation)
      expect(emailCallArgs.name).not.toContain('<script>')
      expect(emailCallArgs.goals).not.toContain('<img')
    })
  })

  describe('Error recovery scenarios', () => {
    it('should handle corrupted request data gracefully', async () => {
      const incompleteData = {
        name: 'John',
        // Missing required fields
      }

      const request = createMockRequest(incompleteData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toBe('Form validation failed')
      expect(data.errors).toBeInstanceOf(Array)
      expect(mockSendFMSNotificationEmails).not.toHaveBeenCalled()
    })

    it('should handle extremely large payloads', async () => {
      const largePayload = {
        ...validSubmissionData,
        goals: 'A'.repeat(15000), // Exceed size limit
      }

      const request = createMockRequest(largePayload)
      const response = await POST(request)

      expect(response.status).toBe(413)
      expect((await response.json()).message).toBe('Request too large')
      expect(mockSendFMSNotificationEmails).not.toHaveBeenCalled()
    })
  })

  describe('Data persistence and formatting', () => {
    it('should generate unique submission IDs', async () => {
      const requests = Array.from({ length: 3 }, (_, i) =>
        createMockRequest({
          ...validSubmissionData,
          email: `test${i}@example.com`,
        }, {
          'x-forwarded-for': `192.168.1.${100 + i}`, // Different IPs
        })
      )

      const responses = await Promise.all(requests.map(req => POST(req)))
      const submissionIds = await Promise.all(
        responses.map(async res => (await res.json()).submissionId)
      )

      // All IDs should be unique
      const uniqueIds = new Set(submissionIds)
      expect(uniqueIds.size).toBe(3)

      // All should match the expected format
      submissionIds.forEach(id => {
        expect(id).toMatch(/^fms_[a-z0-9]+_[a-z0-9]+$/)
      })
    })

    it('should include client metadata in email data', async () => {
      const request = createMockRequest(validSubmissionData, {
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        'x-forwarded-for': '203.45.67.89',
      })

      await POST(request)

      const emailCallArgs = mockSendFMSNotificationEmails.mock.calls[0][0]
      expect(emailCallArgs.clientIP).toBe('203.45.67.89')
      expect(emailCallArgs.userAgent).toContain('iPhone')
      expect(emailCallArgs.submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    })
  })

  describe('Performance under load', () => {
    it('should handle concurrent submissions from different users', async () => {
      const concurrentRequests = Array.from({ length: 10 }, (_, i) =>
        createMockRequest({
          ...validSubmissionData,
          name: `User ${i}`,
          email: `user${i}@example.com`,
        }, {
          'x-forwarded-for': `192.168.1.${i}`, // Different IPs to avoid rate limiting
        })
      )

      const startTime = Date.now()
      const responses = await Promise.all(concurrentRequests.map(req => POST(req)))
      const endTime = Date.now()

      // All should succeed
      responses.forEach(response => {
        expect(response.status).toBe(201)
      })

      // Should complete within reasonable time
      expect(endTime - startTime).toBeLessThan(5000) // 5 seconds max

      // All emails should be sent
      expect(mockSendFMSNotificationEmails).toHaveBeenCalledTimes(10)
    })
  })
})
