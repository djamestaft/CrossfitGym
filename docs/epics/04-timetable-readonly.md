# Epic 4: Timetable (Read-Only)

**Epic ID:** EPIC-04  
**Priority:** Medium  
**Business Value:** Discovery without booking complexity  
**Technical Complexity:** Medium  
**Effort Estimate:** 6-8 story points  
**Sprint Target:** Week 1-2

## 🎯 Epic Goal

Satisfy visitor discovery needs with class schedule information while maintaining operational simplicity and avoiding booking complexity in MVP.

**Success Metrics:**

- Timetable loads ≤2.5s cold, ≤1s warm
- Zero downtime even during Fitbox outages
- Mobile-optimized viewing experience
- Clear timezone and holiday messaging

## 👥 User Stories

### Story TIMETABLE-001: CMS Timetable Fallback

**As a** potential member  
**I want** to see class schedules easily  
**So that** I can plan when to visit or attend classes

**Acceptance Criteria:**

- [ ] Responsive grid layout showing weekly schedule
- [ ] Weekday filter functionality for mobile users
- [ ] Holiday and timezone notes displayed prominently via CMS
- [ ] Class details include: time, type, coach, capacity indicator
- [ ] Mobile-first design with horizontal scroll if needed
- [ ] Clear visual hierarchy and readable typography
- [ ] Loading states and error handling
- [ ] Cache strategy for performance optimization
- [ ] Print-friendly styling for schedule reference

**Dependencies:**

- CMS content structure for schedule management
- Design system for consistent styling
- Caching strategy implementation

**Definition of Done:**

- [ ] Loads within performance targets consistently
- [ ] Mobile experience optimized and tested
- [ ] CMS editing workflow documented for staff
- [ ] Cache invalidation working properly
- [ ] Holiday messaging system functional

---

### Story TIMETABLE-002: Fitbox Integration (Optional)

**As a** gym operations manager  
**I want** automatic schedule updates from Fitbox  
**So that** the website always shows current class information

**Acceptance Criteria:**

- [ ] Read-only API integration with Fitbox system
- [ ] Graceful fallback to CMS content when Fitbox unavailable
- [ ] Data transformation from Fitbox format to display format
- [ ] Toggleable data source configuration (CMS vs Fitbox)
- [ ] Error monitoring and alerting for API failures
- [ ] Rate limiting and API key management
- [ ] Data caching with appropriate TTL
- [ ] Backup data strategy during extended outages

**Dependencies:**

- Fitbox API access credentials and documentation
- API error handling and monitoring infrastructure
- Fallback mechanism implementation

**Definition of Done:**

- [ ] API integration functional with proper error handling
- [ ] Fallback mechanism tested under various failure scenarios
- [ ] Monitoring alerts configured for API health
- [ ] Documentation for troubleshooting API issues
- [ ] Data source toggle working in CMS

## 🔗 Epic Dependencies

**Upstream Dependencies:**

- CMS infrastructure for manual schedule management
- Design system components for consistent UI
- API infrastructure for Fitbox integration

**Downstream Dependencies:**

- Timetable data may inform capacity features in post-MVP
- Schedule accuracy affects member satisfaction and trust

## 🎨 Design Specifications

### Layout Structure

```
Desktop Timetable:
┌─────────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Time        │ Monday  │ Tuesday │ Wednesday│ Thursday│ Friday  │ Saturday│ Sunday  │
├─────────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ 6:00 AM     │ CrossFit│         │ CrossFit│         │ CrossFit│ Open Gym│         │
│             │ Sarah   │         │ Mike    │         │ Sarah   │         │         │
├─────────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ 9:00 AM     │ Foundations│ CrossFit│ CrossFit│ CrossFit│ CrossFit│ CrossFit│ CrossFit│
│             │ Mike    │ Sarah   │ Mike    │ Sarah   │ Mike    │ Sarah   │ Mike    │
└─────────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

### Mobile Layout

```
Mobile Timetable (Day View):
┌─────────────────────────────────┐
│ [Mon] Tue  Wed  Thu  Fri  Sat  Sun │ <- Day selector
├─────────────────────────────────┤
│ 6:00 AM                         │
│ CrossFit with Sarah             │
│ 🟢 Spots Available              │
├─────────────────────────────────┤
│ 9:00 AM                         │
│ Foundations with Mike           │
│ 🟡 Few Spots Left               │
└─────────────────────────────────┘
```

## 📱 Technical Implementation

### CMS Schema (Sanity)

```javascript
// timetable.js
{
  name: 'timetable',
  type: 'document',
  fields: [
    {
      name: 'schedule',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', type: 'string' },
          { name: 'time', type: 'string' },
          { name: 'classType', type: 'string' },
          { name: 'coach', type: 'reference', to: [{ type: 'coach' }] },
          { name: 'capacity', type: 'number' },
          { name: 'notes', type: 'text' }
        ]
      }]
    },
    {
      name: 'holidayMessage',
      type: 'text',
      description: 'Special schedule notes for holidays'
    },
    {
      name: 'timezoneNote',
      type: 'string',
      description: 'Timezone information for visitors'
    }
  ]
}
```

### Fitbox API Integration

```javascript
// fitbox-service.js
class FitboxService {
  async getSchedule() {
    try {
      const response = await fetch(FITBOX_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${FITBOX_API_KEY}` },
      })
      return await this.transformScheduleData(response.json())
    } catch (error) {
      console.warn('Fitbox API failed, falling back to CMS')
      return await this.getCMSFallback()
    }
  }

  async getCMSFallback() {
    // Return manually maintained schedule from CMS
  }
}
```

### Performance Optimization

- **Caching Strategy:** 15-minute TTL for live data, 24-hour for fallback
- **Loading Strategy:** Show cached version immediately, update in background
- **Error Handling:** Graceful degradation with clear user messaging
- **Responsive Images:** Optimized coach photos with proper sizing

## 📊 Success Criteria

### Performance Targets

- **Initial Load:** ≤2.5s on 3G connection
- **Repeat Visits:** ≤1s with proper caching
- **API Response:** ≤500ms for schedule data
- **Availability:** 99.9% uptime regardless of Fitbox status

### User Experience Metrics

- **Mobile Usage:** >70% of timetable views expected mobile
- **Engagement:** Average time on timetable page >30 seconds
- **Bounce Rate:** <60% from timetable page
- **Error Rate:** <1% of page loads show error states

## 🚨 Risks & Mitigations

| Risk                         | Impact                 | Mitigation                                    |
| ---------------------------- | ---------------------- | --------------------------------------------- |
| Fitbox API unreliable        | Outdated schedule info | Robust fallback to CMS, monitoring alerts     |
| Manual CMS updates forgotten | Stale content          | Clear update workflow, automated reminders    |
| Mobile performance issues    | Poor user experience   | Mobile-first development, performance testing |
| Schedule changes missed      | Member frustration     | Clear content management process              |

## 🔧 Operational Considerations

### Content Management Workflow

1. **Weekly Schedule Review:** Operations team validates schedule accuracy
2. **Holiday Planning:** Update holiday messages 2 weeks in advance
3. **Coach Changes:** Update coach assignments within 24 hours
4. **Capacity Updates:** Reflect any capacity changes immediately

### Monitoring & Alerts

- **API Health:** Monitor Fitbox API response times and failures
- **Content Freshness:** Alert if schedule not updated in 48 hours
- **Performance:** Track Core Web Vitals for timetable page
- **User Feedback:** Monitor support requests about schedule accuracy

### Future Enhancements (Post-MVP)

- **Capacity Heatmap:** Visual indicators of class popularity
- **Waitlist Information:** Show waitlist status for full classes
- **Coach Profiles:** Click-through to detailed coach information
- **Personal Schedule:** Logged-in members see their registered classes
- **Booking Integration:** Direct booking links (requires payment system)

## 📝 Implementation Notes

### API Design Principles

- **Fail Fast:** Quick detection of API issues
- **Fail Gracefully:** Always provide some schedule information
- **Fail Silently:** Don't expose technical errors to users
- **Cache Aggressively:** Reduce dependency on external systems

### Accessibility Considerations

- **Screen Readers:** Proper table headers and ARIA labels
- **Keyboard Navigation:** Full functionality without mouse
- **Color Contrast:** Schedule remains readable for all users
- **Text Scaling:** Layout works at 200% zoom level

### SEO Optimization

- **Structured Data:** Event schema for class listings
- **Local SEO:** Include location and business hours information
- **Content Updates:** Fresh content signals to search engines
- **Mobile-First:** Google's mobile-first indexing compliance

**Epic Owner:** Product Manager  
**Tech Lead:** Development Lead  
**Operations Owner:** Gym Manager  
**Last Updated:** September 13, 2025
