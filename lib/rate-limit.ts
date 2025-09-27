import { NextRequest } from 'next/server'

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // requests per window

export async function rateLimit(request: NextRequest) {
  const ip =
    request.ip ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const now = Date.now()
  const limit = rateLimits.get(ip)

  if (!limit || now > limit.resetTime) {
    // Reset window
    rateLimits.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return { success: true }
  }

  if (limit.count >= MAX_REQUESTS) {
    return { success: false, remainingTime: limit.resetTime - now }
  }

  limit.count++
  return { success: true }
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  const entries = Array.from(rateLimits.entries())
  for (const [ip, limit] of entries) {
    if (now > limit.resetTime) {
      rateLimits.delete(ip)
    }
  }
}, RATE_LIMIT_WINDOW)
