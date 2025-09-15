
'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

interface TurnstileProps {
  siteKey: string
  onTokenChange: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  theme?: 'light' | 'dark'
  size?: 'normal' | 'compact'
}

export function Turnstile({
  siteKey,
  onTokenChange,
  onError,
  onExpire,
  theme = 'light',
  size = 'normal',
}: TurnstileProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const initializeTurnstile = useCallback(() => {
    if (!window.turnstile) {
      setError('Turnstile not available')
      setIsLoading(false)
      onError?.()
      return
    }

    try {
      window.turnstile.render('#turnstile-container', {
        sitekey: siteKey,
        theme: theme,
        size: size,
        callback: (token: string) => {
          setIsLoading(false)
          setError(null)
          onTokenChange(token)
        },
        expired: () => {
          setIsLoading(false)
          setError('Security verification expired. Please try again.')
          onExpire?.()
          onTokenChange('')
        },
        error: () => {
          setError('Security verification failed. Please try again.')
          onError?.()
          onTokenChange('')
        },
      })
    } catch (err) {
      setError('Failed to initialize security verification')
      setIsLoading(false)
      onError?.()
    }
  }, [siteKey, theme, size, onTokenChange, onExpire, onError])

  useEffect(() => {
    if (!siteKey) {
      setError('Site key not configured')
      setIsLoading(false)
      return
    }

    // Check if script is already loaded
    if (document.getElementById('turnstile-script')) {
      initializeTurnstile()
      return
    }

    // Load Turnstile script
    const script = document.createElement('script')
    script.id = 'turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true

    script.onload = () => {
      initializeTurnstile()
    }

    script.onerror = () => {
      setError('Failed to load security verification')
      setIsLoading(false)
      onError?.()
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      if (window.turnstile) {
        window.turnstile.remove('#turnstile-container')
      }
      document.head.removeChild(script)
    }
  }, [siteKey, initializeTurnstile, onError])

  return (
    <div className='relative'>
      {isLoading && (
        <div className='flex items-center justify-center py-8'>
          <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          <span className='ml-2 text-sm text-muted-foreground'>
            Loading security verification...
          </span>
        </div>
      )}

      {error && (
        <div className='text-center py-8'>
          <p className='text-sm text-destructive mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='text-sm text-primary underline hover:no-underline'
          >
            Try again
          </button>
        </div>
      )}

      <div id='turnstile-container' className='turnstile-container' />
    </div>
  )
}

// Global type declaration
declare global {
  interface Window {
    turnstile: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string
          theme: 'light' | 'dark'
          size: 'normal' | 'compact'
          callback: (token: string) => void
          expired?: () => void
          error?: () => void
        }
      ) => string
      remove: (id: string) => void
      reset: (id: string) => void
    }
  }
}