# Sanity CMS Setup Guide

## Installation Complete ✅

The Sanity CMS has been successfully integrated with your Next.js project. Here's what's been set up:

### ✅ Created:

- **Schemas**: Testimonial, Team Member, and Page content types
- **API Routes**: `/api/testimonials` for fetching testimonials
- **Components**: `SanityTestimonials` component for displaying testimonials
- **Queries**: GROQ queries for fetching data from Sanity
- **Example Page**: `app/about-new/page.tsx` showing Sanity integration

### ✅ Files Created:

- `sanity/schemas/` - Schema definitions
- `sanity.config.ts` - Sanity configuration
- `lib/sanity.client-v14.ts` - Sanity client for Next.js 14
- `lib/sanity.queries-v14.ts` - GROQ queries
- `app/api/testimonials/route.ts` - API endpoint
- `components/testimonials-Sanity.tsx` - Testimonials component
- `scripts/migrate-testimonials.ts` - Migration script

## Next Steps

### 1. Set up Sanity Project

```bash
# Create a new Sanity project
npx sanity@latest init

# Choose:
# - Project name: "Geelong Movement Co"
# - Dataset: "production"
# - Output path: current directory
# - Schema configuration: Clean project with no predefined schema types
```

### 2. Configure Environment Variables

Copy the values from your Sanity project to `.env.local`:

```bash
# From your Sanity project dashboard
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-read-token
```

### 3. Migrate Existing Testimonials

```bash
# Run the migration script (after setting up env vars)
npx tsx scripts/migrate-testimonials.ts
```

### 4. Start Development

```bash
# Start Next.js development server
npm run dev

# Start Sanity Studio (in a separate terminal)
npx sanity dev
```

### 5. Test the Integration

- Visit `http://localhost:3000/about-new` to see Sanity-powered testimonials
- The page will show fallback data if Sanity is not configured yet
- Once configured, it will fetch real data from your Sanity project

## Usage Examples

### Using the SanityTestimonials Component

```tsx
import { SanityTestimonials } from '@/components/testimonials-Sanity'
import { client } from '@/lib/sanity.client-v14'
import { TESTIMONIALS_QUERY } from '@/lib/sanity.queries-v14'

export default async function MyPage() {
  const testimonials = await client.fetch(TESTIMONIALS_QUERY)

  return (
    <div>
      <SanityTestimonials
        testimonials={testimonials}
        showAll={true}
        maxItems={6}
      />
    </div>
  )
}
```

### Using the API Route

```tsx
// Client-side fetching
'use client'

import { useState, useEffect } from 'react'

export default function ClientComponent() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
  }, [])

  return <div>{/* Render testimonials */}</div>
}
```

## Features

- ✅ Testimonials with ratings, images, and featured status
- ✅ Team members with photos, bios, and certifications
- ✅ Basic page content management
- ✅ Responsive design
- ✅ SEO-friendly structure
- ✅ API endpoints for client-side fetching
- ✅ TypeScript support

## Notes

- The setup is compatible with Next.js 14
- Uses `@sanity/client` instead of `next-sanity` for version compatibility
- Includes fallback data for development without Sanity configuration
- Ready for deployment once environment variables are set
