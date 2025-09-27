import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'published'
    const search = searchParams.get('search')

    let query = `*[_type == "faq"`

    if (status) {
      query += ` && status == "${status}"`
    }

    if (category && category !== 'all') {
      query += ` && category == "${category}"`
    }

    if (search) {
      query += ` && (question match "*${search}*" || answer match "*${search}*" || tags[*] match "*${search}*")`
    }

    query += `] | order(featured desc, priority asc, publishedAt desc)`

    query += ` {
      _id,
      question,
      answer,
      category,
      priority,
      featured,
      tags,
      relatedQuestions[]->{
        _id,
        question,
        category
      },
      relatedArticles[]->{
        _id,
        title,
        "slug": slug.current
      },
      publishedAt,
      status
    }`

    const faqs = await client.fetch(query)

    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}
