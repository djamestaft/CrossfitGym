# 🔌 Integration Architecture

### External API Integration Patterns

#### Fitbox Timetable Integration

```typescript
// api/timetable/route.ts
export async function GET() {
  try {
    // Primary: Fitbox API
    const fitboxData = await fetchFitboxTimetable()
    return NextResponse.json(fitboxData)
  } catch (error) {
    // Fallback: Sanity CMS
    const fallbackData = await sanityClient.fetch(TIMETABLE_FALLBACK_QUERY)
    return NextResponse.json({
      data: fallbackData,
      source: 'fallback',
      message: 'Using CMS fallback data',
    })
  }
}

// Caching strategy for timetable
const timetableCache = {
  duration: 900, // 15 minutes
  strategy: 'stale-while-revalidate',
  fallback: 'immediate CMS data',
}
```

#### Tawk.to Chat Integration

```typescript
// components/chat-toggle.tsx
export function ChatToggle() {
  const { data: settings } = useSanityQuery(SITE_SETTINGS_QUERY)

  useEffect(() => {
    if (settings?.chatEnabled && typeof window !== 'undefined') {
      // Load Tawk.to script dynamically to prevent CLS
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://embed.tawk.to/...'
      script.onload = () => gtag('event', 'chat_loaded')
      document.head.appendChild(script)
    }
  }, [settings?.chatEnabled])

  return null // No UI, just script loading
}
```

#### Sanity Webhook Integration

```typescript
// api/revalidate/route.ts - Content revalidation
export async function POST(request: Request) {
  const { isValidSignature, body } = await validateSanityWebhook(request)

  if (!isValidSignature) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Intelligent revalidation based on content type
  const revalidationMap = {
    article: ['/', '/articles', `/articles/${body.slug}`],
    conditionHub: ['/', '/hubs', `/hubs/${body.slug}`],
    testimonial: ['/', '/fms'],
    siteSettings: ['*'], // Revalidate all routes
  }

  const tags = revalidationMap[body._type] || []
  await Promise.all(tags.map(tag => revalidateTag(tag)))

  return NextResponse.json({ revalidated: true, tags })
}
```

---
