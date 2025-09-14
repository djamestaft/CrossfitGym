import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, User, Calendar, BookOpen } from 'lucide-react'
import Link from 'next/link'

// Mock data - in real implementation, this would come from Sanity CMS
const hubsData = {
  shoulder: {
    title: 'Shoulder Pain & Movement',
    description:
      'Comprehensive guide to understanding, treating, and preventing shoulder pain through movement therapy.',
    content: `
      <h2>Understanding Shoulder Pain</h2>
      <p>Shoulder pain is one of the most common musculoskeletal complaints, affecting millions of people worldwide. The shoulder is a complex joint that relies on precise coordination between multiple muscles, tendons, and ligaments.</p>
      
      <h3>Common Causes of Shoulder Pain</h3>
      <ul>
        <li><strong>Rotator Cuff Injuries:</strong> Tears or inflammation in the muscles that stabilize the shoulder</li>
        <li><strong>Impingement Syndrome:</strong> Compression of soft tissues in the shoulder joint</li>
        <li><strong>Frozen Shoulder:</strong> Stiffness and pain that develops gradually</li>
        <li><strong>Poor Posture:</strong> Forward head posture and rounded shoulders from desk work</li>
      </ul>
      
      <h3>Movement-Based Solutions</h3>
      <p>At Geelong Movement Co, we believe in addressing the root cause of shoulder pain through targeted movement therapy. Our approach focuses on:</p>
      <ul>
        <li>Restoring proper shoulder blade movement</li>
        <li>Improving thoracic spine mobility</li>
        <li>Strengthening the rotator cuff muscles</li>
        <li>Correcting postural imbalances</li>
      </ul>
      
      <h3>When to Seek Professional Help</h3>
      <p>While some shoulder discomfort is normal, you should seek professional assessment if you experience:</p>
      <ul>
        <li>Pain that persists for more than a few days</li>
        <li>Significant loss of range of motion</li>
        <li>Pain that interferes with sleep</li>
        <li>Weakness in the arm or shoulder</li>
      </ul>
    `,
    lastUpdated: '2024-01-15',
    readTime: '8 min read',
    author: 'Dr. Sarah Mitchell',
    relatedArticles: [
      {
        slug: 'desk-worker-shoulder-pain',
        title: "Desk Worker's Guide to Shoulder Pain Prevention",
        excerpt:
          'Simple exercises and ergonomic tips to prevent shoulder pain from desk work.',
      },
      {
        slug: 'rotator-cuff-exercises',
        title: 'Essential Rotator Cuff Strengthening Exercises',
        excerpt:
          'Evidence-based exercises to strengthen and protect your rotator cuff.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take to recover from shoulder pain?',
        answer:
          'Recovery time varies depending on the cause and severity of your shoulder pain. Minor issues may resolve in a few days to weeks, while more complex problems like rotator cuff tears may take several months of consistent treatment.',
      },
      {
        question: 'Can I exercise with shoulder pain?',
        answer:
          'It depends on the type and severity of your pain. Generally, gentle movement is beneficial, but you should avoid activities that worsen your symptoms. A movement assessment can help determine what exercises are safe and beneficial for your specific condition.',
      },
    ],
  },
  'low-back': {
    title: 'Low Back Pain Solutions',
    description:
      'Evidence-based approaches to managing and preventing low back pain through movement and exercise.',
    content: `
      <h2>Understanding Low Back Pain</h2>
      <p>Low back pain affects up to 80% of people at some point in their lives, making it one of the leading causes of disability worldwide. The good news is that most back pain is mechanical in nature and responds well to movement-based interventions.</p>
      
      <h3>Common Causes of Low Back Pain</h3>
      <ul>
        <li><strong>Muscle Strain:</strong> Overstretching or tearing of muscles or ligaments</li>
        <li><strong>Disc Problems:</strong> Herniation, degeneration, or bulging discs</li>
        <li><strong>Poor Movement Patterns:</strong> Faulty lifting, bending, or sitting mechanics</li>
        <li><strong>Sedentary Lifestyle:</strong> Prolonged sitting and lack of movement</li>
        <li><strong>Weak Core:</strong> Insufficient support from deep stabilizing muscles</li>
      </ul>
      
      <h3>The Movement Solution</h3>
      <p>Research consistently shows that staying active and moving correctly is crucial for back pain recovery and prevention. Our approach includes:</p>
      <ul>
        <li>Teaching proper movement mechanics</li>
        <li>Strengthening the deep core muscles</li>
        <li>Improving hip and thoracic spine mobility</li>
        <li>Addressing muscle imbalances</li>
      </ul>
      
      <h3>Red Flags: When to Seek Immediate Care</h3>
      <p>While most back pain is not serious, certain symptoms require immediate medical attention:</p>
      <ul>
        <li>Loss of bowel or bladder control</li>
        <li>Severe leg weakness</li>
        <li>Numbness in the groin area</li>
        <li>Pain following a significant trauma</li>
      </ul>
    `,
    lastUpdated: '2024-01-20',
    readTime: '10 min read',
    author: 'Dr. Mark Thompson',
    relatedArticles: [
      {
        slug: 'core-strengthening-back-pain',
        title: 'Core Strengthening for Back Pain Prevention',
        excerpt:
          'Learn the most effective core exercises to support your lower back.',
      },
      {
        slug: 'sitting-posture-back-health',
        title: 'Optimal Sitting Posture for Back Health',
        excerpt:
          'How to set up your workspace and maintain good posture throughout the day.',
      },
    ],
    faqs: [
      {
        question: 'Should I rest or stay active with back pain?',
        answer:
          'Current evidence strongly supports staying active rather than bed rest for most types of back pain. Gentle movement and gradual return to normal activities typically leads to faster recovery and better outcomes.',
      },
      {
        question: 'Is it normal for back pain to come and go?',
        answer:
          "Yes, it's common for back pain to fluctuate. Many people experience episodes of pain followed by periods of relief. However, if pain is frequent or severe, it's worth getting a professional assessment to address underlying causes.",
      },
    ],
  },
}

interface HubPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: HubPageProps): Promise<Metadata> {
  const hub = hubsData[params.slug as keyof typeof hubsData]

  if (!hub) {
    return {
      title: 'Hub Not Found | Geelong Movement Co',
    }
  }

  return {
    title: `${hub.title} | Geelong Movement Co`,
    description: hub.description,
    openGraph: {
      title: `${hub.title} | Geelong Movement Co`,
      description: hub.description,
      type: 'article',
    },
  }
}

export default function HubPage({ params }: HubPageProps) {
  const hub = hubsData[params.slug as keyof typeof hubsData]

  if (!hub) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: hub.title,
    description: hub.description,
    author: {
      '@type': 'Person',
      name: hub.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Geelong Movement Co',
    },
    dateModified: hub.lastUpdated,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://geelongmovement.com/hubs/${params.slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://geelongmovement.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Health Hubs',
        item: 'https://geelongmovement.com/hubs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: hub.title,
        item: `https://geelongmovement.com/hubs/${params.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className='min-h-screen bg-background'>
        {/* Breadcrumb */}
        <nav className='bg-muted py-4' aria-label='Breadcrumb'>
          <div className='container mx-auto px-4'>
            <ol className='flex items-center space-x-2 text-sm'>
              <li>
                <Link
                  href='/'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Home
                </Link>
              </li>
              <li className='text-muted-foreground'>/</li>
              <li>
                <Link
                  href='/hubs'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Health Hubs
                </Link>
              </li>
              <li className='text-muted-foreground'>/</li>
              <li className='text-foreground font-medium'>{hub.title}</li>
            </ol>
          </div>
        </nav>

        {/* Header */}
        <header className='bg-gradient-to-b from-muted to-background py-12'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <Badge variant='secondary' className='mb-4'>
                Health Hub
              </Badge>
              <h1 className='text-4xl md:text-5xl font-bold mb-4 text-balance'>
                {hub.title}
              </h1>
              <p className='text-xl text-muted-foreground mb-6 text-balance'>
                {hub.description}
              </p>

              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4' />
                  <span>{hub.author}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    Updated {new Date(hub.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  <span>{hub.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto'>
            <div className='grid lg:grid-cols-3 gap-12'>
              {/* Main Content */}
              <div className='lg:col-span-2 space-y-8'>
                {/* CTA Banner */}
                <Card className='bg-primary text-primary-foreground'>
                  <CardContent className='pt-6'>
                    <h2 className='text-xl font-semibold mb-2'>
                      Get Personalized Help
                    </h2>
                    <p className='mb-4 opacity-90'>
                      Book a free FMS assessment to get a personalized movement
                      plan for your specific needs.
                    </p>
                    <Button variant='secondary' asChild>
                      <Link href='/fms'>
                        Book Free Assessment
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Article Content */}
                <div
                  className='prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground'
                  dangerouslySetInnerHTML={{ __html: hub.content }}
                />

                {/* FAQ Section */}
                <div className='space-y-6'>
                  <h2 className='text-2xl font-bold'>
                    Frequently Asked Questions
                  </h2>
                  <div className='space-y-4'>
                    {hub.faqs.map((faq, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            {faq.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='text-muted-foreground'>{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className='space-y-8'>
                {/* Related Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <BookOpen className='h-5 w-5' />
                      Related Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {hub.relatedArticles.map((article, index) => (
                      <div key={index} className='space-y-2'>
                        <h3 className='font-semibold text-sm'>
                          <Link
                            href={`/articles/${article.slug}`}
                            className='hover:text-primary transition-colors'
                          >
                            {article.title}
                          </Link>
                        </h3>
                        <p className='text-xs text-muted-foreground'>
                          {article.excerpt}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Take Action</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <Button className='w-full' asChild>
                      <Link href='/fms'>
                        Book Assessment
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Link>
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full bg-transparent'
                      asChild
                    >
                      <Link href='/portal'>Access Member Portal</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground mb-3'>
                      Have questions about your specific situation? Our team is
                      here to help.
                    </p>
                    <Button variant='outline' size='sm' asChild>
                      <Link href='tel:+61352345678'>Call (03) 5234 5678</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
