# 🗄️ Content Management & Data Architecture

### Sanity CMS Schema Design

#### Core Content Types

```typescript
// schemas/documents/
export const contentSchemas = [
  // Primary content
  {
    name: 'article',
    type: 'document',
    fields: [
      'title',
      'slug',
      'excerpt',
      'content',
      'seo',
      'publishedAt',
      'author',
      'categories',
      'relatedHubs',
    ],
  },
  {
    name: 'conditionHub',
    type: 'document',
    fields: [
      'title',
      'slug',
      'condition',
      'symptoms',
      'dosAndDonts',
      'exercises',
      'faq',
      'relatedArticles',
    ],
  },

  // Trust & proof content
  {
    name: 'testimonial',
    type: 'document',
    fields: [
      'clientName',
      'content',
      'rating',
      'image',
      'program',
      'featured',
      'displayOrder',
    ],
  },
  {
    name: 'coachBio',
    type: 'document',
    fields: [
      'name',
      'title',
      'bio',
      'qualifications',
      'specialties',
      'image',
      'featured',
    ],
  },

  // Portal content
  {
    name: 'programmingNote',
    type: 'document',
    fields: ['week', 'title', 'content', 'movements', 'focus', 'publishedAt'],
  },
  {
    name: 'movementVideo',
    type: 'document',
    fields: [
      'name',
      'category',
      'description',
      'video',
      'captions',
      'difficulty',
      'equipment',
    ],
  },

  // Site configuration
  {
    name: 'siteSettings',
    type: 'document',
    fields: [
      'chatEnabled',
      'maintenanceMode',
      'fmsEnabled',
      'portalEnabled',
      'holidayMessage',
    ],
  },
]
```

#### Content Relationships & Internal Linking

```typescript
// Content relationship mapping for SEO internal linking
export const contentRelationships = {
  hubs: {
    linksTo: ['articles', 'fms', 'coaches'],
    linkedFrom: ['homepage', 'articles'],
  },
  articles: {
    linksTo: ['hubs', 'fms', 'portal'],
    linkedFrom: ['hubs', 'homepage'],
  },
  fms: {
    linksTo: ['coaches', 'safety'],
    linkedFrom: ['hubs', 'articles', 'homepage'],
  },
}
```

### GROQ Query Architecture

```typescript
// lib/sanity/queries.ts
export const queries = {
  // FMS landing optimized for conversion
  FMS_LANDING: `*[_type == "page" && slug.current == "fms"][0] {
    ...,
    testimonials[]-> {
      clientName, content, rating, program
    },
    coaches[]-> {
      name, title, image, qualifications[0..2]
    }
  }`,

  // Hub page with related content
  HUB_BY_SLUG: `*[_type == "conditionHub" && slug.current == $slug][0] {
    ...,
    relatedArticles[]-> {
      title, slug, excerpt
    },
    faq[] {
      question, answer
    }
  }`,

  // Portal dashboard for members
  PORTAL_DASHBOARD: `{
    "currentWeek": *[_type == "programmingNote"] | order(week desc)[0],
    "recentVideos": *[_type == "movementVideo"] | order(_createdAt desc)[0..5],
    "faqs": *[_type == "memberFaq"] | order(displayOrder asc)
  }`,
}
```

---
