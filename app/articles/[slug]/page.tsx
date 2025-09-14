import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Clock,
  User,
  Calendar,
  BookOpen,
  Share2,
} from 'lucide-react'
import Link from 'next/link'

// Mock data - in real implementation, this would come from Sanity CMS
const articlesData = {
  'desk-worker-shoulder-pain': {
    title: "Desk Worker's Guide to Shoulder Pain Prevention",
    description:
      'Simple exercises and ergonomic tips to prevent shoulder pain from prolonged desk work.',
    content: `
      <h2>The Desk Worker's Dilemma</h2>
      <p>If you spend most of your day at a desk, you're not alone in experiencing shoulder pain. Poor posture, repetitive movements, and prolonged static positions can lead to muscle imbalances and discomfort.</p>
      
      <h3>Common Causes of Desk-Related Shoulder Pain</h3>
      <ul>
        <li><strong>Forward Head Posture:</strong> Strains the neck and upper back muscles</li>
        <li><strong>Rounded Shoulders:</strong> Weakens the posterior chain muscles</li>
        <li><strong>Poor Monitor Height:</strong> Forces awkward neck positioning</li>
        <li><strong>Inadequate Breaks:</strong> Muscles become tight from static positions</li>
      </ul>
      
      <h3>Simple Prevention Strategies</h3>
      <h4>1. Ergonomic Setup</h4>
      <ul>
        <li>Monitor at eye level to prevent neck strain</li>
        <li>Keyboard and mouse at elbow height</li>
        <li>Feet flat on the floor or footrest</li>
        <li>Back supported by chair</li>
      </ul>
      
      <h4>2. Movement Breaks</h4>
      <p>Set a timer to remind yourself to move every 30-45 minutes. Simple movements include:</p>
      <ul>
        <li>Shoulder blade squeezes</li>
        <li>Neck rotations</li>
        <li>Upper trap stretches</li>
        <li>Doorway chest stretches</li>
      </ul>
      
      <h4>3. Strengthening Exercises</h4>
      <p>Perform these exercises 2-3 times per week:</p>
      <ul>
        <li>Wall slides for scapular stability</li>
        <li>Band pull-aparts for posterior deltoids</li>
        <li>Chin tucks for deep neck flexors</li>
        <li>Thoracic spine extensions</li>
      </ul>
    `,
    category: 'Prevention',
    hub: 'shoulder',
    hubTitle: 'Shoulder Pain & Movement',
    lastUpdated: '2024-01-10',
    readTime: '6 min read',
    author: 'Dr. Sarah Mitchell',
    tags: ['desk work', 'ergonomics', 'prevention', 'exercises'],
    relatedArticles: [
      {
        slug: 'rotator-cuff-exercises',
        title: 'Essential Rotator Cuff Strengthening Exercises',
        excerpt:
          'Evidence-based exercises to strengthen and protect your rotator cuff.',
      },
    ],
  },
  'rotator-cuff-exercises': {
    title: 'Essential Rotator Cuff Strengthening Exercises',
    description:
      'Evidence-based exercises to strengthen and protect your rotator cuff muscles.',
    content: `
      <h2>Understanding Your Rotator Cuff</h2>
      <p>The rotator cuff consists of four muscles that work together to stabilize your shoulder joint. These muscles are crucial for overhead activities and maintaining shoulder health.</p>
      
      <h3>The Four Rotator Cuff Muscles</h3>
      <ul>
        <li><strong>Supraspinatus:</strong> Initiates arm elevation</li>
        <li><strong>Infraspinatus:</strong> External rotation and stabilization</li>
        <li><strong>Teres Minor:</strong> External rotation and adduction</li>
        <li><strong>Subscapularis:</strong> Internal rotation and stabilization</li>
      </ul>
      
      <h3>Progressive Exercise Program</h3>
      
      <h4>Phase 1: Basic Strengthening (Weeks 1-2)</h4>
      <p><strong>1. Pendulum Swings</strong></p>
      <ul>
        <li>Lean forward, let arm hang freely</li>
        <li>Gently swing arm in small circles</li>
        <li>2 sets of 10 each direction</li>
      </ul>
      
      <p><strong>2. Isometric External Rotation</strong></p>
      <ul>
        <li>Elbow at side, bent to 90 degrees</li>
        <li>Press back of hand against wall</li>
        <li>Hold 5 seconds, repeat 10 times</li>
      </ul>
      
      <h4>Phase 2: Dynamic Strengthening (Weeks 3-4)</h4>
      <p><strong>1. Band External Rotation</strong></p>
      <ul>
        <li>Elbow at side, resistance band in hand</li>
        <li>Rotate arm outward against resistance</li>
        <li>3 sets of 12-15 repetitions</li>
      </ul>
      
      <p><strong>2. Scapular Wall Slides</strong></p>
      <ul>
        <li>Back against wall, arms in "W" position</li>
        <li>Slide arms up and down maintaining contact</li>
        <li>3 sets of 10-12 repetitions</li>
      </ul>
      
      <h4>Phase 3: Functional Training (Weeks 5+)</h4>
      <p><strong>1. Prone T-Y-W Raises</strong></p>
      <ul>
        <li>Lie face down, lift arms in T, Y, and W positions</li>
        <li>Focus on squeezing shoulder blades</li>
        <li>2 sets of 8-10 each position</li>
      </ul>
      
      <h3>Important Safety Tips</h3>
      <ul>
        <li>Start with light resistance and progress gradually</li>
        <li>Stop if you experience sharp pain</li>
        <li>Maintain proper form over speed or weight</li>
        <li>Allow rest days between sessions</li>
      </ul>
    `,
    category: 'Exercise',
    hub: 'shoulder',
    hubTitle: 'Shoulder Pain & Movement',
    lastUpdated: '2024-01-12',
    readTime: '8 min read',
    author: 'Dr. Mark Thompson',
    tags: ['rotator cuff', 'strengthening', 'rehabilitation', 'exercises'],
    relatedArticles: [
      {
        slug: 'desk-worker-shoulder-pain',
        title: "Desk Worker's Guide to Shoulder Pain Prevention",
        excerpt:
          'Simple exercises and ergonomic tips to prevent shoulder pain from desk work.',
      },
    ],
  },
  'core-strengthening-back-pain': {
    title: 'Core Strengthening for Back Pain Prevention',
    description:
      'Learn the most effective core exercises to support your lower back and prevent pain.',
    content: `
      <h2>The Core-Back Pain Connection</h2>
      <p>Your core muscles act as a natural corset, providing stability and support for your spine. Weak core muscles can contribute to poor posture and increased stress on the lower back.</p>
      
      <h3>What Makes Up Your Core?</h3>
      <ul>
        <li><strong>Diaphragm:</strong> Primary breathing muscle</li>
        <li><strong>Pelvic Floor:</strong> Supports pelvic organs</li>
        <li><strong>Transverse Abdominis:</strong> Deep abdominal muscle</li>
        <li><strong>Multifidus:</strong> Deep spinal stabilizers</li>
      </ul>
      
      <h3>Progressive Core Training Program</h3>
      
      <h4>Level 1: Foundation (Weeks 1-2)</h4>
      <p><strong>1. Diaphragmatic Breathing</strong></p>
      <ul>
        <li>Lie on back, knees bent</li>
        <li>Breathe deeply into belly, not chest</li>
        <li>3 sets of 8-10 breaths</li>
      </ul>
      
      <p><strong>2. Dead Bug</strong></p>
      <ul>
        <li>Lie on back, arms up, knees at 90 degrees</li>
        <li>Lower opposite arm and leg slowly</li>
        <li>2 sets of 5 each side</li>
      </ul>
      
      <h4>Level 2: Stability (Weeks 3-4)</h4>
      <p><strong>1. Modified Plank</strong></p>
      <ul>
        <li>Start on knees and forearms</li>
        <li>Hold straight line from knees to head</li>
        <li>Hold 15-30 seconds, 3 sets</li>
      </ul>
      
      <p><strong>2. Bird Dog</strong></p>
      <ul>
        <li>Start on hands and knees</li>
        <li>Extend opposite arm and leg</li>
        <li>Hold 5 seconds, 8 reps each side</li>
      </ul>
      
      <h4>Level 3: Dynamic (Weeks 5+)</h4>
      <p><strong>1. Full Plank</strong></p>
      <ul>
        <li>Forearms and toes, straight body line</li>
        <li>Hold 30-60 seconds, 3 sets</li>
      </ul>
      
      <p><strong>2. Pallof Press</strong></p>
      <ul>
        <li>Hold band at chest, resist rotation</li>
        <li>Press out and hold 3 seconds</li>
        <li>10 reps each direction</li>
      </ul>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li>Holding your breath during exercises</li>
        <li>Focusing only on "six-pack" muscles</li>
        <li>Progressing too quickly</li>
        <li>Ignoring proper form</li>
      </ul>
    `,
    category: 'Exercise',
    hub: 'low-back',
    hubTitle: 'Low Back Pain Solutions',
    lastUpdated: '2024-01-15',
    readTime: '7 min read',
    author: 'Dr. Sarah Mitchell',
    tags: ['core strength', 'back pain', 'prevention', 'stability'],
    relatedArticles: [
      {
        slug: 'sitting-posture-back-health',
        title: 'Optimal Sitting Posture for Back Health',
        excerpt:
          'How to set up your workspace and maintain good posture throughout the day.',
      },
    ],
  },
  'sitting-posture-back-health': {
    title: 'Optimal Sitting Posture for Back Health',
    description:
      'How to set up your workspace and maintain good posture throughout the day.',
    content: `
      <h2>The Modern Sitting Challenge</h2>
      <p>The average office worker spends 10+ hours per day sitting. Poor sitting posture is a major contributor to lower back pain and can lead to long-term spinal problems.</p>
      
      <h3>The Anatomy of Good Sitting Posture</h3>
      <ul>
        <li><strong>Head:</strong> Balanced over shoulders, not forward</li>
        <li><strong>Shoulders:</strong> Relaxed, not hunched or rolled forward</li>
        <li><strong>Back:</strong> Supported by chair, maintaining natural curves</li>
        <li><strong>Hips:</strong> Slightly higher than knees</li>
        <li><strong>Feet:</strong> Flat on floor or footrest</li>
      </ul>
      
      <h3>Workspace Setup Guidelines</h3>
      
      <h4>Chair Adjustment</h4>
      <ul>
        <li>Seat height: Thighs parallel to floor</li>
        <li>Backrest: Supports lower back curve</li>
        <li>Armrests: Elbows at 90 degrees</li>
        <li>Seat depth: 2-3 fingers between knee and seat edge</li>
      </ul>
      
      <h4>Monitor Positioning</h4>
      <ul>
        <li>Top of screen at or below eye level</li>
        <li>20-26 inches from your eyes</li>
        <li>Directly in front of you</li>
        <li>Tilted slightly backward (10-20 degrees)</li>
      </ul>
      
      <h4>Keyboard and Mouse</h4>
      <ul>
        <li>At elbow height</li>
        <li>Close to your body</li>
        <li>Wrists in neutral position</li>
        <li>Mouse at same level as keyboard</li>
      </ul>
      
      <h3>Movement Strategies</h3>
      
      <h4>The 20-20-20 Rule</h4>
      <p>Every 20 minutes, look at something 20 feet away for 20 seconds. This helps reduce eye strain and reminds you to move.</p>
      
      <h4>Micro-Breaks (Every 30 minutes)</h4>
      <ul>
        <li>Stand and sit 5 times</li>
        <li>Shoulder blade squeezes</li>
        <li>Neck rotations</li>
        <li>Spinal twists while seated</li>
      </ul>
      
      <h4>Movement Breaks (Every 2 hours)</h4>
      <ul>
        <li>5-minute walk</li>
        <li>Hip flexor stretches</li>
        <li>Thoracic spine extensions</li>
        <li>Calf raises</li>
      </ul>
      
      <h3>Warning Signs of Poor Posture</h3>
      <ul>
        <li>Lower back stiffness or pain</li>
        <li>Neck and shoulder tension</li>
        <li>Headaches</li>
        <li>Fatigue</li>
        <li>Reduced concentration</li>
      </ul>
      
      <h3>Building Better Habits</h3>
      <ul>
        <li>Set hourly movement reminders</li>
        <li>Use a standing desk converter</li>
        <li>Practice posture checks throughout the day</li>
        <li>Strengthen your core and back muscles</li>
      </ul>
    `,
    category: 'Prevention',
    hub: 'low-back',
    hubTitle: 'Low Back Pain Solutions',
    lastUpdated: '2024-01-18',
    readTime: '9 min read',
    author: 'Dr. Mark Thompson',
    tags: ['posture', 'ergonomics', 'workplace health', 'prevention'],
    relatedArticles: [
      {
        slug: 'core-strengthening-back-pain',
        title: 'Core Strengthening for Back Pain Prevention',
        excerpt:
          'Learn the most effective core exercises to support your lower back.',
      },
    ],
  },
}

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = articlesData[params.slug as keyof typeof articlesData]

  if (!article) {
    return {
      title: 'Article Not Found | Geelong Movement Co',
    }
  }

  return {
    title: `${article.title} | Geelong Movement Co`,
    description: article.description,
    openGraph: {
      title: `${article.title} | Geelong Movement Co`,
      description: article.description,
      type: 'article',
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articlesData[params.slug as keyof typeof articlesData]

  if (!article) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Geelong Movement Co',
    },
    dateModified: article.lastUpdated,
    articleSection: article.category,
    keywords: article.tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://geelongmovement.com/articles/${params.slug}`,
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
        name: 'Articles',
        item: 'https://geelongmovement.com/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://geelongmovement.com/articles/${params.slug}`,
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
                  href={`/hubs/${article.hub}`}
                  className='text-muted-foreground hover:text-foreground'
                >
                  {article.hubTitle}
                </Link>
              </li>
              <li className='text-muted-foreground'>/</li>
              <li className='text-foreground font-medium'>{article.title}</li>
            </ol>
          </div>
        </nav>

        {/* Header */}
        <header className='bg-gradient-to-b from-muted to-background py-12'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <div className='flex items-center gap-2 mb-4'>
                <Badge variant='secondary'>{article.category}</Badge>
                <Badge variant='outline'>{article.hubTitle}</Badge>
              </div>
              <h1 className='text-4xl md:text-5xl font-bold mb-4 text-balance'>
                {article.title}
              </h1>
              <p className='text-xl text-muted-foreground mb-6 text-balance'>
                {article.description}
              </p>

              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4' />
                  <span>{article.author}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    Updated {new Date(article.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  <span>{article.readTime}</span>
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
                {/* Article Content */}
                <div
                  className='prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground'
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className='flex flex-wrap gap-2'>
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant='outline' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <Card className='bg-primary text-primary-foreground'>
                  <CardContent className='pt-6'>
                    <h2 className='text-xl font-semibold mb-2'>
                      Ready to Take Action?
                    </h2>
                    <p className='mb-4 opacity-90'>
                      Get a personalized movement assessment to address your
                      specific needs and goals.
                    </p>
                    <Button variant='secondary' asChild>
                      <Link href='/fms'>
                        Book Free Assessment
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className='space-y-8'>
                {/* Share */}
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Share2 className='h-5 w-5' />
                      Share Article
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground mb-3'>
                      Found this helpful? Share it with others who might
                      benefit.
                    </p>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full bg-transparent'
                    >
                      Copy Link
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                {article.relatedArticles.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2'>
                        <BookOpen className='h-5 w-5' />
                        Related Articles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      {article.relatedArticles.map((relatedArticle, index) => (
                        <div key={index} className='space-y-2'>
                          <h3 className='font-semibold text-sm'>
                            <Link
                              href={`/articles/${relatedArticle.slug}`}
                              className='hover:text-primary transition-colors'
                            >
                              {relatedArticle.title}
                            </Link>
                          </h3>
                          <p className='text-xs text-muted-foreground'>
                            {relatedArticle.excerpt}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Back to Hub */}
                <Card>
                  <CardHeader>
                    <CardTitle>Explore More</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <Button
                      variant='outline'
                      className='w-full bg-transparent'
                      asChild
                    >
                      <Link href={`/hubs/${article.hub}`}>
                        Back to {article.hubTitle}
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Link>
                    </Button>
                    <Button className='w-full' asChild>
                      <Link href='/fms'>Book Assessment</Link>
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
