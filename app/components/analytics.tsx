'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])

  return null
}

// Analytics event tracking functions
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters)
  }
}

export const trackFMSFormStart = () => {
  trackEvent('fms_form_start', {
    event_category: 'engagement',
    event_label: 'FMS Assessment Form',
  })
}

export const trackFMSFormComplete = () => {
  trackEvent('fms_form_complete', {
    event_category: 'conversion',
    event_label: 'FMS Assessment Form',
    value: 1,
  })
}

export const trackMemberLogin = () => {
  trackEvent('member_login', {
    event_category: 'engagement',
    event_label: 'Member Portal Access',
  })
}

export const trackVideoPlay = (videoTitle: string) => {
  trackEvent('video_play', {
    event_category: 'engagement',
    event_label: videoTitle,
    custom_parameter_1: 'movement_library',
  })
}

export const trackTimetableView = () => {
  trackEvent('timetable_view', {
    event_category: 'engagement',
    event_label: 'Class Timetable',
  })
}

export const trackArticleView = (articleTitle: string, hubName: string) => {
  trackEvent('article_view', {
    event_category: 'content',
    event_label: articleTitle,
    custom_parameter_1: hubName,
  })
}
