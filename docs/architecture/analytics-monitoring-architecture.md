# 📊 Analytics & Monitoring Architecture

### GA4 Event Tracking Strategy
```typescript
// lib/gtag.ts - Comprehensive event tracking
export const analyticsEvents = {
  // Conversion funnel events
  conversion: {
    'fms_start': 'User begins FMS form',
    'fms_submit': 'User completes FMS form', 
    'fms_conversion': 'FMS lead converts to first session'
  },
  
  // Engagement events
  engagement: {
    'portal_login': 'Member accesses portal',
    'video_play': 'Movement video played',
    'post_view': 'Article/hub page viewed',
    'chat_open': 'Tawk.to chat initiated'
  },
  
  // Navigation events
  navigation: {
    'cta_click': 'Any CTA button clicked',
    'internal_link': 'Internal navigation link clicked',
    'external_link': 'External link clicked'
  }
};

// Event parameters for segmentation
export const eventParameters = {
  page_type: 'homepage | fms | hub | article | portal',
  cta_variant: 'primary | secondary | proof | safety',
  form_step: 'step_1 | step_2 | success',
  content_category: 'shoulder | low_back | general',
  member_status: 'prospect | member | returning'
};
```

### Performance Monitoring
```typescript
// Monitoring and observability setup
export const monitoringConfig = {
  // Core Web Vitals monitoring
  webVitals: {
    lcp: 'Threshold: 2.5s | Alert: >3s',
    cls: 'Threshold: 0.1 | Alert: >0.15', 
    inp: 'Threshold: 200ms | Alert: >300ms',
    reporting: 'Vercel Analytics + GA4 + Lighthouse CI'
  },
  
  // Error tracking
  errorTracking: {
    clientErrors: 'Error boundary + GA4 exception events',
    serverErrors: 'API route error handling + logging',
    formErrors: 'Validation error tracking',
    integrationErrors: 'Fitbox/Sanity API error monitoring'
  },
  
  // Business metrics
  businessMetrics: {
    conversionRate: 'FMS start → submit → first session',
    portalEngagement: 'Weekly active members',
    contentPerformance: 'Hub → FMS conversion rate',
    seoPerformance: 'Organic traffic → FMS conversion'
  }
};
```

---
