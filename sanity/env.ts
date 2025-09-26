export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-26'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfbnomkf'

// Development mode check - if we're in development and don't have proper credentials, use demo mode
if (process.env.NODE_ENV === 'development' && (!projectId || !dataset)) {
  console.warn(
    '⚠️  Sanity environment variables not properly configured in development mode'
  )
  console.warn('Using fallback values for development')
}
