import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'published'
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined

    let query = `*[_type == "conditionHub"`

    if (status) {
      query += ` && status == "${status}"`
    }

    query += `] | order(publishedAt desc)`

    if (limit) {
      query += ` [0...${limit}]`
    }

    query += ` {
      _id,
      title,
      condition,
      "slug": slug.current,
      "heroImageUrl": heroContent.heroImage.asset->url,
      publishedAt,
      status,
      progressTracking,
      ctaSettings,
      "seoTitle": coalesce(seoTitle, title),
      "metaDescription": coalesce(metaDescription, excerpt)
    }`

    const conditionHubs = await client.fetch(query)

    return NextResponse.json(conditionHubs)
  } catch (error) {
    console.error('Error fetching condition hubs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch condition hubs' },
      { status: 500 }
    )
  }
}
