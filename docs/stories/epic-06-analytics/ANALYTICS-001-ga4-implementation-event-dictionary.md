# User Story: ANALYTICS-001 - GA4 Implementation & Event Dictionary

**Epic:** Epic 6: Analytics & Observability  
**Story ID:** ANALYTICS-001  
**Priority:** High  
**Effort Estimate:** 4 story points  
**Sprint Target:** Week 2-3  

## 📋 User Story

**As a** Product Manager and stakeholder team  
**I need** comprehensive event tracking and analytics implementation  
**So that** I can measure MVP success, understand user behavior, and make data-driven optimization decisions  

## ✅ Acceptance Criteria

### GA4 Property Setup & Configuration
- [ ] **GA4 Property Configuration:**
  - New GA4 property created with proper naming convention
  - Enhanced measurement features configured appropriately
  - Data retention settings aligned with business needs and privacy compliance
  - Cross-domain tracking setup if needed for external integrations
  - Time zone and currency settings configured for Australian operations

- [ ] **Google Tag Manager Integration:**
  - GTM container created and properly configured
  - GA4 configuration tag with measurement ID
  - Consent mode configuration for privacy compliance
  - Debug mode setup for development and testing
  - Version control and publishing workflow established

- [ ] **Custom Dimensions & Metrics:**
  - Page type classification (home, fms, hub, article, portal, etc.)
  - CTA variant tracking (primary, secondary, text-link)
  - User journey stage identification
  - Content category classification
  - Traffic source attribution preservation

### Comprehensive Event Dictionary
- [ ] **Primary Conversion Events:**
  - `fms_start` - User begins FMS form (Step 1)
  - `fms_step_complete` - User completes form step
  - `fms_submit` - User successfully submits complete form
  - `fms_success_view` - User views success page
  - `first_session_booked` - Manual event for session booking (operations)
  - `first_session_completed` - Manual event for session completion

- [ ] **Engagement Events:**
  - `portal_login` - Member successfully logs into portal
  - `video_play` - Movement library or content video started
  - `video_complete` - Video watched to completion
  - `post_view` - Article or hub content viewed
  - `search_query` - Internal site search performed
  - `download_click` - Resource download initiated

- [ ] **Navigation & Interaction Events:**
  - `cta_click` - Call-to-action button clicks
  - `phone_click` - Phone number click-to-call
  - `email_click` - Email address click
  - `chat_open` - Chat widget interaction
  - `map_click` - Location/directions interaction
  - `social_share` - Content sharing on social platforms

- [ ] **Content Engagement Events:**
  - `reading_progress` - Article reading milestones (25%, 50%, 75%, 100%)
  - `testimonial_view` - Testimonial carousel interaction
  - `coach_bio_view` - Coach biography page views
  - `safety_panel_view` - Safety standards panel interaction
  - `faq_expand` - FAQ section expansion and engagement
  - `schedule_view` - Timetable viewing and interaction

### Event Parameter Standardization
- [ ] **Required Parameters:**
  - `page_type` - Classification of page type
  - `cta_variant` - Type and style of CTA clicked
  - `user_journey_stage` - Where user is in conversion funnel
  - `content_category` - Type of content being engaged with
  - `utm_source`, `utm_medium`, `utm_campaign` - Marketing attribution

- [ ] **Event-Specific Parameters:**
  - Form events: `form_step`, `completed_fields`, `validation_errors`
  - Video events: `video_title`, `video_duration`, `completion_percentage`
  - Content events: `article_title`, `reading_time`, `word_count`
  - Navigation events: `link_destination`, `link_text`, `page_section`

- [ ] **User Context Parameters:**
  - `session_number` - User's session count
  - `time_on_site` - Total time spent on site
  - `page_views_session` - Pages viewed in current session
  - `device_category` - Mobile, desktop, tablet classification
  - `traffic_source_category` - Organic, direct, referral, social

### Privacy Compliance & Consent Management
- [ ] **Consent Implementation:**
  - Google Consent Mode v2 integration
  - Granular consent controls for analytics vs advertising
  - Consent banner with clear opt-in/opt-out options
  - Consent state tracking and event parameter filtering
  - User preference persistence and management

- [ ] **Data Privacy Controls:**
  - IP anonymization enabled by default
  - User ID tracking only with explicit consent
  - Data retention policies configured appropriately
  - Personal information exclusion from event parameters
  - Right to deletion compliance mechanisms

- [ ] **Legal Compliance:**
  - Privacy policy updated with analytics disclosure
  - Cookie policy detailing tracking technologies
  - GDPR compliance for European visitors
  - Australian Privacy Act compliance
  - Clear data usage explanations for users

### Testing & Validation Framework
- [ ] **Development Testing:**
  - GTM preview mode testing for all events
  - GA4 Real-time reports validation
  - Debug console verification for event firing
  - Cross-browser and cross-device testing
  - Network condition testing (slow connections)

- [ ] **Quality Assurance:**
  - Event parameter accuracy verification
  - Data layer consistency across pages
  - Error handling for failed event sends
  - Performance impact assessment
  - Accessibility compliance with tracking elements

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] Google Analytics 4 account access and permissions
- [ ] Google Tag Manager account setup and access
- [ ] Privacy policy and legal compliance framework
- [ ] Development environment with testing capabilities

**Technical Dependencies:**
- [ ] Website infrastructure ready for tag implementation
- [ ] Content Management System integration points
- [ ] User authentication system for member tracking
- [ ] Form handling systems for conversion tracking

**Content Dependencies:**
- [ ] Page type classification system defined
- [ ] Content categorization taxonomy established
- [ ] User journey mapping completed
- [ ] Conversion goal prioritization finalized

## 🧪 Testing Criteria

- [ ] **Event Tracking Validation:**
  - All defined events fire correctly across user journeys
  - Event parameters capture accurate and complete data
  - No duplicate or missing events in critical conversion paths
  - Real-time GA4 reports show events within 30 seconds
  - Historical data properly structured for analysis

- [ ] **Cross-Platform Testing:**
  - Mobile responsiveness with accurate touch event tracking
  - Desktop functionality across major browsers
  - Tablet optimization and event parameter consistency
  - Progressive Web App functionality maintained
  - Offline/online state transitions handled gracefully

- [ ] **Privacy Compliance Testing:**
  - Consent mode properly controls data collection
  - Opt-out functionality completely stops tracking
  - Personal information excluded from all events
  - Cookie management working correctly
  - GDPR compliance verified for EU visitors

- [ ] **Performance Impact Testing:**
  - Page load time impact <100ms for analytics implementation
  - Tag loading doesn't block critical page rendering
  - Error handling prevents analytics failures from affecting UX
  - Network timeout handling for slow connections
  - Resource usage optimization verified

## 📊 Definition of Done

- [ ] **Implementation Complete:**
  - GA4 property configured with proper data streams
  - All events from dictionary implemented and tested
  - Event parameters capturing consistently across pages
  - Privacy compliance controls functional

- [ ] **Data Quality Verified:**
  - Real-time data appearing correctly in GA4
  - Event parameters structured for meaningful analysis
  - Data accuracy verified against manual testing
  - No critical events missing from conversion paths

- [ ] **Documentation Complete:**
  - Event dictionary with implementation examples
  - Testing procedures documented for future updates
  - Troubleshooting guide for common issues
  - Privacy compliance procedures documented

- [ ] **Team Readiness:**
  - Development team trained on event implementation
  - Marketing team understands available data
  - Stakeholders know how to access basic reports
  - Update procedures established for new events

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data privacy violations | High | Low | Conservative data collection, legal review |
| Event tracking failures | High | Medium | Comprehensive testing, error handling |
| Performance degradation | Medium | Low | Async implementation, performance monitoring |
| Data accuracy issues | Medium | Medium | Validation framework, regular audits |
| GA4 learning curve | Medium | High | Training, documentation, external support |

## 📈 Success Metrics

**Implementation Success:**
- **Event Coverage:** 100% of defined events firing correctly
- **Data Accuracy:** >95% event parameter accuracy
- **Performance Impact:** <100ms additional page load time
- **Privacy Compliance:** 100% GDPR/privacy law compliance

**Data Quality:**
- **Real-time Reporting:** Events appear in GA4 within 30 seconds
- **Data Completeness:** >95% events include required parameters
- **Error Rate:** <1% of events fail to fire properly
- **Cross-Device Consistency:** Consistent tracking across all devices

**Business Value:**
- **Conversion Tracking:** Complete FMS funnel visibility
- **User Behavior Insights:** Clear user journey understanding
- **Content Performance:** Article and video engagement metrics
- **Attribution Accuracy:** Marketing channel performance tracking

## 🛠️ Technical Implementation Notes

### Google Tag Manager Configuration
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

### Event Implementation Framework
```typescript
// lib/analytics/gtag.ts
export interface EventParams {
  page_type?: string;
  cta_variant?: string;
  user_journey_stage?: string;
  content_category?: string;
  [key: string]: any;
}

export function trackEvent(eventName: string, parameters: EventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Add standard parameters
    const enrichedParams = {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
      user_agent: navigator.userAgent
    };

    window.gtag('event', eventName, enrichedParams);
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, enrichedParams);
    }
  }
}

// Predefined event functions
export const analytics = {
  // FMS Funnel Events
  fmsStart: (stepNumber: number, utmParams: any) => {
    trackEvent('fms_start', {
      page_type: 'fms',
      form_step: `step_${stepNumber}`,
      cta_variant: 'primary',
      user_journey_stage: 'consideration',
      ...utmParams
    });
  },

  fmsStepComplete: (stepNumber: number, completedFields: number) => {
    trackEvent('fms_step_complete', {
      page_type: 'fms',
      form_step: `step_${stepNumber}`,
      completed_fields: completedFields,
      user_journey_stage: 'interest'
    });
  },

  fmsSubmit: (formData: any, utmParams: any) => {
    trackEvent('fms_submit', {
      page_type: 'fms',
      form_step: 'complete',
      user_journey_stage: 'intent',
      fitness_goal: formData.fitnessGoal,
      experience_level: formData.experience,
      ...utmParams
    });
  },

  // Portal Events
  portalLogin: (loginMethod: string) => {
    trackEvent('portal_login', {
      page_type: 'portal',
      login_method: loginMethod,
      user_journey_stage: 'engagement'
    });
  },

  videoPlay: (videoTitle: string, videoCategory: string) => {
    trackEvent('video_play', {
      page_type: 'portal',
      video_title: videoTitle,
      video_category: videoCategory,
      content_category: 'education'
    });
  },

  // Content Events
  postView: (articleTitle: string, category: string, readingTime: number) => {
    trackEvent('post_view', {
      page_type: 'article',
      article_title: articleTitle,
      content_category: category,
      estimated_reading_time: readingTime
    });
  },

  readingProgress: (articleTitle: string, percentage: number) => {
    trackEvent('reading_progress', {
      page_type: 'article',
      article_title: articleTitle,
      reading_percentage: percentage,
      content_category: 'education'
    });
  },

  // Interaction Events
  ctaClick: (ctaText: string, ctaVariant: string, destination: string) => {
    trackEvent('cta_click', {
      cta_text: ctaText,
      cta_variant: ctaVariant,
      link_destination: destination,
      user_journey_stage: 'interest'
    });
  },

  phoneClick: (phoneNumber: string, pageType: string) => {
    trackEvent('phone_click', {
      page_type: pageType,
      phone_number: phoneNumber,
      contact_method: 'phone',
      user_journey_stage: 'intent'
    });
  }
};
```

### Data Layer Structure
```typescript
// lib/analytics/dataLayer.ts
interface DataLayerEvent {
  event: string;
  page_type: string;
  user_journey_stage: string;
  [key: string]: any;
}

export function pushToDataLayer(eventData: DataLayerEvent) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      ...eventData,
      timestamp: new Date().toISOString()
    });
  }
}

// Page view tracking
export function trackPageView(pageType: string, additionalParams: any = {}) {
  pushToDataLayer({
    event: 'page_view',
    page_type: pageType,
    page_url: window.location.href,
    page_title: document.title,
    user_journey_stage: determineJourneyStage(pageType),
    ...additionalParams
  });
}

function determineJourneyStage(pageType: string): string {
  const stageMap = {
    'home': 'awareness',
    'article': 'awareness',
    'hub': 'consideration',
    'fms': 'interest',
    'success': 'intent',
    'portal': 'engagement'
  };
  return stageMap[pageType] || 'awareness';
}
```

### Consent Management
```typescript
// lib/analytics/consent.ts
export class ConsentManager {
  private static instance: ConsentManager;
  private consentState: {
    analytics: boolean;
    marketing: boolean;
  };

  constructor() {
    this.consentState = {
      analytics: false,
      marketing: false
    };
    this.loadConsentState();
  }

  static getInstance(): ConsentManager {
    if (!ConsentManager.instance) {
      ConsentManager.instance = new ConsentManager();
    }
    return ConsentManager.instance;
  }

  updateConsent(analytics: boolean, marketing: boolean) {
    this.consentState = { analytics, marketing };
    this.saveConsentState();
    this.updateGTMConsent();
    this.trackConsentEvent();
  }

  private updateGTMConsent() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: this.consentState.analytics ? 'granted' : 'denied',
        ad_storage: this.consentState.marketing ? 'granted' : 'denied'
      });
    }
  }

  private saveConsentState() {
    localStorage.setItem('consent_preferences', JSON.stringify({
      ...this.consentState,
      timestamp: new Date().toISOString()
    }));
  }

  private loadConsentState() {
    try {
      const stored = localStorage.getItem('consent_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.consentState = {
          analytics: parsed.analytics,
          marketing: parsed.marketing
        };
      }
    } catch (error) {
      console.warn('Failed to load consent state:', error);
    }
  }

  private trackConsentEvent() {
    if (this.consentState.analytics) {
      trackEvent('consent_update', {
        analytics_consent: this.consentState.analytics,
        marketing_consent: this.consentState.marketing
      });
    }
  }

  hasAnalyticsConsent(): boolean {
    return this.consentState.analytics;
  }

  hasMarketingConsent(): boolean {
    return this.consentState.marketing;
  }
}
```

### Event Testing Framework
```typescript
// lib/analytics/testing.ts
export class AnalyticsTestSuite {
  private events: Array<{
    name: string;
    params: any;
    timestamp: Date;
  }> = [];

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.interceptEvents();
    }
  }

  private interceptEvents() {
    const originalGtag = window.gtag;
    window.gtag = (...args: any[]) => {
      if (args[0] === 'event') {
        this.events.push({
          name: args[1],
          params: args[2] || {},
          timestamp: new Date()
        });
      }
      return originalGtag?.apply(window, args);
    };
  }

  getEvents(): typeof this.events {
    return [...this.events];
  }

  getEventsByName(eventName: string) {
    return this.events.filter(event => event.name === eventName);
  }

  clearEvents() {
    this.events = [];
  }

  validateEvent(eventName: string, expectedParams: any): boolean {
    const events = this.getEventsByName(eventName);
    if (events.length === 0) {
      console.error(`Event ${eventName} was not fired`);
      return false;
    }

    const latestEvent = events[events.length - 1];
    for (const [key, value] of Object.entries(expectedParams)) {
      if (latestEvent.params[key] !== value) {
        console.error(`Event ${eventName} parameter ${key} expected ${value}, got ${latestEvent.params[key]}`);
        return false;
      }
    }

    return true;
  }
}
```

## 📝 Event Dictionary Reference

### Complete Event List with Parameters

**Conversion Events:**
- `fms_start` - `page_type`, `form_step`, `cta_variant`, `utm_*`
- `fms_step_complete` - `page_type`, `form_step`, `completed_fields`
- `fms_submit` - `page_type`, `user_journey_stage`, `fitness_goal`, `utm_*`
- `first_session_booked` - `booking_date`, `utm_source`, `conversion_value`

**Engagement Events:**
- `portal_login` - `page_type`, `login_method`, `user_journey_stage`
- `video_play` - `video_title`, `video_category`, `video_duration`
- `video_complete` - `video_title`, `completion_percentage`, `watch_time`
- `post_view` - `article_title`, `content_category`, `estimated_reading_time`

**Interaction Events:**
- `cta_click` - `cta_text`, `cta_variant`, `link_destination`
- `phone_click` - `phone_number`, `contact_method`, `page_type`
- `chat_open` - `chat_widget`, `page_type`, `user_journey_stage`
- `social_share` - `platform`, `content_type`, `content_title`

---

**Story Owner:** Product Manager  
**Analytics Lead:** Marketing Analyst  
**Technical Lead:** Frontend Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
