'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackChatEngagement } from '@/lib/gtag'

declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void
      hideWidget?: () => void
      showWidget?: () => void
      minimize?: () => void
      maximize?: () => void
      onLoad?: () => void
      onStatusChange?: (status: string) => void
      onChatMaximized?: () => void
      onChatMinimized?: () => void
      onChatHidden?: () => void
      onChatStarted?: () => void
      onChatEnded?: () => void
      visitor?: {
        name?: string
        email?: string
        [key: string]: unknown
      }
    }
    Tawk_LoadStart?: Date
  }
}

export function ChatToggle() {
  const [, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  useEffect(() => {
    // Initialize Tawk.to
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Load Tawk.to script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://embed.tawk.to/YOUR_TAWK_ID/default'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')

    script.onload = () => {
      setIsLoaded(true)

      // Configure Tawk.to
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = () => {
          // Hide the default widget
          if (window.Tawk_API?.hideWidget) {
            window.Tawk_API.hideWidget()
          }
          setIsVisible(true)
        }

        window.Tawk_API.onChatMaximized = () => {
          setIsMinimized(false)
          try {
            trackChatEngagement('maximized')
          } catch (error) {
            console.warn('Failed to track chat engagement:', error)
          }
        }

        window.Tawk_API.onChatMinimized = () => {
          setIsMinimized(true)
          try {
            trackChatEngagement('minimized')
          } catch (error) {
            console.warn('Failed to track chat engagement:', error)
          }
        }

        window.Tawk_API.onChatStarted = () => {
          try {
            trackChatEngagement('started')
          } catch (error) {
            console.warn('Failed to track chat engagement:', error)
          }
        }

        window.Tawk_API.onChatEnded = () => {
          try {
            trackChatEngagement('ended')
          } catch (error) {
            console.warn('Failed to track chat engagement:', error)
          }
        }
      }
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const toggleChat = () => {
    if (window.Tawk_API) {
      if (isMinimized) {
        if (window.Tawk_API.maximize) {
          window.Tawk_API.maximize()
        }
        try {
          trackChatEngagement('toggle_open')
        } catch (error) {
          console.warn('Failed to track chat engagement:', error)
        }
      } else {
        if (window.Tawk_API.minimize) {
          window.Tawk_API.minimize()
        }
        try {
          trackChatEngagement('toggle_close')
        } catch (error) {
          console.warn('Failed to track chat engagement:', error)
        }
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <Button
        onClick={toggleChat}
        size='lg'
        className='h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 group'
        aria-label={isMinimized ? 'Open chat support' : 'Close chat support'}
      >
        {isMinimized ? (
          <MessageCircle className='h-6 w-6 text-white group-hover:scale-110 transition-transform' />
        ) : (
          <X className='h-6 w-6 text-white group-hover:scale-110 transition-transform' />
        )}
      </Button>

      {/* Chat notification badge */}
      {isMinimized && (
        <div className='absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse'>
          <span className='sr-only'>New message available</span>
        </div>
      )}

      {/* Tooltip */}
      <div className='absolute bottom-16 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
        {isMinimized ? 'Chat with our team' : 'Close chat'}
        <div className='absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'></div>
      </div>
    </div>
  )
}
