# User Story: TRUST-002 - Coach Bio Pages

**Epic:** Epic 5: Trust & Proof Components  
**Story ID:** TRUST-002  
**Priority:** High  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 2-3

## 📋 User Story

**As a** potential member concerned about coaching quality and safety  
**I want** to learn about the coaches' qualifications, experience, and approach  
**So that** I trust their expertise to guide my fitness journey safely and effectively

## ✅ Acceptance Criteria

### Content Structure & Management

- [ ] **Individual Coach Bio Pages:**
  - Dedicated page for each active coach with unique URL
  - Professional headshot and action/training photos
  - Comprehensive qualification and certification display
  - Personal story and coaching philosophy
  - Specialties and areas of expertise
  - Years of experience and training background

- [ ] **CMS Integration:**
  - Sanity CMS schema for coach information management
  - Easy content editing for non-technical staff
  - Photo upload and optimization workflow
  - Publication status controls (active/inactive coaches)
  - SEO metadata fields for each bio page
  - Related content linking (articles, specialties)

- [ ] **Qualification Display:**
  - CrossFit certifications (L1, L2, specialty certs)
  - Educational background and degrees
  - Professional development and continuing education
  - Industry certifications (FMS, Precision Nutrition, etc.)
  - Athletic background and competitive experience
  - Years coaching and client success metrics

### Professional Photography

- [ ] **Photo Requirements:**
  - High-quality professional headshots (studio or gym setting)
  - Action shots demonstrating coaching or exercise execution
  - Consistent lighting and editing style across all coaches
  - Multiple format optimization (WebP, JPEG) for performance
  - Alt text and accessibility descriptions
  - Brand-consistent background and styling

- [ ] **Photo Specifications:**
  - Headshots: 800x800px minimum, square aspect ratio
  - Action shots: 1200x800px minimum, landscape orientation
  - Professional quality with proper depth of field
  - Natural, approachable expressions for headshots
  - Dynamic, competent appearance in action shots
  - Consistent brand colors and gym environment

### Page Layout & Design

- [ ] **Desktop Layout:**
  - Hero section with large headshot and key credentials
  - Two-column layout with photo and qualification details
  - Expandable sections for detailed biography
  - Professional achievement highlights
  - Contact/scheduling information if applicable
  - Related content and specialties

- [ ] **Mobile Optimization:**
  - Single-column responsive layout
  - Touch-optimized navigation and interaction
  - Optimized image loading for mobile connections
  - Readable typography at all screen sizes
  - Fast loading with progressive enhancement
  - Swipeable photo gallery if multiple images

- [ ] **Accessibility Features:**
  - Screen reader compatible with proper heading structure
  - Keyboard navigation for all interactive elements
  - High contrast support for text and images
  - Alt text for all photos and visual elements
  - Focus indicators for keyboard users
  - Semantic HTML structure

### SEO & Technical Implementation

- [ ] **Search Optimization:**
  - Individual meta titles and descriptions
  - Schema markup for Person and professional credentials
  - Local SEO optimization for coaching services
  - Structured data for qualifications and experience
  - Internal linking from service and program pages
  - Optimized URL structure (/coaches/coach-name)

- [ ] **Performance Features:**
  - Image optimization with Next.js Image component
  - Lazy loading for below-fold content
  - Fast loading times (<2 seconds)
  - CDN delivery for global performance
  - Progressive image loading
  - Efficient caching strategies

### Integration Points

- [ ] **Cross-Site Linking:**
  - Coach cards on team/about page linking to full bios
  - References from program pages to relevant coaches
  - Integration with class schedule (if coach-specific)
  - Links from testimonials mentioning specific coaches
  - Related article content by coaching expertise
  - Social media profile integration where appropriate

## 🔗 Dependencies

**Upstream Dependencies:**

- [ ] Sanity CMS setup and configuration (CONTENT-001)
- [ ] Professional photography session coordination
- [ ] Coach information collection and verification
- [ ] Design system components and page templates

**Content Creation Dependencies:**

- [ ] Coach interviews and content gathering sessions
- [ ] Credential verification and documentation
- [ ] Professional photography shoot planning
- [ ] Content writing and editing workflow
- [ ] Legal review of qualification claims

**Technical Dependencies:**

- [ ] Image optimization and CDN configuration
- [ ] SEO schema markup implementation
- [ ] Page routing and URL structure setup
- [ ] Analytics tracking for bio page engagement

## 🧪 Testing Criteria

- [ ] **Content Quality Testing:**
  - All coach qualifications verified and accurate
  - Professional writing standards met
  - Consistent tone and style across all bios
  - Photo quality and professional appearance standards
  - Legal compliance for all credential claims

- [ ] **Technical Functionality Testing:**
  - All bio pages load within 2 seconds
  - Images optimize correctly across devices
  - Internal linking functions properly
  - SEO metadata displays correctly in search results
  - Schema markup validates without errors

- [ ] **User Experience Testing:**
  - Navigation between coach bios intuitive
  - Mobile experience optimized and tested
  - Accessibility compliance verified (WCAG AA)
  - Cross-browser compatibility confirmed
  - Integration with other site sections seamless

- [ ] **Performance Testing:**
  - Core Web Vitals pass on all coach pages
  - Image loading optimized for various connection speeds
  - Page rendering performance under load
  - CDN delivery working globally
  - Caching effectiveness measured

## 📊 Definition of Done

- [ ] **Content Complete:**
  - Minimum 3 active coaches with complete bio pages
  - All qualifications verified and accurately represented
  - Professional photography completed and optimized
  - Content reviewed and approved by coaches

- [ ] **Technical Implementation:**
  - All coach bio pages deployed with responsive design
  - SEO optimization implemented with schema markup
  - Performance benchmarks met (load time, image optimization)
  - Analytics tracking functional for engagement metrics

- [ ] **Integration Complete:**
  - Coach cards link properly from team/about pages
  - Cross-references working from program pages
  - Search functionality includes coach content
  - Social media integration working where applicable

- [ ] **Quality Assurance:**
  - Accessibility compliance verified (WCAG AA)
  - Cross-browser testing completed
  - Mobile responsiveness confirmed across devices
  - Content maintenance workflow documented

## ⚠️ Risk Assessment

| Risk                              | Impact | Probability | Mitigation                                         |
| --------------------------------- | ------ | ----------- | -------------------------------------------------- |
| Coach departure affecting content | Medium | Medium      | Regular content audits, inactive status controls   |
| Qualification verification issues | High   | Low         | Thorough verification process, conservative claims |
| Photo quality inconsistencies     | Medium | Low         | Professional photography guidelines, batch shoots  |
| SEO competition for coach names   | Low    | Medium      | Local SEO focus, specific qualification targeting  |
| Content maintenance burden        | Medium | Medium      | CMS workflow optimization, batch update processes  |

## 📈 Success Metrics

**Trust Building Metrics:**

- **Page Engagement:** >2 minutes average time on coach bio pages
- **Cross-Page Navigation:** >40% users view multiple coach bios
- **Conversion Impact:** +15% contact form submissions mentioning specific coaches
- **Trust Indicators:** Coach qualification mentions in user feedback

**Technical Performance:**

- **Page Load Speed:** <2 seconds for all coach bio pages
- **Image Optimization:** >60% file size reduction from original photos
- **SEO Performance:** Ranking in top 10 for "CrossFit coaches Geelong"
- **Accessibility Score:** 100% WCAG AA compliance

**Business Impact:**

- **Coach Credibility:** Improved mention of qualifications in member feedback
- **Service Differentiation:** Coaching quality cited as decision factor
- **Local Authority:** Increased local search visibility for expertise
- **Member Confidence:** Reduced inquiry about coach qualifications

## 🛠️ Technical Implementation Notes

### Sanity CMS Schema

```typescript
// sanity/schemas/coach-bio.ts
export const coachBioSchema = {
  name: 'coachBio',
  title: 'Coach Biography',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 50 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      description: 'e.g., "Head Coach", "Lead Trainer", "Owner & Coach"',
    },
    {
      name: 'headshot',
      title: 'Professional Headshot',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
        },
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'actionShot',
      title: 'Action/Training Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
        },
      ],
    },
    {
      name: 'yearsExperience',
      title: 'Years of Coaching Experience',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(50),
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'certification',
          fields: [
            {
              name: 'name',
              title: 'Certification Name',
              type: 'string',
            },
            {
              name: 'organization',
              title: 'Certifying Organization',
              type: 'string',
            },
            {
              name: 'level',
              title: 'Level/Type',
              type: 'string',
            },
            {
              name: 'yearObtained',
              title: 'Year Obtained',
              type: 'number',
            },
            {
              name: 'verified',
              title: 'Verification Status',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'organization',
              verified: 'verified',
            },
            prepare({ title, subtitle, verified }) {
              return {
                title: `${title} ${verified ? '✓' : '⚠️'}`,
                subtitle,
              }
            },
          },
        },
      ],
    },
    {
      name: 'education',
      title: 'Educational Background',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'education',
          fields: [
            {
              name: 'degree',
              title: 'Degree/Qualification',
              type: 'string',
            },
            {
              name: 'institution',
              title: 'Institution',
              type: 'string',
            },
            {
              name: 'year',
              title: 'Year Completed',
              type: 'number',
            },
            {
              name: 'field',
              title: 'Field of Study',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'specialties',
      title: 'Training Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Olympic Weightlifting', value: 'olympic-lifting' },
          { title: 'Powerlifting', value: 'powerlifting' },
          { title: 'Gymnastics/Bodyweight', value: 'gymnastics' },
          { title: 'Endurance/Cardio', value: 'endurance' },
          { title: 'Mobility/Movement', value: 'mobility' },
          { title: 'Injury Rehabilitation', value: 'rehabilitation' },
          { title: 'Nutrition Coaching', value: 'nutrition' },
          { title: 'Youth Training', value: 'youth' },
          { title: 'Masters Athletes (50+)', value: 'masters' },
          { title: 'Beginner Development', value: 'beginners' },
        ],
      },
    },
    {
      name: 'personalStory',
      title: 'Personal Fitness Journey',
      type: 'text',
      rows: 4,
      description: 'How the coach got into fitness/CrossFit',
    },
    {
      name: 'coachingPhilosophy',
      title: 'Coaching Philosophy',
      type: 'text',
      rows: 4,
      description: 'Approach to coaching and member development',
    },
    {
      name: 'biography',
      title: 'Detailed Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
        },
      ],
    },
    {
      name: 'athleticBackground',
      title: 'Athletic Background',
      type: 'text',
      rows: 3,
      description:
        'Sports history, competitive experience, personal achievements',
    },
    {
      name: 'continuingEducation',
      title: 'Continuing Education',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Recent courses, workshops, additional training',
    },
    {
      name: 'isActive',
      title: 'Currently Active Coach',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'socialMedia',
      title: 'Social Media (Optional)',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram Handle',
          type: 'string',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn Profile',
          type: 'url',
        },
      ],
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(160),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'jobTitle',
      media: 'headshot',
      active: 'isActive',
    },
    prepare({ title, subtitle, media, active }) {
      return {
        title: `${title} ${active ? '✅' : '❌'}`,
        subtitle,
        media,
      }
    },
  },
}
```

### Coach Bio Page Component

```tsx
// app/coaches/[slug]/page.tsx
import { getCoachBySlug, getAllCoaches } from '@/lib/sanity/queries'
import { CoachBioHero } from '@/components/coaches/CoachBioHero'
import { CoachCredentials } from '@/components/coaches/CoachCredentials'
import { CoachStory } from '@/components/coaches/CoachStory'
import { CoachSpecialties } from '@/components/coaches/CoachSpecialties'
import { RelatedContent } from '@/components/coaches/RelatedContent'

interface CoachPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const coaches = await getAllCoaches()
  return coaches.map(coach => ({
    slug: coach.slug.current,
  }))
}

export async function generateMetadata({ params }: CoachPageProps) {
  const coach = await getCoachBySlug(params.slug)

  if (!coach) {
    return {
      title: 'Coach Not Found',
      description: 'The requested coach profile could not be found.',
    }
  }

  return {
    title:
      coach.seoTitle ||
      `${coach.name} - ${coach.jobTitle} | Geelong Movement Co`,
    description:
      coach.metaDescription ||
      `Meet ${coach.name}, ${coach.jobTitle} at Geelong Movement Co. ${coach.yearsExperience} years experience in CrossFit coaching.`,
    openGraph: {
      title: `${coach.name} - ${coach.jobTitle}`,
      description: coach.metaDescription,
      images: coach.headshot ? [coach.headshot.url] : [],
      type: 'profile',
    },
  }
}

export default async function CoachPage({ params }: CoachPageProps) {
  const coach = await getCoachBySlug(params.slug)

  if (!coach || !coach.isActive) {
    return (
      <div className='coach-not-found'>
        <h1>Coach Not Found</h1>
        <p>The requested coach profile is not available.</p>
      </div>
    )
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: coach.name,
    jobTitle: coach.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: 'Geelong Movement Co',
    },
    image: coach.headshot?.url,
    description: coach.metaDescription,
    url: `https://geelongmovement.com/coaches/${params.slug}`,
    knowsAbout: coach.specialties || [],
    hasCredential:
      coach.certifications?.map(cert => ({
        '@type': 'EducationalOccupationalCredential',
        name: cert.name,
        credentialCategory: 'certification',
        educationalLevel: cert.level,
        recognizedBy: {
          '@type': 'Organization',
          name: cert.organization,
        },
      })) || [],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className='coach-bio-page'>
        <CoachBioHero coach={coach} />

        <div className='coach-content'>
          <div className='coach-main'>
            <CoachCredentials
              certifications={coach.certifications}
              education={coach.education}
              yearsExperience={coach.yearsExperience}
            />

            <CoachSpecialties specialties={coach.specialties} />

            <CoachStory
              personalStory={coach.personalStory}
              athleticBackground={coach.athleticBackground}
              coachingPhilosophy={coach.coachingPhilosophy}
            />
          </div>

          <aside className='coach-sidebar'>
            <RelatedContent coachSlug={params.slug} />
          </aside>
        </div>
      </article>
    </>
  )
}
```

### Coach Bio Hero Component

```tsx
// components/coaches/CoachBioHero.tsx
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface CoachBioHeroProps {
  coach: {
    name: string
    jobTitle: string
    headshot: {
      url: string
      alt: string
    }
    actionShot?: {
      url: string
      alt: string
    }
    yearsExperience: number
    specialties: string[]
    certifications: Array<{
      name: string
      organization: string
      level?: string
    }>
  }
}

export function CoachBioHero({ coach }: CoachBioHeroProps) {
  const primaryCertifications = coach.certifications
    .filter(
      cert => cert.organization === 'CrossFit' || cert.name.includes('Level')
    )
    .slice(0, 3)

  return (
    <section className='coach-bio-hero'>
      <div className='hero-content'>
        <div className='coach-photos'>
          <div className='headshot-container'>
            <Image
              src={coach.headshot.url}
              alt={coach.headshot.alt}
              width={300}
              height={300}
              className='coach-headshot'
              priority
            />
          </div>

          {coach.actionShot && (
            <div className='action-shot-container'>
              <Image
                src={coach.actionShot.url}
                alt={coach.actionShot.alt}
                width={400}
                height={300}
                className='coach-action-shot'
              />
            </div>
          )}
        </div>

        <div className='coach-info'>
          <h1 className='coach-name'>{coach.name}</h1>
          <h2 className='coach-title'>{coach.jobTitle}</h2>

          <div className='experience-highlight'>
            <span className='experience-number'>{coach.yearsExperience}</span>
            <span className='experience-label'>Years Experience</span>
          </div>

          <div className='primary-credentials'>
            {primaryCertifications.map((cert, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='credential-badge'
              >
                {cert.name}
              </Badge>
            ))}
          </div>

          <div className='specialties-preview'>
            <h3>Specializes in:</h3>
            <ul className='specialties-list'>
              {coach.specialties.slice(0, 3).map((specialty, index) => (
                <li key={index}>{specialty}</li>
              ))}
              {coach.specialties.length > 3 && (
                <li>+ {coach.specialties.length - 3} more</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Analytics Tracking

```typescript
// lib/analytics/coach-bio-events.ts
export const trackCoachBioEvents = {
  pageView: (coachName: string, coachSlug: string) => {
    gtag('event', 'coach_bio_view', {
      event_category: 'trust_elements',
      event_label: coachName,
      coach_slug: coachSlug,
    })
  },

  credentialExpansion: (coachName: string, credentialType: string) => {
    gtag('event', 'coach_credential_view', {
      event_category: 'trust_elements',
      event_label: `${coachName}_${credentialType}`,
      coach_name: coachName,
    })
  },

  contactClick: (coachName: string, contactType: string) => {
    gtag('event', 'coach_contact_click', {
      event_category: 'conversion',
      event_label: contactType,
      coach_name: coachName,
    })
  },

  photoInteraction: (coachName: string, photoType: string) => {
    gtag('event', 'coach_photo_interaction', {
      event_category: 'trust_elements',
      event_label: `${coachName}_${photoType}`,
    })
  },
}
```

## 📝 Content Requirements

### Coach Information Collection Template

For each coach, collect the following information:

**Basic Information:**

- [ ] Full name and preferred title
- [ ] Current job title/role
- [ ] Years of coaching experience
- [ ] Contact preferences (if applicable)

**Professional Qualifications:**

- [ ] CrossFit certifications (L1, L2, specialty)
- [ ] Educational degrees and institutions
- [ ] Other fitness certifications (FMS, PN, etc.)
- [ ] Continuing education and recent training
- [ ] Verification documentation

**Personal Story:**

- [ ] How they got into fitness/CrossFit
- [ ] Athletic background and achievements
- [ ] What drives their passion for coaching
- [ ] Personal fitness journey and challenges overcome

**Coaching Approach:**

- [ ] Training philosophy and methodology
- [ ] Specialties and areas of expertise
- [ ] Approach to working with beginners
- [ ] Safety and injury prevention focus
- [ ] Member development strategies

### Photography Specifications

- [ ] **Headshot Requirements:**
  - Professional lighting (studio or well-lit gym)
  - Neutral or gym-branded background
  - Professional attire or branded gym wear
  - Natural, confident expression
  - Square aspect ratio (1:1)

- [ ] **Action Shot Requirements:**
  - Coach demonstrating proper form
  - Dynamic movement or coaching scenario
  - Gym environment background
  - High-quality action capture
  - Landscape aspect ratio (4:3 or 16:9)

---

**Story Owner:** Marketing Lead  
**Content Manager:** Content Specialist  
**Technical Lead:** Frontend Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
