declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export const gtag = (command: string, targetId: string, config?: any) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag(command, targetId, config)
  }
}

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  gtag('event', eventName, parameters)
}

export const trackChatEngagement = (action: string) => {
  trackEvent(`chat_${action}`, {
    event_category: 'engagement',
    event_label: 'tawk_chat',
  })
}
