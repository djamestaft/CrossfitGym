import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const query = `*[_type == "conditionHub" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      condition,
      "slug": slug.current,
      heroContent {
        headline,
        subheadline,
        "heroImageUrl": heroImage.asset->url,
        "heroImageAlt": heroImage.alt
      },
      sections[] {
        title,
        type,
        content,
        calloutBox {
          title,
          content,
          style
        }
      },
      faqs[] {
        question,
        answer
      },
      relatedArticles[]->{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "imageUrl": featuredImage.asset->url
      },
      ctaSettings,
      "seoTitle": coalesce(seoTitle, title),
      "metaDescription": coalesce(metaDescription, excerpt),
      publishedAt,
      status,
      progressTracking
    }`

    const conditionHub = await client.fetch(query, { slug: params.slug })

    if (!conditionHub) {
      return NextResponse.json(
        { error: 'Condition hub not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(conditionHub)
  } catch (error) {
    console.error('Error fetching condition hub:', error)
    return NextResponse.json(
      { error: 'Failed to fetch condition hub' },
      { status: 500 }
    )
  }
}
