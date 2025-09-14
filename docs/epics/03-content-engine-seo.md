# Epic 3: Content Engine & SEO

**Epic ID:** EPIC-03  
**Priority:** High  
**Business Value:** Organic traffic growth (≥20% organic mix target)  
**Technical Complexity:** Low-Medium  
**Effort Estimate:** 10-12 story points  
**Sprint Target:** Week 0-3

## 🎯 Epic Goal

Capture high-intent search traffic and route qualified prospects to the FMS conversion funnel.

**Success Metrics:**

- Organic traffic mix ≥20% by Week 4
- 2 condition hubs + 4 articles published pre-launch
- Hub → FMS conversion rate ≥15%
- Local search visibility improvement (+20% GBP actions)
- Schema validation with zero critical errors

## 👥 User Stories

### Story CONTENT-001: Sanity CMS Schema Setup

**As a** content editor  
**I want** structured content templates  
**So that** I can publish consistently formatted content efficiently

**Acceptance Criteria:**

- [ ] Content type schemas defined for all content models
  - `post_article` with SEO fields
  - `post_condition_hub` with structured sections
  - `kb_faq` with category and search fields
  - `component_testimonial` with attribution
  - `coach_bio` with qualifications and specialties
- [ ] Preview functionality for content review
- [ ] Role-based access controls for content team
- [ ] Media management for images and videos
- [ ] SEO field integration (meta titles, descriptions, OG tags)
- [ ] Content relationship mapping (articles ↔ hubs)

**Dependencies:**

- Sanity account setup and project configuration
- Team access management and training
- Content governance workflow definition

**Definition of Done:**

- [ ] All content types functional in Sanity Studio
- [ ] Content team trained on publishing workflow
- [ ] Preview builds working for content review
- [ ] Backup and version control systems active

---

### Story CONTENT-002: Condition Hubs (Shoulder & Low-Back)

**As a** searcher with specific pain/injury concerns  
**I want** expert guidance on training safely  
**So that** I can decide if this gym understands my needs

**Acceptance Criteria:**

- [ ] **Shoulder Hub:** Comprehensive content covering
  - Common shoulder issues in CrossFit
  - Dos and don'ts for shoulder health
  - Movement modifications and progressions
  - Case study snippets (anonymized)
  - FAQ section with structured data
  - Soft CTA leading to FMS assessment
- [ ] **Low-Back Hub:** Parallel structure for low-back concerns
- [ ] Internal linking strategy to articles and FMS
- [ ] FAQ schema markup for rich snippets
- [ ] Mobile-optimized reading experience
- [ ] Social sharing optimization

**Dependencies:**

- Subject matter expert content creation
- Medical/legal review of health claims
- SEO keyword research and optimization
- Photography/illustrations for demonstrations

**Definition of Done:**

- [ ] Both hubs published with complete content
- [ ] Schema validation passed
- [ ] Internal links functional
- [ ] Mobile reading experience optimized
- [ ] Legal/compliance review completed

---

### Story CONTENT-003: Article Publishing & SEO Hygiene

**As a** potential member researching fitness topics  
**I want** credible, helpful articles  
**So that** I trust this gym's expertise and consider joining

**Acceptance Criteria:**

- [ ] **4 Articles Published** (800-1,200 words each):
  1. "Injury-Safe Scaling: How to Modify Any Workout"
  2. "Warm-Up Principles: Preparing Your Body for CrossFit"
  3. "Mobility Basics: Essential Movements for Athletes"
  4. "Beginner Foundations: Your First Month of CrossFit"
- [ ] Article schema markup implementation
- [ ] Open Graph and Twitter Card optimization
- [ ] XML sitemap generation and submission
- [ ] Robots.txt configuration
- [ ] Breadcrumb navigation implementation
- [ ] Internal linking strategy execution
- [ ] Image optimization with proper alt tags

**Dependencies:**

- Content creation calendar and writer assignment
- SEO audit and keyword targeting
- Image assets and optimization workflow
- Editorial review and fact-checking process

**Definition of Done:**

- [ ] All articles live with proper schema
- [ ] Search Console verification and sitemap submission
- [ ] Internal linking network established
- [ ] Page speed optimization completed
- [ ] Social sharing functionality verified

## 🔗 Epic Dependencies

**Upstream Dependencies:**

- Sanity CMS infrastructure
- SEO strategy and keyword research
- Content creation resources and expertise

**Downstream Dependencies:**

- Content feeds the trust-building elements of FMS conversion
- SEO foundation supports all future content marketing efforts
- Hub traffic provides data for content optimization

## 🎯 Content Strategy

### Hub Content Structure

```
Condition Hub Template:
├── Hero: Problem acknowledgment + expertise positioning
├── Understanding the Issue: Symptoms and causes
├── What TO Do: Safe training approaches
├── What NOT to Do: Common mistakes and red flags
├── Movement Modifications: Specific exercise alternatives
├── Case Studies: Real member success stories (anonymized)
├── FAQ Section: Address common concerns
└── Next Steps CTA: Soft transition to FMS assessment
```

### Article Content Themes

1. **Safety-First Messaging:** Injury prevention and modification
2. **Educational Value:** Technical knowledge sharing
3. **Beginner-Friendly:** Accessible to all fitness levels
4. **Local Authority:** Specific to CrossFit/gym environment

### SEO Technical Implementation

**Schema Markup Priority:**

- LocalBusiness (Contact page)
- Article markup (all blog posts)
- FAQ markup (hub Q&A sections)
- Breadcrumb navigation
- Organization markup (About/Coach pages)

**Technical SEO Checklist:**

- [ ] Core Web Vitals optimization (LCP <2.5s target)
- [ ] Mobile-first indexing readiness
- [ ] Structured data validation
- [ ] XML sitemap comprehensive coverage
- [ ] Internal linking anchor text optimization
- [ ] Image SEO (alt tags, file naming, compression)

## 📊 Success Criteria

**Week 2 Milestones:**

- CMS schemas live and functional
- Content creation workflow operational
- Hub content drafts complete

**Week 4 Launch Targets:**

- 2 condition hubs fully published
- 4 articles live with proper SEO
- Schema validation with zero critical errors
- Internal linking network functional

**Post-Launch (Week 8):**

- Organic traffic mix ≥20%
- Hub pages ranking for target keywords
- Hub → FMS conversion rate ≥15%

## 🚨 Risks & Mitigations

| Risk                    | Impact                  | Mitigation                                             |
| ----------------------- | ----------------------- | ------------------------------------------------------ |
| Content creation delays | Miss launch date        | Start content creation immediately, prioritize hubs    |
| SEO competition         | Low organic visibility  | Focus on local + condition-specific long-tail keywords |
| Legal/compliance issues | Content approval delays | Early legal review, conservative health claims         |
| Performance impact      | Poor user experience    | Image optimization, lazy loading, CDN implementation   |

## 📱 Technical Implementation

### CMS Content Types

**post_article:**

```javascript
{
  title: string,
  slug: string,
  excerpt: text,
  body: richText,
  seoTitle: string,
  metaDescription: string,
  ogImage: image,
  publishedAt: date,
  author: reference,
  categories: array,
  relatedHubs: array,
  ctaSettings: object
}
```

**post_condition_hub:**

```javascript
{
  title: string,
  slug: string,
  condition: string,
  heroContent: richText,
  sections: array[{
    title: string,
    content: richText,
    type: enum
  }],
  faqs: array,
  relatedArticles: array,
  ctaVariant: string
}
```

### Performance Optimization

- Next.js Image component for automatic optimization
- Lazy loading for below-fold content
- Font optimization with font-display: swap
- Critical CSS inline, non-critical deferred

### Analytics Integration

- `post_view` events with content category
- Reading progress tracking (25%, 50%, 75%, 100%)
- Hub → FMS CTA click tracking
- Search Console data integration

## 📝 Editorial Guidelines

**Voice & Tone:**

- Expert but approachable
- Safety-conscious without fear-mongering
- Inclusive and beginner-friendly
- Local authority with national appeal

**Content Standards:**

- Fact-check all health claims
- Include disclaimers where appropriate
- Use member success stories (with permission)
- Maintain consistent terminology

**SEO Best Practices:**

- Target long-tail keywords with clear intent
- Use H2-H4 hierarchy for scannability
- Include relevant internal links naturally
- Optimize for featured snippets where possible

**Epic Owner:** Content Lead  
**Tech Lead:** Development Lead  
**SEO Consultant:** Marketing Lead  
**Last Updated:** September 13, 2025
