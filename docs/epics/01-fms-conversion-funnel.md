# Epic 1: FMS Conversion Funnel

**Epic ID:** EPIC-01  
**Priority:** Critical Path ⭐  
**Business Value:** Primary revenue driver (+50% FMS leads target)  
**Technical Complexity:** Medium  
**Effort Estimate:** 12-15 story points  
**Sprint Target:** Week 1-2

## 🎯 Epic Goal

Drive qualified FMS submissions and set clear next steps for prospect conversion.

**Success Metrics:**

- +50% FMS leads by Week 4
- FMS → First Session ≥60%
- Form completion rate ≥70%
- Median Time-to-First-Session ≤5 days

## 👥 User Stories

### Story FMS-001: FMS Landing Page with Trust Elements

**As a** cautious beginner  
**I want** a clear FMS overview with trust cues  
**So that** I feel safe to start my fitness journey

**Acceptance Criteria:**

- [ ] Hero section with primary CTA prominently displayed
- [ ] Proof bar with testimonials/credentials visible
- [ ] Safety panel explaining injury-aware approach
- [ ] Basic FAQ addressing common concerns
- [ ] Internal links to condition hubs for credibility
- [ ] Page loads with LCP ≤2.5s on mobile and desktop
- [ ] SEO meta tags and schema markup implemented
- [ ] Mobile responsive design across all breakpoints

**Dependencies:**

- Design system components
- Testimonials content collection
- Coach qualification copy

**Definition of Done:**

- [ ] Passes Core Web Vitals thresholds
- [ ] Schema validation with no critical errors
- [ ] Accessibility audit AA compliance
- [ ] GA4 page view events firing correctly

---

### Story FMS-002: Two-Step Form with Validation

**As a** visitor interested in assessment  
**I want** an easy 2-step form process  
**So that** I can request an FMS without friction

**Acceptance Criteria:**

- [ ] Step 1: Contact details (name, email, phone, preferred time)
- [ ] Step 2: Context gathering (goals, injury flags, experience level)
- [ ] Real-time inline validation with clear error messages
- [ ] Bot protection via Turnstile or ReCAPTCHA
- [ ] Form state persistence between steps
- [ ] Mobile-optimized input fields and keyboard types
- [ ] Progress indicator showing current step
- [ ] Proper form accessibility labels and ARIA

**Dependencies:**

- GA4 event tracking setup
- Bot protection service configuration
- Email validation service

**Definition of Done:**

- [ ] `fms_start` and `fms_submit` GA4 events fire correctly
- [ ] Form submission data properly sanitized
- [ ] Error handling for network failures
- [ ] Analytics tracking includes UTM parameters

---

### Story FMS-003: Success Page & Admin Notifications

**As a** staff member  
**I need** instant notification with context  
**So that** I can follow up within 1 business day

**Acceptance Criteria:**

- [ ] Success page with clear next steps messaging
- [ ] Promise of contact within 1 business day
- [ ] Admin email notification sent within 1 minute
- [ ] Lead data persisted with timestamp and UTM source
- [ ] Backup notification system if primary fails
- [ ] Success page includes helpful resources/next steps
- [ ] Confirmation number displayed to user

**Dependencies:**

- Operations email setup and backup
- Data storage solution (ops sheet or CMS)
- Email delivery service configuration

**Definition of Done:**

- [ ] Ops sheet integration functional with all required fields
- [ ] UTM tracking parameters captured and stored
- [ ] Email delivery confirmation logged
- [ ] Graceful handling of storage failures

---

### Story FMS-004: First-Session Tracking (Manual MVP)

**As a** Product Manager  
**I need** reliable first session tracking  
**So that** I can compute conversion rates and optimize the funnel

**Acceptance Criteria:**

- [ ] Ops sheet with dedicated first-session tracking fields
- [ ] Weekly cohort calculation sheet with formulas
- [ ] Median TTF automatically calculated from data
- [ ] Dashboard tile showing FMS → First Session conversion %
- [ ] Clear instructions for ops team on data entry
- [ ] Data validation to prevent entry errors

**Dependencies:**

- Analytics dashboard setup
- Operations process documentation
- Staff training on tracking workflow

**Definition of Done:**

- [ ] Automated TTF calculation working correctly
- [ ] Conversion tracking dashboard accessible to stakeholders
- [ ] Data integrity checks in place
- [ ] Weekly reporting template functional

## 🔗 Epic Dependencies

**Upstream Dependencies:**

- Design system and component library
- GA4 and analytics infrastructure
- Content creation (testimonials, safety copy)

**Downstream Dependencies:**

- This epic feeds conversion data to all other measurement
- Success here validates the entire business model

## 📊 Success Criteria

**Week 1 Baseline:**

- Establish current FMS lead volume
- Measure existing conversion rates

**Week 4 Target:**

- 50% increase in qualified FMS leads
- 70% form completion rate
- 60% FMS to first session conversion
- Median TTF ≤ 5 days

## 🚨 Risks & Mitigations

| Risk                    | Impact              | Mitigation                                   |
| ----------------------- | ------------------- | -------------------------------------------- |
| Low initial lead volume | Miss KPI targets    | Emphasis on proof elements, GBP optimization |
| Form abandonment        | Poor conversion     | Multi-step approach, progress indicators     |
| Ops follow-up delays    | Slow TTF            | Clear SLA, daily standup tracking            |
| Bot spam submissions    | Data quality issues | Robust bot protection, manual review process |

## 📝 Notes

- This epic is the foundation of the entire MVP business case
- Form design should prioritize mobile experience (70%+ traffic expected)
- Consider A/B testing headline variations post-launch
- Manual tracking is temporary - automate in post-MVP phases

**Epic Owner:** Product Manager  
**Tech Lead:** Development Lead  
**Content Owner:** Content Lead  
**Last Updated:** September 13, 2025
