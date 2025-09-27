import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const query = `*[_type == "article" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "imageUrl": featuredImage.asset->url,
      "imageAlt": featuredImage.alt,
      "imageCaption": featuredImage.caption,
      body,
      publishedAt,
      status,
      author->{
        _id,
        name,
        "imageUrl": photo.asset->url,
        bio,
        specialties,
        experience
      },
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      tags,
      "seoTitle": coalesce(seoTitle, title),
      "metaDescription": coalesce(metaDescription, excerpt),
      "ogImageUrl": ogImage.asset->url,
      canonicalUrl,
      relatedHubs[]->{
        _id,
        title,
        "slug": slug.current,
        condition
      },
      ctaSettings
    }`

    const article = await client.fetch(query, { slug: params.slug })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}
