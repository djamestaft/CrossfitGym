'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            const lcp = entry.startTime
            if (typeof window.gtag !== 'undefined') {
              window.gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'LCP',
                value: Math.round(lcp),
              })
            }
          }
        }
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        // Fallback for browsers that don't support the observer
        console.log('Performance observer not supported')
      }

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          // Type assertion for event timing entry which has processingStart
          const eventEntry = entry as PerformanceEntry & {
            processingStart?: number
          }
          if (eventEntry.processingStart) {
            const fid = eventEntry.processingStart - eventEntry.startTime
            if (typeof window.gtag !== 'undefined') {
              window.gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'FID',
                value: Math.round(fid),
              })
            }
          }
        }
      })

      try {
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.log('FID observer not supported')
      }

      // Cleanup
      return () => {
        observer.disconnect()
        fidObserver.disconnect()
      }
    }
  }, [])

  return null
}
