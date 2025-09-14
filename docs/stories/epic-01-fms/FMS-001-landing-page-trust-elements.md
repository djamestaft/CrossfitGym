# User Story: FMS-001 - FMS Landing Page with Trust Elements

**Epic:** Epic 1: FMS Conversion Funnel  
**Story ID:** FMS-001  
**Priority:** Critical Path ⭐  
**Effort Estimate:** 4 story points  
**Sprint Target:** Week 1-2

## 📋 User Story

**As a** cautious fitness beginner  
**I want** a clear FMS overview with trust cues and safety messaging  
**So that** I feel confident and safe to start my fitness journey

## ✅ Acceptance Criteria

### Hero Section & Primary CTA

- [ ] **Compelling Hero:**
  - Clear value proposition: "Start Your Fitness Journey Safely"
  - Primary CTA button: "Get Your Movement Assessment" prominently displayed
  - Hero image showing professional, welcoming gym environment
  - Mobile-first responsive design across all breakpoints
  - Loading performance: LCP ≤2.5s on mobile and desktop

- [ ] **Trust Signal Bar:**
  - Coach qualifications prominently displayed
  - Years of experience and certifications visible
  - Client testimonial count or success metrics
  - Professional accreditation logos (Exercise & Sports Science Australia)

### Trust & Safety Elements

- [ ] **Safety Panel:**
  - "Injury-Aware Approach" messaging prominently featured
  - Clear explanation of assessment-first methodology
  - "No pressure, no judgment" safety promise
  - Link to safety standards and approach page

- [ ] **Social Proof Section:**
  - 3-5 client testimonials with photos and results
  - Success stories from similar beginners
  - Before/after stories (with consent)
  - Local community connection messaging

- [ ] **Credibility Indicators:**
  - Coach bio section with qualifications
  - Professional certifications displayed
  - Years of experience highlighted
  - Physiotherapy partnership messaging

### Information Architecture

- [ ] **FMS Explanation Section:**
  - Clear explanation of what FMS assessment involves
  - "What to expect" during the assessment
  - Duration and process overview
  - Benefits and value proposition

- [ ] **FAQ Section:**
  - Address common beginner concerns
  - Pricing transparency (assessment cost)
  - "Do I need to be fit already?" type questions
  - Booking and cancellation policies

- [ ] **Internal Linking:**
  - Links to condition-specific hubs (shoulder, back pain)
  - Link to coach bio pages for credibility
  - Link to safety/standards page
  - Link to member testimonials page

### Technical Performance

- [ ] **Core Web Vitals:**
  - Largest Contentful Paint (LCP) ≤2.5s
  - Cumulative Layout Shift (CLS) ≤0.1
  - Interaction to Next Paint (INP) ≤200ms
  - First Input Delay (FID) ≤100ms

- [ ] **SEO Implementation:**
  - Title tag: "FMS Movement Assessment Geelong | [Gym Name]"
  - Meta description with local keywords and value prop
  - H1 tag with primary keyword targeting
  - Schema markup for LocalBusiness and Service
  - Open Graph tags for social sharing

## 🔗 Dependencies

**Upstream Dependencies:**

- [ ] Design system components and branding guidelines
- [ ] Testimonial content collection and consent
- [ ] Coach qualification copy and professional photos
- [ ] Professional photography of gym and assessment area

**Content Dependencies:**

- [ ] 5-8 client testimonials with photos and consent
- [ ] Coach bio content and professional qualifications
- [ ] Safety standards and methodology documentation
- [ ] FAQ content addressing common concerns

**Technical Dependencies:**

- [ ] Component library with responsive design system
- [ ] GA4 event tracking implementation
- [ ] Image optimization pipeline
- [ ] SEO schema markup configuration

## 🧪 Testing Criteria

- [ ] **Performance Testing:**
  - Lighthouse audit scores: Performance >90, SEO >95
  - Core Web Vitals pass on mobile and desktop
  - Image optimization reduces file sizes >50%
  - Page speed testing on 3G connection ≤4s load time

- [ ] **Accessibility Testing:**
  - WCAG AA compliance verified
  - Screen reader navigation functional
  - Keyboard navigation works for all interactive elements
  - Color contrast ratios meet accessibility standards

- [ ] **Cross-Browser Testing:**
  - Chrome, Safari, Firefox, Edge compatibility
  - Mobile responsive design across iOS/Android
  - Progressive enhancement for older browsers
  - Touch targets meet minimum size requirements (44px)

- [ ] **Content Testing:**
  - All testimonials display correctly with consent verification
  - Coach qualifications accurate and up-to-date
  - All internal links functional and relevant
  - FAQ content addresses actual user concerns

## 📊 Definition of Done

- [ ] **Technical Quality:**
  - Passes all Core Web Vitals thresholds
  - Schema validation with no critical errors
  - Accessibility audit AA compliance achieved
  - Cross-browser compatibility verified

- [ ] **Analytics Implementation:**
  - GA4 page view events firing correctly
  - Form interaction events tracked
  - Scroll depth tracking implemented
  - UTM parameter handling functional

- [ ] **Content Quality:**
  - All testimonials have proper consent documentation
  - Coach qualifications verified and current
  - Legal review completed for all claims
  - Professional photography optimized and licensed

- [ ] **Performance Verification:**
  - Real User Monitoring (RUM) data collection active
  - Performance monitoring alerts configured
  - Image optimization verified and functional
  - CDN caching strategies implemented

## ⚠️ Risk Assessment

| Risk                      | Impact | Probability | Mitigation                                      |
| ------------------------- | ------ | ----------- | ----------------------------------------------- |
| Missing testimonials      | High   | Medium      | Start collection early, use placeholder content |
| Performance issues        | High   | Low         | Performance budgets, continuous monitoring      |
| Content accuracy concerns | Medium | Low         | Legal review, fact verification process         |
| Mobile experience issues  | High   | Low         | Mobile-first design, device testing             |

## 📈 Success Metrics

**Engagement Metrics:**

- **Page Visit Duration:** Target >90 seconds average
- **Scroll Depth:** >70% users reach CTA section
- **Bounce Rate:** <60% for landing page traffic
- **CTA Click Rate:** >15% of page visitors

**Performance Metrics:**

- **Core Web Vitals:** 100% pass rate
- **Page Load Speed:** <3s on mobile, <2s on desktop
- **SEO Performance:** Rank in top 3 for "movement assessment Geelong"

**Conversion Metrics:**

- **Page-to-Form:** >20% conversion rate
- **Traffic Quality:** >50% from local search
- **Return Visitors:** >30% of visitors return within 7 days

## 🛠️ Technical Implementation Notes

### Component Structure

```tsx
// app/fms/page.tsx
export default function FMSLandingPage() {
  return (
    <>
      <SEOHead
        title='FMS Movement Assessment Geelong | [Gym Name]'
        description='Professional movement assessment to start your fitness journey safely. Expert physiotherapy-backed approach.'
      />
      <HeroSection />
      <TrustBarSection />
      <SafetyPanel />
      <SocialProofSection />
      <FMSExplanation />
      <FAQSection />
      <CTASection />
    </>
  )
}
```

### Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Gym Name]",
  "description": "Professional FMS movement assessment and CrossFit training",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Address]",
    "addressLocality": "Geelong",
    "addressRegion": "VIC",
    "postalCode": "[Postcode]"
  },
  "telephone": "[Phone]",
  "url": "https://geelongmovement.com/fms",
  "sameAs": ["[Social Media URLs]"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Movement Assessment",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "FMS Assessment",
          "description": "Functional Movement Screen assessment"
        }
      }
    ]
  }
}
```

### GA4 Event Tracking

```javascript
// Analytics events to implement
const fmsPageEvents = {
  page_view: 'fms_landing_view',
  hero_cta_click: 'fms_hero_cta_click',
  safety_panel_view: 'fms_safety_panel_view',
  testimonial_interaction: 'fms_testimonial_click',
  faq_expand: 'fms_faq_expand',
  scroll_milestone: 'fms_scroll_[25|50|75|100]',
}
```

## 📝 Content Requirements

### Testimonials (5 Required)

- [ ] **Sarah, 34:** "Never exercised before" → "Lost 15kg, feeling stronger"
- [ ] **Mike, 45:** "Chronic back pain" → "Pain-free and active again"
- [ ] **Emma, 28:** "Post-pregnancy fitness" → "Stronger than before pregnancy"
- [ ] **David, 52:** "Intimidated by gyms" → "Found my fitness community"
- [ ] **Lisa, 29:** "Previous injury concerns" → "Safe progression, amazing results"

### FAQ Content

- [ ] "Do I need to be fit to start?" → No, assessment helps us start safely
- [ ] "How much does assessment cost?" → $X, applied to membership if joining
- [ ] "What should I wear/bring?" → Comfortable clothes, we provide everything else
- [ ] "How long does it take?" → 45-60 minutes comprehensive assessment
- [ ] "What happens after?" → Personalized program design and goal setting

### Coach Qualification Copy

- [ ] Exercise & Sports Science degree
- [ ] Years of experience with beginners
- [ ] Physiotherapy partnership benefits
- [ ] Continuing education and certifications
- [ ] Personal fitness journey and philosophy

---

**Story Owner:** Product Manager  
**Content Lead:** Content Specialist  
**Technical Lead:** Frontend Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
