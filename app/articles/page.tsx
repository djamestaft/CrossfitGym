import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Calendar, User } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

// Type for Sanity API response
interface SanityArticle {
  _id: string
  title: string
  slug: string
  excerpt?: string
  description?: string
  categories?: Array<{ title: string }>
  relatedHubs?: Array<{ title: string }>
  author?: { name: string }
  publishedAt?: string
  tags?: string[]
}

// Type for fallback data
interface FallbackArticle {
  slug: string
  title: string
  description: string
  category: string
  hub: string
  hubTitle: string
  readTime: string
  author: string
  lastUpdated: string
  tags: string[]
}

// Union type for both data sources
type Article = SanityArticle | FallbackArticle

// Type guard to check if article is from Sanity
function isSanityArticle(article: Article): article is SanityArticle {
  return '_id' in article
}

// Helper function to safely access article properties
function getArticleData(article: Article) {
  if (isSanityArticle(article)) {
    return {
      slug: article.slug,
      title: article.title,
      description: article.excerpt || article.description || '',
      category: article.categories?.[0]?.title || 'Article',
      hubTitle: article.relatedHubs?.[0]?.title || '',
      author: article.author?.name || '',
      publishedAt: article.publishedAt,
      tags: article.tags || [],
    }
  } else {
    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      category: article.category,
      hubTitle: article.hubTitle,
      author: article.author,
      publishedAt: article.lastUpdated,
      tags: article.tags,
    }
  }
}

async function getArticles(): Promise<SanityArticle[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles?status=published`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
    // Return fallback data if API fails
    return []
  }
}

export const metadata: Metadata = {
  title: 'Articles | Geelong Movement Co',
  description:
    'Expert articles on movement therapy, exercise, and pain management from qualified physiotherapists.',
  openGraph: {
    title: 'Articles | Geelong Movement Co',
    description:
      'Evidence-based articles on movement health and pain management.',
  },
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  // If no articles from Sanity, show fallback content
  const displayArticles: Article[] =
    articles.length > 0
      ? articles
      : [
          {
            slug: 'desk-worker-shoulder-pain',
            title: "Desk Worker's Guide to Shoulder Pain Prevention",
            description:
              'Simple exercises and ergonomic tips to prevent shoulder pain from prolonged desk work.',
            category: 'Prevention',
            hub: 'shoulder',
            hubTitle: 'Shoulder Pain & Movement',
            readTime: '6 min read',
            author: 'Dr. Sarah Mitchell',
            lastUpdated: '2024-01-10',
            tags: ['desk work', 'ergonomics', 'prevention'],
          },
          {
            slug: 'rotator-cuff-exercises',
            title: 'Essential Rotator Cuff Strengthening Exercises',
            description:
              'Evidence-based exercises to strengthen and protect your rotator cuff muscles.',
            category: 'Exercise',
            hub: 'shoulder',
            hubTitle: 'Shoulder Pain & Movement',
            readTime: '8 min read',
            author: 'Dr. Mark Thompson',
            lastUpdated: '2024-01-12',
            tags: ['rotator cuff', 'strengthening', 'rehabilitation'],
          },
          {
            slug: 'core-strengthening-back-pain',
            title: 'Core Strengthening for Back Pain Prevention',
            description:
              'Learn the most effective core exercises to support your lower back and prevent pain.',
            category: 'Exercise',
            hub: 'low-back',
            hubTitle: 'Low Back Pain Solutions',
            readTime: '7 min read',
            author: 'Dr. Sarah Mitchell',
            lastUpdated: '2024-01-15',
            tags: ['core strength', 'back pain', 'prevention'],
          },
          {
            slug: 'sitting-posture-back-health',
            title: 'Optimal Sitting Posture for Back Health',
            description:
              'How to set up your workspace and maintain good posture throughout the day.',
            category: 'Prevention',
            hub: 'low-back',
            hubTitle: 'Low Back Pain Solutions',
            readTime: '9 min read',
            author: 'Dr. Mark Thompson',
            lastUpdated: '2024-01-18',
            tags: ['posture', 'ergonomics', 'workplace health'],
          },
        ]

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <section className='bg-gradient-to-b from-muted to-background py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-6'>
            <Badge variant='secondary' className='mb-4'>
              Expert Content
            </Badge>
            <h1 className='text-4xl md:text-6xl font-bold text-balance'>
              Movement Health Articles
            </h1>
            <p className='text-xl text-muted-foreground text-balance max-w-2xl mx-auto'>
              Evidence-based articles on movement therapy, exercise, and pain
              management from our qualified physiotherapists.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-8'>
              {displayArticles.map((article: Article) => {
                const articleData = getArticleData(article)

                return (
                  <Card
                    key={articleData.slug}
                    className='group hover:shadow-lg transition-shadow'
                  >
                    <CardHeader>
                      <div className='flex items-center gap-2 mb-3'>
                        <Badge variant='secondary'>
                          {articleData.category}
                        </Badge>
                        {articleData.hubTitle && (
                          <Badge variant='outline' className='text-xs'>
                            {articleData.hubTitle}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className='text-xl group-hover:text-primary transition-colors'>
                        <Link href={`/articles/${articleData.slug}`}>
                          {articleData.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <p className='text-muted-foreground text-sm'>
                        {articleData.description}
                      </p>

                      <div className='flex flex-wrap gap-2'>
                        {articleData.tags
                          .slice(0, 3)
                          .map((tag: string, index: number) => (
                            <Badge
                              key={index}
                              variant='outline'
                              className='text-xs'
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>

                      <div className='flex items-center justify-between text-xs text-muted-foreground'>
                        <div className='flex items-center gap-4'>
                          {articleData.author && (
                            <div className='flex items-center gap-1'>
                              <User className='h-3 w-3' />
                              <span>{articleData.author}</span>
                            </div>
                          )}
                          {articleData.publishedAt && (
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-3 w-3' />
                              <span>
                                {new Date(
                                  articleData.publishedAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        variant='outline'
                        className='w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors bg-transparent'
                        asChild
                      >
                        <Link href={`/articles/${article.slug}`}>
                          Read Article
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-muted'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center space-y-6'>
            <h2 className='text-3xl font-bold'>
              Ready for Personalized Guidance?
            </h2>
            <p className='text-muted-foreground'>
              Our articles provide valuable insights, but personalized
              assessment and treatment can address your specific needs more
              effectively.
            </p>
            <Button size='lg' asChild>
              <Link href='/fms'>
                Book Your Free Assessment
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
