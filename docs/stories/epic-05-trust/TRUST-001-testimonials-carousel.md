# User Story: TRUST-001 - Testimonials Carousel

**Epic:** Epic 5: Trust & Proof Components  
**Story ID:** TRUST-001  
**Priority:** High  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 2-3

## 📋 User Story

**As a** cautious fitness beginner or someone who's had bad gym experiences  
**I want** to see real member success stories and transformations  
**So that** I feel confident this gym can help people like me achieve results safely

## ✅ Acceptance Criteria

### Content Structure & Management

- [ ] **CMS-Editable Testimonials:**
  - Sanity CMS schema for testimonial management
  - Rich content fields for member information and stories
  - Photo upload with consent documentation tracking
  - Display priority ordering and featured testimonial flags
  - Privacy-compliant attribution (first name + last initial)

- [ ] **Member Information Fields:**
  - Member name with privacy controls
  - Optional demographic information (age range, background)
  - Membership duration and journey timeline
  - Specific results or transformation details
  - Member photo with explicit consent documentation
  - Favorite aspects or testimonial highlights

- [ ] **Content Quality Standards:**
  - Minimum 6 authentic member stories for launch
  - Diverse representation across age groups and fitness levels
  - Specific, measurable results where possible
  - Authentic tone avoiding overly promotional language
  - Consent and photo release documentation for all content

### Interactive Carousel Component

- [ ] **Responsive Design:**
  - Desktop: Full testimonial with photo and detailed quote
  - Mobile: Condensed view with swipeable cards
  - Tablet: Optimized layout for medium screen sizes
  - Touch-friendly navigation controls across all devices
  - Consistent brand styling and visual hierarchy

- [ ] **Navigation & Interaction:**
  - Auto-play functionality with 5-second intervals
  - Manual navigation arrows (previous/next)
  - Dot indicators showing current position
  - Pause on hover for desktop users
  - Swipe gestures for mobile devices

- [ ] **Accessibility Features:**
  - Keyboard navigation support (arrow keys, tab)
  - Screen reader compatible with proper ARIA labels
  - Pause/play controls accessible via keyboard
  - Focus management for carousel navigation
  - Alternative text for member photos

### Technical Implementation

- [ ] **Performance Optimization:**
  - Lazy loading for member photos
  - Image optimization with multiple format support (WebP, JPEG)
  - Preloading for smooth transitions
  - Minimal JavaScript bundle impact
  - Fast loading even on slow connections

- [ ] **Integration Points:**
  - Prominent placement on homepage hero/featured section
  - Integration within FMS landing page for trust building
  - Optional placement on program/service pages
  - Consistent styling with overall design system
  - Analytics tracking for engagement metrics

- [ ] **Error Handling:**
  - Graceful fallback when images fail to load
  - Default testimonials if CMS content unavailable
  - Loading states during content fetch
  - Smooth degradation for users with JavaScript disabled
  - Retry mechanisms for network failures

### Analytics & Tracking

- [ ] **Engagement Metrics:**
  - Carousel interaction rates (manual vs auto-play)
  - Time spent viewing specific testimonials
  - Click-through rates to contact/FMS pages
  - User progression through carousel items
  - Device-specific usage patterns

- [ ] **Conversion Tracking:**
  - Testimonial view to FMS form completion correlation
  - Impact on page bounce rates
  - Time on page improvements
  - User flow analysis through trust elements
  - A/B testing capabilities for testimonial effectiveness

## 🔗 Dependencies

**Upstream Dependencies:**

- [ ] Sanity CMS setup and configuration (CONTENT-001)
- [ ] Design system components and styling framework
- [ ] Member consent and photo release process
- [ ] Professional photography for member photos

**Content Creation Dependencies:**

- [ ] Member outreach and consent collection
- [ ] Testimonial writing and editing process
- [ ] Photo shoot coordination and editing
- [ ] Legal review of member claims and results
- [ ] Diversity and representation planning

**Technical Dependencies:**

- [ ] Image optimization and CDN configuration
- [ ] Analytics event tracking setup
- [ ] Accessibility testing tools and procedures
- [ ] Performance monitoring for carousel component

## 🧪 Testing Criteria

- [ ] **Functional Testing:**
  - Carousel navigation works smoothly across all devices
  - Auto-play and manual controls function correctly
  - Image loading and optimization working properly
  - CMS updates reflect on frontend within cache TTL
  - Error states handled gracefully

- [ ] **Accessibility Testing:**
  - Screen reader navigation tested with NVDA/JAWS
  - Keyboard-only navigation fully functional
  - Focus indicators visible and logical
  - Pause controls accessible via keyboard
  - Alternative text provides meaningful context

- [ ] **Performance Testing:**
  - Carousel loads within 2 seconds on 3G connections
  - Image optimization reduces file sizes by >60%
  - No significant impact on page load times
  - Smooth transitions without jank or stuttering
  - Memory usage optimized for long sessions

- [ ] **User Experience Testing:**
  - Mobile swipe gestures intuitive and responsive
  - Visual hierarchy guides attention effectively
  - Content readable across all screen sizes
  - Navigation controls discoverable and usable
  - Member stories compelling and authentic

## 📊 Definition of Done

- [ ] **Content Complete:**
  - Minimum 6 diverse, authentic testimonials collected and approved
  - All member photos optimized with proper consent documentation
  - Content reviewed for authenticity and legal compliance
  - Privacy guidelines followed for all member information

- [ ] **Technical Implementation:**
  - Carousel component deployed with responsive design
  - Performance benchmarks met (load time, image optimization)
  - Accessibility compliance verified (WCAG AA)
  - Analytics tracking implemented and tested

- [ ] **Integration Complete:**
  - Testimonials visible on homepage and FMS landing page
  - CMS editing workflow documented for content team
  - Design consistency verified across all placements
  - Cross-browser compatibility confirmed

- [ ] **Quality Assurance:**
  - User acceptance testing completed
  - Performance monitoring configured
  - Content maintenance procedures documented
  - Team training on CMS management completed

## ⚠️ Risk Assessment

| Risk                   | Impact | Probability | Mitigation                                            |
| ---------------------- | ------ | ----------- | ----------------------------------------------------- |
| Member consent issues  | High   | Low         | Clear consent process, legal review                   |
| Poor photo quality     | Medium | Medium      | Professional photography guidelines                   |
| Performance impact     | Medium | Low         | Aggressive optimization, performance budgets          |
| Inauthentic appearance | High   | Low         | Real members, genuine stories, diverse representation |
| Outdated testimonials  | Medium | Medium      | Regular content review and refresh process            |

## 📈 Success Metrics

**Engagement Metrics:**

- **Carousel Interaction Rate:** >30% users interact with navigation
- **Time Viewing Testimonials:** >15 seconds average engagement
- **Testimonial Completion Rate:** >60% view multiple testimonials
- **Mobile Engagement:** >70% mobile users swipe through content

**Conversion Impact:**

- **FMS Form Completion:** +10% improvement after testimonial implementation
- **Page Bounce Rate:** >20% reduction on pages with testimonials
- **Time on Page:** >25% increase for pages featuring testimonials
- **Contact Form Submissions:** +15% increase citing member stories

**Technical Performance:**

- **Load Time Impact:** <200ms additional load time
- **Image Optimization:** >60% file size reduction
- **Accessibility Score:** 100% WCAG AA compliance
- **Cross-Browser Support:** Functional across all major browsers

## 🛠️ Technical Implementation Notes

### Sanity CMS Schema

```typescript
// sanity/schemas/testimonial.ts
export const testimonialSchema = {
  name: 'testimonial',
  title: 'Member Testimonial',
  type: 'document',
  fields: [
    {
      name: 'memberName',
      title: 'Member Name',
      type: 'string',
      description: 'Use first name + last initial (e.g., "Sarah K.")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'memberPhoto',
      title: 'Member Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'consentDocumented',
          title: 'Photo Consent Documented',
          type: 'boolean',
          validation: Rule => Rule.required(),
        },
      ],
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(50).max(300),
    },
    {
      name: 'membershipDuration',
      title: 'Time as Member',
      type: 'string',
      description: 'e.g., "2 years", "6 months"',
    },
    {
      name: 'transformation',
      title: 'Specific Results/Transformation',
      type: 'text',
      rows: 3,
      description: 'Specific, measurable results or journey highlights',
    },
    {
      name: 'demographics',
      title: 'Demographics (Optional)',
      type: 'string',
      description: 'Age range, background, or relevant context',
    },
    {
      name: 'favoriteAspects',
      title: 'Favorite Gym Aspects',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Coaching Quality', value: 'coaching' },
          { title: 'Community Atmosphere', value: 'community' },
          { title: 'Safety Approach', value: 'safety' },
          { title: 'Personalized Attention', value: 'personal' },
          { title: 'Beginner Friendly', value: 'beginner' },
          { title: 'Results Focus', value: 'results' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show prominently on homepage',
    },
    {
      name: 'displayOrder',
      title: 'Display Priority',
      type: 'number',
      description: 'Lower numbers appear first',
    },
    {
      name: 'consentDate',
      title: 'Consent Date',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Active Testimonial',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'pageVisibility',
      title: 'Page Visibility',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'FMS Landing Page', value: 'fms' },
          { title: 'Programs Page', value: 'programs' },
          { title: 'About Page', value: 'about' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'memberName',
      subtitle: 'quote',
      media: 'memberPhoto',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: `${title} ${featured ? '⭐' : ''}`,
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
        media,
      }
    },
  },
}
```

### Testimonials Carousel Component

```tsx
// components/TestimonialsCarousel.tsx
import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

interface Testimonial {
  id: string
  memberName: string
  memberPhoto?: {
    url: string
    alt: string
  }
  quote: string
  membershipDuration: string
  transformation?: string
  demographics?: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
}

export function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  showControls = true,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const totalTestimonials = testimonials.length

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused && totalTestimonials > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalTestimonials)
      }, interval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isPaused, totalTestimonials, interval])

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials)
    trackTestimonialEvent('previous_click', currentIndex)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalTestimonials)
    trackTestimonialEvent('next_click', currentIndex)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    trackTestimonialEvent('dot_click', index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    trackTestimonialEvent(isPlaying ? 'pause' : 'play', currentIndex)
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPrevious()
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNext()
        break
      case ' ':
        event.preventDefault()
        togglePlayPause()
        break
    }
  }

  if (!testimonials.length) {
    return (
      <div className='testimonials-carousel-placeholder'>
        <p>No testimonials available at this time.</p>
      </div>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className='testimonials-carousel'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role='region'
      aria-label='Member testimonials carousel'
    >
      <div className='carousel-content'>
        <div className='testimonial-card'>
          {currentTestimonial.memberPhoto && (
            <div className='member-photo'>
              <Image
                src={currentTestimonial.memberPhoto.url}
                alt={currentTestimonial.memberPhoto.alt}
                width={120}
                height={120}
                className='rounded-full object-cover'
                priority={currentIndex === 0}
              />
            </div>
          )}

          <div className='testimonial-content'>
            <blockquote className='testimonial-quote'>
              "{currentTestimonial.quote}"
            </blockquote>

            <div className='testimonial-attribution'>
              <cite className='member-name'>
                — {currentTestimonial.memberName}
              </cite>
              {currentTestimonial.membershipDuration && (
                <span className='membership-duration'>
                  Member for {currentTestimonial.membershipDuration}
                </span>
              )}
              {currentTestimonial.demographics && (
                <span className='demographics'>
                  {currentTestimonial.demographics}
                </span>
              )}
            </div>

            {currentTestimonial.transformation && (
              <div className='transformation-highlight'>
                <strong>Results:</strong> {currentTestimonial.transformation}
              </div>
            )}
          </div>
        </div>
      </div>

      {showControls && totalTestimonials > 1 && (
        <div className='carousel-controls'>
          <button
            onClick={goToPrevious}
            className='carousel-button previous'
            aria-label='Previous testimonial'
          >
            <ChevronLeftIcon className='w-6 h-6' />
          </button>

          <div className='carousel-indicators'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className='carousel-button next'
            aria-label='Next testimonial'
          >
            <ChevronRightIcon className='w-6 h-6' />
          </button>

          {autoPlay && (
            <button
              onClick={togglePlayPause}
              className='play-pause-button'
              aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
            >
              {isPlaying ? (
                <PauseIcon className='w-5 h-5' />
              ) : (
                <PlayIcon className='w-5 h-5' />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// Analytics tracking
function trackTestimonialEvent(action: string, testimonialIndex: number) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'testimonial_interaction', {
      event_category: 'trust_elements',
      event_label: action,
      testimonial_index: testimonialIndex,
    })
  }
}
```

### Mobile-Optimized Testimonial Card

```tsx
// components/MobileTestimonialCard.tsx
export function MobileTestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}) {
  return (
    <div className='mobile-testimonial-card'>
      <div className='card-header'>
        {testimonial.memberPhoto && (
          <div className='member-avatar'>
            <Image
              src={testimonial.memberPhoto.url}
              alt={testimonial.memberPhoto.alt}
              width={60}
              height={60}
              className='rounded-full object-cover'
            />
          </div>
        )}
        <div className='member-info'>
          <h4 className='member-name'>{testimonial.memberName}</h4>
          <span className='membership-duration'>
            {testimonial.membershipDuration}
          </span>
        </div>
      </div>

      <blockquote className='mobile-quote'>"{testimonial.quote}"</blockquote>

      {testimonial.transformation && (
        <div className='transformation-snippet'>
          <strong>Results:</strong> {testimonial.transformation}
        </div>
      )}
    </div>
  )
}
```

### Analytics Events

```typescript
// lib/analytics/testimonial-events.ts
export const trackTestimonialEvents = {
  carouselView: (testimonialCount: number) => {
    gtag('event', 'testimonials_carousel_view', {
      event_category: 'trust_elements',
      event_label: 'carousel_loaded',
      testimonial_count: testimonialCount,
    })
  },

  testimonialView: (testimonialIndex: number, memberName: string) => {
    gtag('event', 'testimonial_view', {
      event_category: 'trust_elements',
      event_label: memberName,
      testimonial_index: testimonialIndex,
    })
  },

  carouselInteraction: (action: string, fromIndex: number, toIndex: number) => {
    gtag('event', 'testimonial_navigation', {
      event_category: 'trust_elements',
      event_label: action,
      from_index: fromIndex,
      to_index: toIndex,
    })
  },

  conversionAttribution: (testimonialIndex: number, conversionType: string) => {
    gtag('event', 'testimonial_conversion', {
      event_category: 'conversion',
      event_label: conversionType,
      testimonial_source: testimonialIndex,
    })
  },
}
```

## 📝 Content Requirements

### Initial Testimonial Collection (6 Required)

- [ ] **Sarah K., 32, Office Worker**
  - "This gym changed my life. After dealing with chronic back pain, their assessment-first approach helped me train safely and I'm now stronger than I've ever been."
  - Member for 2 years
  - Lost 15kg, eliminated back pain, completed first CrossFit competition

- [ ] **Mike T., 45, Dad of Two**
  - "I was intimidated by CrossFit, but the coaches here made me feel welcome from day one. They focus on proper form over heavy weights."
  - Member for 18 months
  - Gained confidence, improved family activities, lost 20kg

- [ ] **Emma R., 28, Physiotherapy Student**
  - "As someone studying physio, I appreciate their evidence-based approach to movement. It's not just about working out - it's about moving better."
  - Member for 1 year
  - Improved movement quality, enhanced professional knowledge

- [ ] **David L., 52, Tradesman**
  - "I thought my age and old injuries meant I couldn't do CrossFit. These coaches proved me wrong with smart scaling and modifications."
  - Member for 8 months
  - Returned to pain-free work, improved energy levels

- [ ] **Lisa M., 29, New Mum**
  - "Post-pregnancy, I needed coaches who understood my body's changes. They helped me get stronger than before I had kids."
  - Member for 6 months
  - Regained fitness confidence, exceeded pre-pregnancy strength

- [ ] **James B., 24, University Student**
  - "The community here is incredible. It's not about being the fittest - it's about supporting each other to be better."
  - Member for 10 months
  - Improved mental health, built lasting friendships

### Photo Requirements

- [ ] **Professional Photography Standards:**
  - High-resolution images (minimum 1200x1200px)
  - Natural lighting with gym environment background
  - Authentic, genuine expressions (avoid overly posed)
  - Diverse representation across age, gender, fitness levels
  - Consistent editing style aligned with brand guidelines

### Content Guidelines

- [ ] **Authenticity Markers:**
  - Specific, measurable results where possible
  - Include timeline information (how long to see results)
  - Mention specific challenges overcome
  - Reference coaching approach or gym culture
  - Avoid superlatives or unrealistic claims

---

**Story Owner:** Marketing Lead  
**Content Manager:** Content Specialist  
**Technical Lead:** Frontend Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
