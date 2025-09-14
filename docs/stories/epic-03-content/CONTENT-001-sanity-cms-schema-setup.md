# User Story: CONTENT-001 - Sanity CMS Schema Setup

**Epic:** Epic 3: Content Engine & SEO  
**Story ID:** CONTENT-001  
**Priority:** High  
**Effort Estimate:** 3 story points  
**Sprint Target:** Week 0-1  

## 📋 User Story

**As a** content editor and operations team member  
**I want** structured content templates with user-friendly editing interfaces  
**So that** I can publish consistently formatted, SEO-optimized content efficiently without technical knowledge  

## ✅ Acceptance Criteria

### Content Type Schemas
- [ ] **Article Schema (`post_article`):**
  - Title, slug, excerpt, and rich text body
  - SEO metadata fields (meta title, description, OG image)
  - Author reference, categories, and tags
  - Publication status and scheduling
  - Related content relationships (hubs, other articles)
  - Featured image with alt text and caption

- [ ] **Condition Hub Schema (`post_condition_hub`):**
  - Condition name and descriptive title
  - Structured sections (hero, understanding, dos/donts, modifications)
  - FAQ array with structured markup support
  - Related articles and internal linking
  - CTA configuration options
  - Progress tracking and completion status

- [ ] **FAQ Schema (`kb_faq`):**
  - Question and rich text answer
  - Category assignment and priority ordering
  - Search tags and keywords
  - Related question references
  - Usage analytics fields
  - Featured/pinned status flags

- [ ] **Testimonial Schema (`component_testimonial`):**
  - Member name, photo, and consent status
  - Testimonial text with formatting options
  - Before/after metrics (optional)
  - Usage permissions and attribution
  - Category tags (transformation, injury recovery, beginner)
  - Featured status and display preferences

- [ ] **Coach Bio Schema (`coach_bio`):**
  - Personal information and professional photo
  - Qualifications, certifications, and specialties
  - Personal story and coaching philosophy
  - Social media links and contact preferences
  - Availability and class focus areas
  - Professional achievements and continuing education

### Content Management Features
- [ ] **Editorial Workflow:**
  - Draft/review/publish status management
  - Content preview functionality with live site styling
  - Version control and revision history
  - Comments and approval workflow
  - Scheduled publishing capabilities
  - Bulk operations for content management

- [ ] **Media Management:**
  - Image upload with automatic optimization
  - Alt text and caption management
  - Video embedding and thumbnail generation
  - File organization with folders and tags
  - Usage tracking and unused media detection
  - CDN integration for performance

- [ ] **SEO Integration:**
  - Meta title and description with character counts
  - Open Graph and Twitter Card previews
  - Schema markup fields with validation
  - Slug generation and customization
  - Canonical URL management
  - XML sitemap automatic generation

### User Experience & Access Control
- [ ] **Role-Based Permissions:**
  - Content Editor: Create, edit, publish content
  - Reviewer: Review and approve content
  - Admin: Full access and user management
  - Guest: Read-only access for stakeholders
  - Content type-specific permissions

- [ ] **User-Friendly Interface:**
  - Intuitive content creation with helpful hints
  - Rich text editor with formatting options
  - Mobile-responsive studio interface
  - Keyboard shortcuts for efficient editing
  - Auto-save functionality to prevent data loss
  - Content templates for consistency

### Technical Integration
- [ ] **Next.js Integration:**
  - API endpoints for content retrieval
  - Static site generation (SSG) for performance
  - Incremental static regeneration (ISR) support
  - Webhook configuration for content updates
  - TypeScript types generation
  - Content preview mode for editing

- [ ] **Performance Optimization:**
  - Image optimization pipeline integration
  - Lazy loading configuration
  - Content delivery network (CDN) setup
  - Caching strategies for content queries
  - Bundle splitting for content-heavy pages
  - Core Web Vitals monitoring

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] Sanity account setup and project configuration
- [ ] Vercel hosting and deployment pipeline (INFRA-001)
- [ ] Team access management and role definitions
- [ ] Content strategy and governance documentation

**Technical Dependencies:**
- [ ] Next.js Sanity plugin configuration
- [ ] TypeScript types and interface definitions
- [ ] Image optimization service integration
- [ ] Analytics tracking setup for content
- [ ] SEO tooling and validation systems

**Content Dependencies:**
- [ ] Content style guide and editorial standards
- [ ] SEO keyword research and strategy
- [ ] Content creation calendar and workflow
- [ ] Legal review process for health-related content

## 🧪 Testing Criteria

- [ ] **Content Creation Testing:**
  - All content types can be created, edited, and published
  - Rich text editor functions properly across browsers
  - Image upload and optimization working correctly
  - Preview functionality matches live site styling
  - Workflow states transition properly

- [ ] **Integration Testing:**
  - Content appears correctly on frontend
  - Schema markup validation passes
  - API endpoints respond within performance targets
  - Webhook updates trigger site rebuilds
  - TypeScript types match schema definitions

- [ ] **User Experience Testing:**
  - Non-technical team members can use interface
  - Mobile editing experience functional
  - Content search and filtering work properly
  - Bulk operations complete successfully
  - Auto-save prevents data loss

- [ ] **Performance Testing:**
  - Content queries execute within 500ms
  - Image optimization reduces file sizes >60%
  - Studio interface loads within 3 seconds
  - Large content sets don't impact performance
  - CDN delivers content globally <2 seconds

## 📊 Definition of Done

- [ ] **Technical Implementation:**
  - All 5 content schemas deployed and functional
  - Sanity Studio configured with proper permissions
  - Next.js integration working with TypeScript support
  - Image optimization and CDN integration active

- [ ] **Team Readiness:**
  - Content team trained on all content types
  - Editorial workflow documented and tested
  - Review and approval process functional
  - Emergency content update procedures defined

- [ ] **Quality Assurance:**
  - Schema validation passing for all content types
  - SEO fields generating proper meta tags
  - Content preview matching live site exactly
  - Performance benchmarks met for content delivery

- [ ] **Documentation:**
  - Content editor training materials complete
  - Technical documentation for developers
  - Troubleshooting guide for common issues
  - Backup and recovery procedures documented

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Schema design changes needed | Medium | Medium | Iterative design, stakeholder review |
| Team adoption challenges | Medium | Low | Training program, simple interface design |
| Performance issues with content | High | Low | Optimization pipeline, monitoring |
| Data migration complexity | Low | Low | Fresh start advantage, clean schemas |
| Integration bugs with Next.js | Medium | Low | Thorough testing, phased rollout |

## 📈 Success Metrics

**Technical Performance:**
- **Content Query Speed:** <500ms for 95% of requests
- **Image Optimization:** >60% file size reduction
- **Studio Load Time:** <3 seconds initial load
- **Build Time Impact:** <20% increase with content

**Team Productivity:**
- **Content Creation Time:** <2 hours for standard article
- **Training Time:** <4 hours for new content editors
- **Error Rate:** <5% content requires republishing
- **Team Satisfaction:** >4.0/5 rating for CMS usability

**Content Quality:**
- **SEO Compliance:** 100% content with proper meta tags
- **Schema Validation:** Zero critical errors
- **Consistency:** >95% content follows style guide
- **Review Efficiency:** <24 hours average review cycle

## 🛠️ Technical Implementation Notes

### Sanity Schema Definitions
```typescript
// sanity/schemas/post-article.ts
export const postArticleSchema = {
  name: 'postArticle',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required().min(10).max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 80 },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: Rule => Rule.max(160)
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ]
    },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: [{ type: 'coachBio' }]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Training', value: 'training' },
          { title: 'Nutrition', value: 'nutrition' },
          { title: 'Recovery', value: 'recovery' },
          { title: 'Beginner Guide', value: 'beginner' },
          { title: 'Injury Prevention', value: 'injury-prevention' }
        ]
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.max(60)
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: Rule => Rule.max(160)
    },
    {
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      group: 'seo',
      description: 'Used for social media sharing. Recommended size: 1200x630px'
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Only set if this content exists elsewhere'
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'relatedHubs',
      title: 'Related Condition Hubs',
      type: 'array',
      group: 'settings',
      of: [{
        type: 'reference',
        to: [{ type: 'postConditionHub' }]
      }]
    },
    {
      name: 'ctaSettings',
      title: 'Call-to-Action Settings',
      type: 'object',
      group: 'settings',
      fields: [
        {
          name: 'showFmsCta',
          title: 'Show FMS CTA',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Start Your Fitness Journey'
        },
        {
          name: 'ctaPosition',
          title: 'CTA Position',
          type: 'string',
          options: {
            list: [
              { title: 'After Introduction', value: 'intro' },
              { title: 'Middle of Article', value: 'middle' },
              { title: 'End of Article', value: 'end' },
              { title: 'Sidebar', value: 'sidebar' }
            ]
          },
          initialValue: 'end'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'featuredImage',
      status: 'status'
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: `${title} ${status === 'published' ? '✅' : status === 'review' ? '👀' : '📝'}`,
        subtitle,
        media
      };
    }
  }
};
```

### Condition Hub Schema
```typescript
// sanity/schemas/post-condition-hub.ts
export const postConditionHubSchema = {
  name: 'postConditionHub',
  title: 'Condition Hub',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Hub Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'condition',
      title: 'Condition Name',
      type: 'string',
      group: 'content',
      description: 'e.g., "Shoulder Pain", "Lower Back Issues"'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'condition' }
    },
    {
      name: 'heroContent',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string'
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2
        },
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'contentSection',
        title: 'Content Section',
        fields: [
          {
            name: 'title',
            title: 'Section Title',
            type: 'string'
          },
          {
            name: 'type',
            title: 'Section Type',
            type: 'string',
            options: {
              list: [
                { title: 'Understanding the Issue', value: 'understanding' },
                { title: 'What TO Do', value: 'dos' },
                { title: 'What NOT to Do', value: 'donts' },
                { title: 'Movement Modifications', value: 'modifications' },
                { title: 'Case Studies', value: 'casestudies' },
                { title: 'Expert Tips', value: 'tips' }
              ]
            }
          },
          {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }]
          },
          {
            name: 'calloutBox',
            title: 'Callout Box',
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Callout Title',
                type: 'string'
              },
              {
                name: 'content',
                title: 'Callout Content',
                type: 'text'
              },
              {
                name: 'style',
                title: 'Style',
                type: 'string',
                options: {
                  list: [
                    { title: 'Info', value: 'info' },
                    { title: 'Warning', value: 'warning' },
                    { title: 'Success', value: 'success' },
                    { title: 'Tip', value: 'tip' }
                  ]
                }
              }
            ]
          }
        ],
        preview: {
          select: {
            title: 'title',
            type: 'type'
          },
          prepare({ title, type }) {
            return {
              title: title || 'Untitled Section',
              subtitle: type
            };
          }
        }
      }]
    },
    {
      name: 'faqs',
      title: 'FAQ Section',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'hubFaq',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string'
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'array',
            of: [{ type: 'block' }]
          }
        ],
        preview: {
          select: {
            title: 'question'
          }
        }
      }]
    }
    // ... SEO and settings fields similar to article schema
  ]
};
```

### Next.js Integration
```typescript
// lib/sanity/client.ts
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from './env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN
});

// Content queries
export async function getAllArticles() {
  return sanityClient.fetch(`
    *[_type == "postArticle" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      author->{
        name,
        image
      },
      categories,
      tags
    }
  `);
}

export async function getArticleBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "postArticle" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      body,
      seoTitle,
      metaDescription,
      ogImage,
      publishedAt,
      author->{
        name,
        image,
        bio
      },
      categories,
      tags,
      relatedHubs[]->{
        title,
        slug,
        condition
      },
      ctaSettings
    }
  `, { slug });
}

export async function getConditionHub(slug: string) {
  return sanityClient.fetch(`
    *[_type == "postConditionHub" && slug.current == $slug][0] {
      _id,
      title,
      condition,
      slug,
      heroContent,
      sections,
      faqs,
      seoTitle,
      metaDescription,
      relatedArticles[]->{
        title,
        slug,
        excerpt,
        publishedAt
      }
    }
  `, { slug });
}
```

## 📝 Content Creation Guidelines

### Article Writing Standards
- [ ] **Structure Requirements:**
  - Introduction with hook and preview
  - 3-5 main sections with H2 headings
  - Actionable tips and practical advice
  - Conclusion with key takeaways
  - Clear call-to-action to FMS assessment

- [ ] **SEO Optimization:**
  - Target keyword in title and first paragraph
  - Use H2-H4 hierarchy for scannability
  - Include relevant internal links
  - Optimize images with descriptive alt text
  - Write meta descriptions under 160 characters

### Condition Hub Content Framework
- [ ] **Hero Section:** Problem acknowledgment + expertise positioning
- [ ] **Understanding:** Symptoms, causes, and common scenarios
- [ ] **Safe Approaches:** What members should do
- [ ] **Avoid These:** Common mistakes and contraindications
- [ ] **Modifications:** Specific exercise alternatives
- [ ] **Success Stories:** Anonymous member case studies
- [ ] **FAQ:** Address specific concerns with schema markup
- [ ] **Next Steps:** Soft transition to FMS assessment

---

**Story Owner:** Content Lead  
**Technical Lead:** Full-Stack Developer  
**SEO Specialist:** Marketing Lead  
**Created:** September 14, 2025  
**Status:** Ready for Development
