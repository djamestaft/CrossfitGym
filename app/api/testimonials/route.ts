import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'

    const query = featured
      ? `*[_type == "testimonial" && featured == true] | order(_createdAt desc) {
          _id,
          name,
          content,
          rating,
          role,
          featured,
          "imageUrl": image.asset->url,
          "imageAlt": image.alt
        }`
      : `*[_type == "testimonial"] | order(featured desc, _createdAt desc) {
          _id,
          name,
          content,
          rating,
          role,
          featured,
          "imageUrl": image.asset->url,
          "imageAlt": image.alt
        }`

    const testimonials = await client.fetch(query)

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}
