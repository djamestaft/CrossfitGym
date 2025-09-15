import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendFMSNotificationEmails } from '@/lib/email'

// Define the validation schema for FMS form data
const fmsSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email format'),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 characters')
    .max(20),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
  goals: z
    .string()
    .min(10, 'Please provide more detail about your goals')
    .max(1000),
  injuryFlags: z.array(z.string()),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  // Optional fields for future expansion
  referralSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Security headers check
    const origin = request.headers.get('origin')

    // Basic CSRF protection - ensure request comes from same origin
    // Runtime check to support dynamic testing
    const nodeEnv = process.env.NODE_ENV
    // For testing, allow X-Test-Production-Mode header to simulate production
    const testProductionMode =
      request.headers.get('x-test-production-mode') === 'true'

    if ((nodeEnv === 'production' || testProductionMode) && origin) {
      // Only validate origin when present (browser requests)
      // Server-to-server calls and tests typically don't include origin
      const allowedOrigins = [
        'https://geelongmovement.com',
        'https://www.geelongmovement.com',
        'https://crossfit-gym-sigma.vercel.app',
      ]

      if (!allowedOrigins.some(allowed => origin.startsWith(allowed))) {
        return NextResponse.json(
          { success: false, message: 'Invalid origin' },
          { status: 403 }
        )
      }
    }

    // Rate limiting check - simple in-memory implementation
    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (await isRateLimited(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please wait before submitting again.',
        },
        { status: 429 }
      )
    }

    // Parse and validate request body size
    const body = await request.json()

    // Additional security: check body size (prevent large payloads)
    const bodyString = JSON.stringify(body)
    if (bodyString.length > 10000) {
      // 10KB limit
      return NextResponse.json(
        { success: false, message: 'Request too large' },
        { status: 413 }
      )
    }

    // Validate the form data
    const validatedData = fmsSubmissionSchema.parse(body)

    // Verify Turnstile token if present
    if (body.turnstileToken) {
      const turnstileVerified = await verifyTurnstileToken(body.turnstileToken)
      if (!turnstileVerified) {
        return NextResponse.json(
          { success: false, message: 'Security verification failed' },
          { status: 400 }
        )
      }
    }

    // Sanitize text inputs to prevent XSS
    const sanitizedData = {
      ...validatedData,
      name: sanitizeText(validatedData.name),
      goals: sanitizeText(validatedData.goals),
    }

    // Create submission record with metadata
    const submission = {
      ...sanitizedData,
      submittedAt: new Date().toISOString(),
      clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown',
      id: generateSubmissionId(),
    }

    // TODO: Store submission data (will implement with Sanity CMS in CONTENT-001)
    // Log submission for development debugging only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('FMS Submission received:', {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        submittedAt: submission.submittedAt,
      })
    }

    // Send email notifications
    try {
      const emailResult = await sendFMSNotificationEmails(submission)

      if (!emailResult.success) {
        // Log email failures for debugging in development only
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(
            'Email notification failed:',
            emailResult.reason || emailResult.error
          )
        }
        // Continue with successful response even if email fails
      }
    } catch (emailError) {
      // If email service throws an exception, log it and re-throw
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Email service threw an exception:', emailError)
      }
      throw emailError
    }

    // Track analytics event
    // Note: Server-side GA4 tracking would go here if needed

    return NextResponse.json(
      {
        success: true,
        message: 'FMS assessment request submitted successfully',
        submissionId: submission.id,
        nextSteps: {
          contactWindow: '1 business day',
          assessmentDuration: '45 minutes',
          preparation: 'Wear comfortable workout clothes',
        },
      },
      { status: 201 }
    )
  } catch (error) {
    // Log errors for debugging in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('FMS submission error:', error)
    }

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      )
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format',
        },
        { status: 400 }
      )
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        ...(process.env.NODE_ENV === 'development' && {
          error: error instanceof Error ? error.message : 'Unknown error',
        }),
      },
      { status: 500 }
    )
  }
}

// Utility function to generate unique submission IDs
function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `fms_${timestamp}_${randomStr}`
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Export for testing only - always export so tests can access it
;(globalThis as Record<string, unknown>).__rateLimitMap = rateLimitMap

async function isRateLimited(clientIP: string): Promise<boolean> {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3 // Max 3 submissions per 15 minutes per IP

  const clientData = rateLimitMap.get(clientIP)

  if (!clientData || now > clientData.resetTime) {
    // New window or expired window
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (clientData.count >= maxRequests) {
    return true
  }

  // Increment count
  clientData.count++
  return false
}

// Clean up rate limit map periodically
setInterval(
  () => {
    const now = Date.now()
    const ipsToDelete: string[] = []

    rateLimitMap.forEach((data, ip) => {
      if (now > data.resetTime) {
        ipsToDelete.push(ip)
      }
    })

    ipsToDelete.forEach(ip => rateLimitMap.delete(ip))
  },
  5 * 60 * 1000
) // Clean up every 5 minutes

// Text sanitization to prevent XSS
function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// Cloudflare Turnstile token verification
async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    if (!process.env.TURNSTILE_SECRET_KEY) {
      // In development, if secret key is not configured, accept any token
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          'TURNSTILE_SECRET_KEY not configured - skipping verification in development'
        )
        return true
      }
      return false
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    )

    const data = await response.json()

    return data.success
  } catch (error) {
    // Log verification errors for debugging in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Turnstile verification failed:', error)
    }
    return false
  }
}

// Health check endpoint for this specific API
export async function GET() {
  return NextResponse.json({
    service: 'FMS Submission API',
    status: 'operational',
    timestamp: new Date().toISOString(),
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      maxRequests: 3,
      currentConnections: rateLimitMap.size,
    },
  })
}
