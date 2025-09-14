# Epic 6: Analytics & Observability

**Epic ID:** EPIC-06  
**Priority:** ⭐ Critical  
**Business Value:** Measurable outcomes and data-driven optimization  
**Technical Complexity:** Medium  
**Effort Estimate:** 8-10 story points  
**Sprint Target:** Week 0-2

## 🎯 Epic Goal

Establish comprehensive measurement framework to track MVP success, identify optimization opportunities, and ensure system reliability.

**Success Metrics:**

- All MVP KPIs trackable and reportable
- Weekly automated reporting functional
- Performance monitoring with <5 min issue detection
- Data-driven insights driving optimization decisions

## 👥 User Stories

### Story ANALYTICS-001: GA4 Implementation & Event Dictionary

**As a** Product Manager  
**I need** comprehensive event tracking  
**So that** I can measure funnel performance and user behavior accurately

**Acceptance Criteria:**

- [ ] **GA4 Property Setup** with proper configuration
- [ ] **Event Dictionary Implementation** covering all MVP events:
  - **Funnel Events:** `fms_start`, `fms_submit`, `first_session_booked` (manual)
  - **Engagement Events:** `chat_open`, `call_click`, `map_click`, `portal_login`, `video_play`, `post_view`
  - **Navigation Events:** Page views with proper parameters
- [ ] **Event Parameters** consistently implemented:
  - `page_type` (home, fms, hub, article, portal, etc.)
  - `cta_variant` (primary, secondary, text-link, etc.)
  - `form_step` (step1, step2, success)
  - All `utm_*` parameters preserved
- [ ] **Test Plan** with validation for all events
- [ ] **Documentation** with event examples and implementation guide
- [ ] **Privacy Compliance** with proper consent management

**Dependencies:**

- GA4 account access and property creation
- Google Tag Manager setup
- Privacy policy and consent framework
- Development team training on analytics implementation

**Definition of Done:**

- [ ] All events firing correctly across devices/browsers
- [ ] Event parameters captured consistently
- [ ] Real-time debugging functional in GA4
- [ ] Event documentation complete with examples
- [ ] Privacy compliance verified

---

### Story ANALYTICS-002: KPI Dashboard Setup

**As a** stakeholder  
**I want** automated weekly reports  
**So that** I can track MVP progress and make data-driven decisions

**Acceptance Criteria:**

- [ ] **Automated Weekly KPI Report** including:
  - **Lead Metrics:** FMS leads count, week-over-week change
  - **Conversion Metrics:** Form completion %, FMS→First Session %
  - **Time Metrics:** Median Time-to-First-Session
  - **Engagement Metrics:** Portal Weekly Active Users, video completion rates
  - **Traffic Metrics:** Organic traffic %, GBP actions count
  - **Performance Metrics:** Core Web Vitals summary
- [ ] **Dashboard Accessibility** for all stakeholders
- [ ] **Data Visualization** with clear trend indicators
- [ ] **Alert System** for significant metric changes
- [ ] **Export Functionality** for detailed analysis
- [ ] **Mobile-Responsive** dashboard viewing

**Dependencies:**

- GA4 data connections and API access
- Google Business Profile API access
- Dashboard tool selection (Data Studio, Looker, etc.)
- Stakeholder access management

**Definition of Done:**

- [ ] Automated reports generated weekly
- [ ] All stakeholders have appropriate access
- [ ] Alert thresholds configured and tested
- [ ] Mobile viewing experience optimized
- [ ] Backup reporting method established

---

### Story ANALYTICS-003: Performance Monitoring & Quality Gates

**As a** Development Lead  
**I need** automated performance monitoring  
**So that** I can maintain quality standards and detect issues quickly

**Acceptance Criteria:**

- [ ] **Core Web Vitals Monitoring** with automated testing:
  - LCP ≤2.5s on key pages (Home, FMS, Hubs, Articles)
  - CLS ≤0.1 across all page types
  - INP ≤200ms for all interactions
- [ ] **Lighthouse CI Integration** in deployment pipeline
- [ ] **Accessibility Baseline** with automated WCAG AA testing
- [ ] **Error Monitoring** for 404s, 500s, and JavaScript errors
- [ ] **Uptime Monitoring** with ≥99.9% target
- [ ] **Alert System** for quality threshold breaches
- [ ] **Performance Budget** enforcement in CI/CD

**Dependencies:**

- CI/CD pipeline setup
- Monitoring service selection and configuration
- Alert notification channels (Slack, email)
- Performance baseline establishment

**Definition of Done:**

- [ ] Automated quality gates prevent bad deployments
- [ ] Real-time alerts for critical issues
- [ ] Performance trends tracked over time
- [ ] Accessibility regression prevention
- [ ] Issue escalation procedures documented

## 🔗 Epic Dependencies

**Upstream Dependencies:**

- GA4 account setup and access permissions
- Privacy compliance framework
- CI/CD infrastructure
- Monitoring service accounts

**Downstream Dependencies:**

- All other epics depend on analytics for success measurement
- Performance monitoring ensures user experience quality
- Data insights drive post-MVP optimization

## 📊 Analytics Implementation Plan

### Event Tracking Strategy

**Funnel Tracking (Primary):**

```javascript
// FMS Funnel Events
gtag('event', 'fms_start', {
  page_type: 'fms',
  cta_variant: 'primary',
  utm_source: utm_source,
  utm_medium: utm_medium,
  utm_campaign: utm_campaign,
})

gtag('event', 'fms_submit', {
  page_type: 'fms',
  form_step: 'step2',
  completed_fields: field_count,
  utm_source: utm_source,
})
```

**Engagement Tracking:**

```javascript
// Portal & Content Events
gtag('event', 'portal_login', {
  page_type: 'portal',
  login_method: 'magic_link',
})

gtag('event', 'video_play', {
  page_type: 'portal',
  video_title: video_name,
  video_category: 'movement_library',
})

gtag('event', 'post_view', {
  page_type: 'article',
  content_category: 'education',
  reading_progress: 25,
})
```

### Dashboard Architecture

**Weekly KPI Dashboard Structure:**

```
MVP Performance Dashboard
├── Lead Generation
│   ├── FMS Leads (weekly count & trend)
│   ├── Traffic Sources breakdown
│   └── Form Completion Rate
├── Conversion Metrics
│   ├── FMS → First Session %
│   ├── Median Time-to-First-Session
│   └── Weekly Cohort Analysis
├── Engagement Metrics
│   ├── Portal Weekly Active Users
│   ├── Average Session Duration
│   └── Content Engagement Rates
├── Technical Performance
│   ├── Core Web Vitals Summary
│   ├── Error Rate & Uptime
│   └── Page Speed Trends
└── Business Intelligence
    ├── Organic Traffic Growth
    ├── GBP Action Increases
    └── Member Feedback Summary
```

## 🔧 Technical Implementation

### GA4 Configuration

**Custom Dimensions:**

```javascript
// Set up custom dimensions for enhanced analysis
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    custom_parameter_1: 'page_type',
    custom_parameter_2: 'cta_variant',
    custom_parameter_3: 'user_journey_stage',
  },
})
```

**Enhanced E-commerce (Future):**

```javascript
// Prepared for post-MVP payment tracking
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 199.0,
  currency: 'AUD',
  items: [
    {
      item_id: 'intro_offer',
      item_name: 'Intro Package',
      category: 'membership',
      price: 199.0,
      quantity: 1,
    },
  ],
})
```

### Performance Monitoring Setup

**Lighthouse CI Configuration:**

```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/fms',
        'http://localhost:3000/hubs/shoulder',
        'http://localhost:3000/articles/injury-safe-scaling'
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }]
      }
    }
  }
};
```

**Web Vitals Monitoring:**

```javascript
// web-vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  gtag('event', 'web_vitals', {
    metric_name: metric.name,
    metric_value: Math.round(metric.value),
    metric_id: metric.id,
    page_type: getPageType(),
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

## 📈 Success Criteria

### Week 1 Milestones

- GA4 property configured with basic page tracking
- Core events implemented and tested
- Performance monitoring baseline established

### Week 4 Launch Targets

- All MVP events tracking correctly
- Weekly KPI dashboard operational
- Performance monitoring with alerting active
- Baseline data captured for all metrics

### Post-Launch Validation

- Event data accuracy verified against manual counts
- Dashboard data matches source analytics
- Alert system tested with synthetic issues
- Stakeholder training completed

## 🚨 Risks & Mitigations

| Risk                            | Impact               | Mitigation                                         |
| ------------------------------- | -------------------- | -------------------------------------------------- |
| GA4 data delays                 | Inaccurate reporting | Build in 24-48h delays, use real-time where needed |
| Privacy regulations             | Legal compliance     | Conservative data collection, clear consent        |
| Dashboard complexity            | Low adoption         | Simple, focused views with drill-down capability   |
| Performance monitoring overhead | Site slowdown        | Efficient monitoring, async reporting              |

## 📱 Privacy & Compliance

### Data Collection Principles

- **Minimal Collection:** Only data necessary for business decisions
- **Clear Consent:** Explicit consent for analytics tracking
- **Data Retention:** Align with business needs and legal requirements
- **User Rights:** Provide opt-out mechanisms and data deletion

### GDPR/Privacy Compliance

```javascript
// Consent-based tracking
if (hasAnalyticsConsent()) {
  gtag('config', 'GA_MEASUREMENT_ID', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
  })
} else {
  gtag('config', 'GA_MEASUREMENT_ID', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
  })
}
```

## 📊 Reporting Framework

### Automated Reports

- **Daily:** Critical error alerts and uptime monitoring
- **Weekly:** Full KPI dashboard with stakeholder distribution
- **Monthly:** Comprehensive analysis with recommendations
- **Quarterly:** Strategic review with trend analysis

### Manual Tracking Integration

```javascript
// First session tracking (manual entry integration)
const cohortTracking = {
  fms_date: 'YYYY-MM-DD',
  first_session_date: 'YYYY-MM-DD',
  days_to_first_session: calculated_value,
  utm_source: tracked_source,
  conversion_status: 'completed',
}
```

### Alert Thresholds

- **Critical:** >50% drop in key metrics
- **Warning:** >25% change week-over-week
- **Performance:** Core Web Vitals below thresholds
- **Error Rate:** >5% increase in 404/500 errors

**Epic Owner:** Product Manager  
**Analytics Lead:** Marketing/Data Analyst  
**Tech Lead:** Development Lead  
**Last Updated:** September 13, 2025
