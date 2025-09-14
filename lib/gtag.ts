declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

export const gtag = (
  command: string,
  targetId: string,
  config?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag(command, targetId, config)
  }
}

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  gtag('event', eventName, parameters)
}

export const trackChatEngagement = (action: string) => {
  trackEvent(`chat_${action}`, {
    event_category: 'engagement',
    event_label: 'tawk_chat',
  })
}
