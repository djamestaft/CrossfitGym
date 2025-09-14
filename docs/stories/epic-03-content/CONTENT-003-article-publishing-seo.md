# User Story: CONTENT-003 - Article Publishing & SEO Hygiene

**Epic:** Epic 3: Content Engine & SEO  
**Story ID:** CONTENT-003  
**Priority:** High  
**Effort Estimate:** 4 story points  
**Sprint Target:** Week 3-4  

## 📋 User Story

**As a** potential member researching fitness topics  
**I want** credible, helpful articles that demonstrate expertise  
**So that** I trust this gym's knowledge and consider joining their community  

## ✅ Acceptance Criteria

### Article Content Creation (4 Articles)
- [ ] **Article 1: "Injury-Safe Scaling: How to Modify Any Workout"**
  - Understanding individual limitations and capabilities
  - Step-by-step scaling methodology for common movements
  - Progressive overload principles for beginners
  - When to scale up vs. when to scale down
  - Equipment modifications and alternatives
  - Case examples with before/after scenarios

- [ ] **Article 2: "Warm-Up Principles: Preparing Your Body for CrossFit"**
  - Science-based warm-up progression (general → specific)
  - Movement preparation vs. static stretching
  - Injury prevention through proper preparation
  - 10-minute daily warm-up routine
  - Sport-specific activation patterns
  - Common warm-up mistakes to avoid

- [ ] **Article 3: "Mobility Basics: Essential Movements for Athletes"**
  - Mobility vs. flexibility distinction
  - Daily mobility routine for desk workers
  - Pre-workout vs. post-workout mobility
  - Problem areas: hips, shoulders, thoracic spine
  - 5-minute morning mobility sequence
  - Equipment-free mobility solutions

- [ ] **Article 4: "Beginner Foundations: Your First Month of CrossFit"**
  - Realistic expectations and timeline
  - Focus areas for first 4 weeks
  - How to track progress as a beginner
  - Common mental barriers and solutions
  - Community integration tips
  - Building sustainable habits

### Technical SEO Implementation
- [ ] **On-Page Optimization:**
  - Article schema markup with author and organization
  - Optimized title tags with target keywords
  - Meta descriptions under 160 characters with CTAs
  - H1-H6 hierarchy for content scannability
  - Internal linking strategy with descriptive anchor text
  - Image optimization with descriptive alt text

- [ ] **Technical Infrastructure:**
  - XML sitemap automatic generation and submission
  - Robots.txt configuration for proper crawling
  - Breadcrumb navigation with schema markup
  - Canonical URL management for duplicate content
  - 301 redirect handling for URL changes
  - Mobile-first responsive design implementation

- [ ] **Social Media Optimization:**
  - Open Graph tags for Facebook sharing
  - Twitter Card meta tags for Twitter
  - Pinterest-optimized images with overlay text
  - LinkedIn sharing optimization
  - Social sharing buttons with optimized copy
  - Social proof integration (share counts)

### Content Performance Features
- [ ] **User Experience Enhancements:**
  - Estimated reading time display
  - Table of contents with anchor links
  - Progress indicator for long articles
  - Related articles recommendation engine
  - Print-friendly styling and layout
  - Accessible design (WCAG AA compliance)

- [ ] **Analytics & Tracking:**
  - Reading progress tracking (25%, 50%, 75%, 100%)
  - Time on page and engagement metrics
  - Internal link click tracking
  - CTA conversion tracking
  - Social sharing analytics
  - Search keyword performance monitoring

### Content Distribution & Promotion
- [ ] **Search Engine Submission:**
  - Google Search Console sitemap submission
  - Bing Webmaster Tools setup and submission
  - URL inspection and indexing requests
  - Core Web Vitals monitoring setup
  - Search performance tracking configuration
  - Rich results and featured snippet optimization

- [ ] **Content Syndication:**
  - RSS feed generation for articles
  - Email newsletter integration
  - Social media sharing templates
  - Community forum discussion starters
  - Guest posting and content partnerships
  - Local business directory submissions

## 🔗 Dependencies

**Upstream Dependencies:**
- [ ] Sanity CMS schema and workflow (CONTENT-001) functional
- [ ] Content creation team trained and onboarded
- [ ] SEO keyword research and content calendar
- [ ] Editorial review and approval process established

**Content Creation Dependencies:**
- [ ] Subject matter expert consultation for technical accuracy
- [ ] Professional photography for article illustrations
- [ ] Video content creation for movement demonstrations
- [ ] Legal review for health claims and disclaimers
- [ ] Competitor analysis for content differentiation

**Technical Dependencies:**
- [ ] SEO tooling and analytics configuration
- [ ] Image optimization and CDN setup
- [ ] Social media account setup for content sharing
- [ ] Email marketing integration for content distribution
- [ ] Search console and analytics verification

## 🧪 Testing Criteria

- [ ] **Content Quality Testing:**
  - Readability testing (Flesch-Kincaid Grade 8-10)
  - Fact-checking and source verification
  - Medical accuracy review for health claims
  - Grammar and style guide compliance
  - Accessibility testing with screen readers

- [ ] **SEO Performance Testing:**
  - Schema markup validation with no errors
  - Page speed testing (Core Web Vitals passing)
  - Mobile-first indexing readiness
  - Internal linking structure optimization
  - Keyword density and semantic SEO analysis

- [ ] **Technical Functionality Testing:**
  - All links functional and pointing to correct destinations
  - Social sharing buttons working across platforms
  - Table of contents navigation functional
  - Print styling and layout optimization
  - Cross-browser compatibility verification

- [ ] **Analytics Implementation Testing:**
  - Event tracking firing correctly for all interactions
  - Conversion funnel tracking from articles to FMS
  - Social sharing analytics capturing data
  - Reading progress tracking accurate
  - Performance monitoring alerts configured

## 📊 Definition of Done

- [ ] **Content Complete:**
  - All 4 articles written, reviewed, and published
  - Professional images optimized and alt text added
  - Internal linking network established between articles
  - CTA placement optimized for conversion

- [ ] **SEO Implementation:**
  - Schema markup validated and functional
  - Search console sitemap submitted
  - Meta tags optimized for click-through rate
  - Page speed optimization completed (Core Web Vitals passing)

- [ ] **Analytics & Tracking:**
  - Article engagement tracking implemented
  - Conversion tracking from articles to FMS functional
  - Social sharing analytics capturing data
  - Search performance monitoring active

- [ ] **Launch Readiness:**
  - Content promotion plan executed
  - Social media assets created and scheduled
  - Email newsletter integration tested
  - Performance monitoring dashboards configured

## ⚠️ Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Content creation delays | Medium | Medium | Early writer assignment, template approach |
| Low search rankings | Medium | Medium | Long-tail keyword focus, local optimization |
| Poor article engagement | Medium | Low | User testing, compelling introductions |
| Technical SEO issues | Medium | Low | Automated testing, SEO checklist |
| Content accuracy concerns | High | Low | Expert review, conservative claims |

## 📈 Success Metrics

**Content Performance:**
- **Average Time on Page:** >3 minutes per article
- **Scroll Depth:** >60% users reach article conclusion
- **Bounce Rate:** <50% for article pages
- **Return Visitors:** >30% within 30 days

**SEO Performance:**
- **Organic Traffic:** >1,000 monthly visits to articles by Month 3
- **Keyword Rankings:** Top 10 for target long-tail keywords
- **Featured Snippets:** Capture 2+ featured snippets
- **Local Visibility:** Improved local pack rankings

**Conversion Metrics:**
- **Article → FMS Rate:** ≥8% conversion to assessment booking
- **Email Signups:** >50 newsletter signups per article per month
- **Social Sharing:** >100 total shares across all articles
- **Brand Awareness:** 25% increase in branded search volume

**Business Impact:**
- **Lead Quality:** Article-sourced leads convert at ≥20% to membership
- **Content ROI:** Positive ROI within 6 months
- **Customer Education:** Reduced coaching questions about covered topics
- **Authority Building:** Increased referrals citing expertise

## 🛠️ Technical Implementation Notes

### Article Schema Markup
```typescript
// components/Article/ArticleSchema.tsx
interface ArticleSchemaProps {
  article: {
    title: string;
    excerpt: string;
    publishedAt: string;
    updatedAt: string;
    author: {
      name: string;
      image?: string;
    };
    featuredImage?: string;
    slug: string;
  };
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.featuredImage ? [article.featuredImage] : [],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "image": article.author.image
    },
    "publisher": {
      "@type": "Organization",
      "name": "Geelong Movement Co",
      "logo": {
        "@type": "ImageObject",
        "url": "https://geelongmovement.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://geelongmovement.com/articles/${article.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### SEO Meta Tags Component
```tsx
// components/SEO/ArticleMeta.tsx
interface ArticleMetaProps {
  title: string;
  description: string;
  image?: string;
  publishedAt: string;
  author: string;
  slug: string;
}

export function ArticleMeta({ 
  title, 
  description, 
  image, 
  publishedAt, 
  author, 
  slug 
}: ArticleMetaProps) {
  const url = `https://geelongmovement.com/articles/${slug}`;
  
  return (
    <Head>
      <title>{title} | Geelong Movement Co</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="article:published_time" content={publishedAt} />
      
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Geelong Movement Co" />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  );
}
```

### Reading Progress Tracking
```typescript
// hooks/useReadingProgress.ts
import { useEffect, useState } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [milestones, setMilestones] = useState<Set<number>>(new Set());

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.round((scrolled / total) * 100);
      
      setProgress(progress);
      
      // Track reading milestones
      const currentMilestones = new Set(milestones);
      [25, 50, 75, 100].forEach(milestone => {
        if (progress >= milestone && !currentMilestones.has(milestone)) {
          currentMilestones.add(milestone);
          setMilestones(currentMilestones);
          
          // Track analytics event
          gtag('event', 'article_reading_progress', {
            event_category: 'content_engagement',
            event_label: `${milestone}%_complete`,
            value: milestone
          });
        }
      });
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [milestones]);

  return { progress, milestones };
}
```

### Internal Linking Strategy
```typescript
// lib/content/internal-linking.ts
interface InternalLink {
  text: string;
  url: string;
  context: 'related' | 'definition' | 'deep-dive' | 'cta';
}

export const internalLinkingStrategy = {
  // Article 1: Injury-Safe Scaling
  'injury-safe-scaling': [
    {
      text: 'movement assessment',
      url: '/fms',
      context: 'cta'
    },
    {
      text: 'warm-up principles',
      url: '/articles/warm-up-principles',
      context: 'related'
    },
    {
      text: 'shoulder-safe modifications',
      url: '/hubs/shoulder',
      context: 'deep-dive'
    }
  ],
  
  // Article 2: Warm-Up Principles
  'warm-up-principles': [
    {
      text: 'mobility basics',
      url: '/articles/mobility-basics',
      context: 'related'
    },
    {
      text: 'injury prevention',
      url: '/articles/injury-safe-scaling',
      context: 'related'
    },
    {
      text: 'movement screen',
      url: '/fms',
      context: 'cta'
    }
  ],
  
  // Cross-linking matrix for SEO authority
  generateCrossLinks: (currentSlug: string) => {
    const allArticles = [
      'injury-safe-scaling',
      'warm-up-principles', 
      'mobility-basics',
      'beginner-foundations'
    ];
    
    return allArticles
      .filter(slug => slug !== currentSlug)
      .map(slug => ({
        text: getArticleTitle(slug),
        url: `/articles/${slug}`,
        context: 'related' as const
      }));
  }
};
```

### Performance Optimization
```typescript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  
  // SEO optimizations
  async headers() {
    return [
      {
        source: '/articles/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  },

  // Sitemap generation
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      }
    ];
  }
};
```

## 📝 Content Requirements

### Article Writing Standards
- [ ] **Structure Template:**
  1. **Hook Introduction** (150-200 words)
     - Compelling opening that relates to reader's pain point
     - Preview of what they'll learn
     - Credibility indicator (expertise/experience)
  
  2. **Main Content** (600-800 words)
     - 3-5 main sections with descriptive H2 headings
     - Actionable tips and practical advice
     - Examples and case studies
     - Visual aids (images, lists, callouts)
  
  3. **Conclusion & CTA** (100-150 words)
     - Key takeaways summary
     - Next steps or action items
     - Soft CTA to FMS assessment

- [ ] **SEO Writing Guidelines:**
  - Target keyword naturally in first 100 words
  - Use semantic keywords and related terms
  - Include location-based keywords where relevant
  - Write for featured snippet opportunities
  - Use question-based H2/H3 headings

### Visual Content Requirements
- [ ] **Hero Images:**
  - Professional gym photography
  - People demonstrating correct form
  - Diverse representation
  - Optimized for social sharing (1200x630px)

- [ ] **In-Article Visuals:**
  - Step-by-step movement photos
  - Before/after comparison images
  - Infographic summaries
  - Equipment setup demonstrations

### Content Calendar & Publishing
- [ ] **Week 3 Publishing Schedule:**
  - Monday: "Injury-Safe Scaling" article
  - Wednesday: "Warm-Up Principles" article
  - Friday: Social media promotion for both articles

- [ ] **Week 4 Publishing Schedule:**
  - Monday: "Mobility Basics" article
  - Wednesday: "Beginner Foundations" article
  - Friday: Email newsletter featuring all articles

### Promotion & Distribution
- [ ] **Social Media Content:**
  - Article teaser graphics for Instagram
  - Key quotes for Twitter/LinkedIn
  - Video previews for Facebook
  - Pinterest-optimized images with overlay text

- [ ] **Email Marketing:**
  - Article roundup newsletter
  - Individual article spotlights
  - Member-exclusive additional tips
  - CTA to book FMS assessment

---

**Story Owner:** Content Lead  
**SEO Specialist:** Marketing Lead  
**Technical Lead:** Frontend Developer  
**Created:** September 14, 2025  
**Status:** Ready for Development
