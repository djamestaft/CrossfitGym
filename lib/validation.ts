// Input validation utilities

export function validateString(
  input: string,
  maxLength: number = 1000
): string {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type')
  }

  // Remove potentially dangerous characters
  const sanitized = input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JavaScript protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers

  if (sanitized.length > maxLength) {
    throw new Error(`Input exceeds maximum length of ${maxLength}`)
  }

  return sanitized.trim()
}

export function validateSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug')
  }

  // Only allow alphanumeric characters, hyphens, and underscores
  const sanitized = slug.replace(/[^a-zA-Z0-9\-_]/g, '')

  if (sanitized.length < 1 || sanitized.length > 100) {
    throw new Error('Slug must be between 1 and 100 characters')
  }

  return sanitized.toLowerCase()
}

export function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address')
  }
  return email.toLowerCase().trim()
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '') // Remove JavaScript protocol
}

export function validateQueryParams(
  params: URLSearchParams,
  allowedParams: string[]
) {
  const invalidParams: string[] = []

  const entries = Array.from(params.entries())
  for (const [key] of entries) {
    if (!allowedParams.includes(key)) {
      invalidParams.push(key)
    }
  }

  if (invalidParams.length > 0) {
    throw new Error(`Invalid query parameters: ${invalidParams.join(', ')}`)
  }
}
