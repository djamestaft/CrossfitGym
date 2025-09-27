import { rateLimit } from '@/lib/rate-limit'
import { validateQueryParams, validateSlug } from '@/lib/validation'
import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const { searchParams } = new URL(request.url)

    // Validate query parameters
    validateQueryParams(searchParams, [
      'category',
      'status',
      'limit',
      'featured',
    ])

    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'published'
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined
    const featured = searchParams.get('featured') === 'true'

    // Validate inputs
    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      )
    }

    if (category) {
      validateSlug(category)
    }

    let query = `*[_type == "article"`

    if (status) {
      query += ` && status == "${status}"`
    }

    if (category) {
      query += ` && categories[]->slug.current == "${category}"`
    }

    if (featured) {
      query += ` && featured == true`
    }

    query += `] | order(publishedAt desc)`

    if (limit) {
      query += ` [0...${limit}]`
    }

    query += ` {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "imageUrl": featuredImage.asset->url,
      "imageAlt": featuredImage.alt,
      "imageCaption": featuredImage.caption,
      publishedAt,
      status,
      author->{
        _id,
        name,
        "imageUrl": photo.asset->url,
        specialties
      },
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      tags,
      "seoTitle": coalesce(seoTitle, title),
      "metaDescription": coalesce(metaDescription, excerpt),
      ctaSettings
    }`

    const articles = await client.fetch(query)

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
