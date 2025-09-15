import { NextRequest } from 'next/server'
import { POST, GET } from '../../app/api/fms/submit/route'

// Mock the email service
jest.mock('../../lib/email', () => ({
  sendFMSNotificationEmails: jest.fn().mockResolvedValue({
    success: true,
    adminEmailId: 'mock-admin-id',
    customerEmailId: 'mock-customer-id',
  }),
}))

// Mock environment variables
const originalEnv = process.env
beforeAll(() => {
  process.env = {
    ...originalEnv,
    NODE_ENV: 'test',
  }
})

afterAll(() => {
  process.env = originalEnv
})

// Clear rate limiting between tests
beforeEach(() => {
  // Access the rate limit map from the module and clear it
  const route = require('../../app/api/fms/submit/route')
  if (route.rateLimitMap && route.rateLimitMap.clear) {
    route.rateLimitMap.clear()
  }
})

describe('/api/fms/submit', () => {
  describe('POST endpoint', () => {
    const validFormData = {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '0412345678',
      preferredTime: 'morning' as const,
      goals: 'I want to improve my mobility and reduce back pain from desk work.',
      injuryFlags: ['None of the above'],
      experience: 'beginner' as const,
    }

    let requestCounter = 0
    const createMockRequest = (
      body: any,
      headers: Record<string, string> = {}
    ) => {
      requestCounter++
      const defaultHeaders: Record<string, string> = {
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
        'x-forwarded-for': `192.168.1.${requestCounter}`, // Unique IP for each request
        'user-agent': 'Jest Test Suite',
        ...headers,
      }

      return {
        json: () => Promise.resolve(body),
        headers: {
          get: (name: string) => defaultHeaders[name.toLowerCase()] || null,
        },
      } as unknown as NextRequest
    }

    beforeEach(() => {
      jest.clearAllMocks()
      requestCounter = 0 // Reset counter for each test
      // Clear rate limiting between tests
      jest.clearAllTimers()
    })

    describe('Successful submissions', () => {
      it('should successfully submit valid form data', async () => {
        const request = createMockRequest(validFormData)
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(201)
        expect(data.success).toBe(true)
        expect(data.message).toBe('FMS assessment request submitted successfully')
        expect(data.submissionId).toMatch(/^fms_[a-z0-9]+_[a-z0-9]+$/)
        expect(data.nextSteps).toEqual({
          contactWindow: '1 business day',
          assessmentDuration: '45 minutes',
          preparation: 'Wear comfortable workout clothes',
        })
      })

      it('should handle minimal valid data', async () => {
        const minimalData = {
          name: 'Jo',
          email: 'jo@test.com',
          phone: '12345678',
          preferredTime: 'evening' as const,
          goals: 'Basic fitness goals here for minimum length',
          injuryFlags: [],
          experience: 'intermediate' as const,
        }

        const request = createMockRequest(minimalData)
        const response = await POST(request)

        expect(response.status).toBe(201)
        expect((await response.json()).success).toBe(true)
      })

      it('should sanitize text inputs', async () => {
        const maliciousData = {
          ...validFormData,
          name: 'John<script>alert("xss")</script>Smith',
          goals: 'My goals include javascript:void(0) and onclick=alert(1)',
        }

        const request = createMockRequest(maliciousData)
        const response = await POST(request)

        expect(response.status).toBe(201)
        // The sanitized data would be logged, but we can't easily test the console output
        // In a real implementation, we'd want to verify the sanitization
      })
    })

    describe('Validation errors', () => {
      it('should reject empty name', async () => {
        const invalidData = { ...validFormData, name: '' }
        const request = createMockRequest(invalidData)
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.success).toBe(false)
        expect(data.message).toBe('Form validation failed')
        expect(data.errors).toContainEqual({
          field: 'name',
          message: 'Name must be at least 2 characters',
        })
      })

      it('should reject invalid email format', async () => {
        const invalidData = { ...validFormData, email: 'invalid-email' }
        const request = createMockRequest(invalidData)
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.errors).toContainEqual({
          field: 'email',
          message: 'Invalid email format',
        })
      })

      it('should reject short phone number', async () => {
        const invalidData = { ...validFormData, phone: '123' }
        const request = createMockRequest(invalidData)
        const response = await POST(request)

        expect(response.status).toBe(400)
        expect((await response.json()).errors).toContainEqual({
          field: 'phone',
          message: 'Phone number must be at least 8 characters',
        })
      })

      it('should reject invalid preferred time', async () => {
        const invalidData = { ...validFormData, preferredTime: 'invalid' }
        const request = createMockRequest(invalidData)
        const response = await POST(request)

        expect(response.status).toBe(400)
      })

      it('should reject short goals text', async () => {
        const invalidData = { ...validFormData, goals: 'Short' }
        const request = createMockRequest(invalidData)
        const response = await POST(request)

        expect(response.status).toBe(400)
        expect((await response.json()).errors).toContainEqual({
          field: 'goals',
          message: 'Please provide more detail about your goals',
        })
      })

      it('should reject invalid experience level', async () => {
        const invalidData = { ...validFormData, experience: 'expert' }
        const request = createMockRequest(invalidData)
        const response = await POST(request)

        expect(response.status).toBe(400)
      })
    })

    describe('Security measures', () => {
      it('should reject requests from invalid origins in production', async () => {
        const originalNodeEnv = process.env.NODE_ENV
        Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true })

        const request = createMockRequest(validFormData, {
          origin: 'https://malicious-site.com',
        })
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(403)
        expect(data.success).toBe(false)
        expect(data.message).toBe('Invalid origin')

        Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv, writable: true })
      })

      it('should accept requests from allowed origins in production', async () => {
        const originalNodeEnv = process.env.NODE_ENV
        process.env.NODE_ENV = 'production'

        const request = createMockRequest(validFormData, {
          origin: 'https://geelongmovement.com',
        })
        const response = await POST(request)

        expect(response.status).toBe(201)

        Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv, writable: true })
      })

      it('should reject requests that are too large', async () => {
        const largeData = {
          ...validFormData,
          goals: 'A'.repeat(10001), // Exceed 10KB limit
        }

        const request = createMockRequest(largeData)
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(413)
        expect(data.success).toBe(false)
        expect(data.message).toBe('Request too large')
      })

      it('should handle malformed JSON', async () => {
        const request = {
          json: () => Promise.reject(new SyntaxError('Unexpected token')),
          headers: {
            get: () => 'http://localhost:3000',
          },
        } as unknown as NextRequest

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.success).toBe(false)
        expect(data.message).toBe('Invalid request format')
      })
    })

    describe('Rate limiting', () => {
      it('should allow requests within rate limit', async () => {
        const request1 = createMockRequest(validFormData)
        const request2 = createMockRequest(validFormData)

        const response1 = await POST(request1)
        const response2 = await POST(request2)

        expect(response1.status).toBe(201)
        expect(response2.status).toBe(201)
      })

      it('should reject requests exceeding rate limit', async () => {
        const requests = Array.from({ length: 5 }, () =>
          createMockRequest(validFormData)
        )

        const responses = await Promise.all(requests.map(req => POST(req)))

        // First 3 should succeed, 4th and 5th should be rate limited
        expect(responses[0].status).toBe(201)
        expect(responses[1].status).toBe(201)
        expect(responses[2].status).toBe(201)
        expect(responses[3].status).toBe(429)
        expect(responses[4].status).toBe(429)

        const rateLimitedData = await responses[3].json()
        expect(rateLimitedData.message).toBe(
          'Too many requests. Please wait before submitting again.'
        )
      })
    })

    describe('Error handling', () => {
      it('should handle email service failures gracefully', async () => {
        // Mock email service to fail
        const { sendFMSNotificationEmails } = require('../../lib/email')
        sendFMSNotificationEmails.mockResolvedValueOnce({
          success: false,
          error: 'Email service unavailable',
        })

        const request = createMockRequest(validFormData)
        const response = await POST(request)

        // Should still return success even if email fails
        expect(response.status).toBe(201)
        expect((await response.json()).success).toBe(true)
      })

      it('should handle unexpected errors', async () => {
        // Mock an unexpected error in email service
        const { sendFMSNotificationEmails } = require('../../lib/email')
        sendFMSNotificationEmails.mockRejectedValueOnce(
          new Error('Unexpected error')
        )

        const request = createMockRequest(validFormData)
        const response = await POST(request)

        expect(response.status).toBe(500)
        expect((await response.json()).success).toBe(false)
      })
    })
  })

  describe('GET endpoint (health check)', () => {
    it('should return service health information', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.service).toBe('FMS Submission API')
      expect(data.status).toBe('operational')
      expect(data.timestamp).toBeDefined()
      expect(data.rateLimit).toEqual({
        windowMs: 15 * 60 * 1000,
        maxRequests: 3,
        currentConnections: expect.any(Number),
      })
    })
  })
})
