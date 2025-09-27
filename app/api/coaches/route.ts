import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active') !== 'false'
    const specialty = searchParams.get('specialty')
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined

    let query = `*[_type == "coachBio"`

    if (active !== null) {
      query += ` && active == ${active}`
    }

    if (specialty) {
      query += ` && specialties[] == "${specialty}"`
    }

    query += `] | order(order asc, name asc)`

    if (limit) {
      query += ` [0...${limit}]`
    }

    query += ` {
      _id,
      name,
      "imageUrl": photo.asset->url,
      "imageAlt": photo.alt,
      bio,
      specialties,
      experience,
      qualifications[] {
        certification,
        issuer,
        year,
        expires
      },
      achievements,
      active,
      order,
      socialMedia {
        linkedin,
        instagram,
        facebook,
        twitter
      },
      availability,
      contactPreferences {
        email,
        phone,
        preferredContact
      }
    }`

    const coaches = await client.fetch(query)

    // Return empty array instead of error when no coaches found
    return NextResponse.json(coaches || [])
  } catch (error) {
    console.error('Error fetching coaches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch coaches' },
      { status: 500 }
    )
  }
}
