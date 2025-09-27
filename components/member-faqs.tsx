/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FAQ {
  _id: string
  question: string
  answer: any[]
  category: string
  tags: string[]
  featured?: boolean
}

const fallbackFAQs: FAQ[] = [
  {
    _id: '1',
    question: 'How often should I do my prescribed exercises?',
    answer: [
      {
        children: [
          {
            text: "The frequency depends on your specific program, but generally we recommend 3-4 times per week for strengthening exercises and daily for mobility work. Your personalized plan will specify the exact frequency for each exercise. Consistency is more important than intensity - it's better to do exercises regularly at a moderate intensity than sporadically at high intensity.",
          },
        ],
      },
    ],
    category: 'Exercise Programming',
    tags: ['frequency', 'programming', 'consistency'],
  },
  {
    _id: '2',
    question: 'What should I do if an exercise causes pain?',
    answer: [
      {
        children: [
          {
            text: 'Stop the exercise immediately if you experience sharp or increasing pain. Some mild discomfort during strengthening is normal, but pain is not. Try reducing the range of motion, resistance, or repetitions. If pain persists, contact our team for guidance. Remember: "Motion is lotion, but pain is not gain."',
          },
        ],
      },
    ],
    category: 'Pain Management',
    tags: ['pain', 'safety', 'modifications'],
  },
  {
    _id: '3',
    question: "Can I modify exercises if they're too difficult?",
    answer: [
      {
        children: [
          {
            text: 'All exercises can be modified to match your current ability level. Common modifications include reducing range of motion, decreasing resistance, performing fewer repetitions, or using support (like a wall or chair). The movement library includes progression and regression options for most exercises.',
          },
        ],
      },
    ],
    category: 'Exercise Modifications',
    tags: ['modifications', 'progressions', 'adaptations'],
  },
  {
    _id: '4',
    question: "How do I know if I'm progressing?",
    answer: [
      {
        children: [
          {
            text: "Progress can be measured in several ways: increased strength, improved range of motion, reduced pain levels, better movement quality, or simply feeling more confident with activities. Keep a simple log of your exercises and note any changes in how you feel. We'll assess your progress during follow-up appointments.",
          },
        ],
      },
    ],
    category: 'Progress Tracking',
    tags: ['progress', 'tracking', 'improvement'],
  },
  {
    _id: '5',
    question: 'What equipment do I need for home exercises?',
    answer: [
      {
        children: [
          {
            text: 'Most exercises can be done with minimal equipment. Basic items that are helpful include: resistance bands, a stability ball, light dumbbells (2-5kg), and a yoga mat. Many exercises use body weight or household items. Your specific program will list any required equipment.',
          },
        ],
      },
    ],
    category: 'Equipment',
    tags: ['equipment', 'home setup', 'tools'],
  },
  {
    _id: '6',
    question: 'How long until I see results?',
    answer: [
      {
        children: [
          {
            text: 'This varies depending on your condition and consistency with exercises. Generally, you may notice improved movement and reduced stiffness within 1-2 weeks. Strength gains typically become apparent after 4-6 weeks of consistent training. Pain reduction can vary widely - some people notice improvements quickly, others take longer.',
          },
        ],
      },
    ],
    category: 'Timeline',
    tags: ['results', 'timeline', 'expectations'],
  },
  {
    _id: '7',
    question: 'Can I continue my regular sports/activities?',
    answer: [
      {
        children: [
          {
            text: "This depends on your specific condition and the activity. Generally, we encourage staying active while modifying activities that aggravate your symptoms. Your movement assessment will identify which activities are safe to continue and which may need temporary modification. We'll work together to get you back to your preferred activities safely.",
          },
        ],
      },
    ],
    category: 'Activity Guidelines',
    tags: ['sports', 'activities', 'return to sport'],
  },
  {
    _id: '8',
    question: 'What if I miss several days of exercises?',
    answer: [
      {
        children: [
          {
            text: "Don't worry - life happens! Simply restart your program where you left off. You may need to reduce intensity slightly if you've had a break longer than a week. Consistency over perfection is key. If you're struggling to maintain your routine, let us know and we can help adjust your program.",
          },
        ],
      },
    ],
    category: 'Program Adherence',
    tags: ['consistency', 'missed sessions', 'routine'],
  },
  {
    _id: '9',
    question: 'How do I access new exercise videos?',
    answer: [
      {
        children: [
          {
            text: "New videos are added to the movement library monthly. You'll receive an email notification when new content is available. All videos are organized by body part, difficulty level, and exercise type to help you find what you need. Use the search function to quickly locate specific exercises.",
          },
        ],
      },
    ],
    category: 'Portal Usage',
    tags: ['videos', 'library', 'navigation'],
  },
  {
    _id: '10',
    question: 'When should I book a follow-up appointment?',
    answer: [
      {
        children: [
          {
            text: "We typically recommend follow-up appointments every 4-6 weeks initially, then less frequently as you progress. Book sooner if you experience new pain, have questions about your program, or feel you're not progressing as expected. You can book online through the portal or call our clinic directly.",
          },
        ],
      },
    ],
    category: 'Appointments',
    tags: ['follow-up', 'booking', 'scheduling'],
  },
  {
    _id: '11',
    question: 'Can family members use my exercise program?',
    answer: [
      {
        children: [
          {
            text: "Exercise programs are specifically designed for your individual needs based on your movement assessment. While some general exercises may be suitable for others, we don't recommend sharing personalized programs. Family members should have their own assessment to ensure exercises are appropriate and safe for them.",
          },
        ],
      },
    ],
    category: 'Program Sharing',
    tags: ['family', 'sharing', 'individual programs'],
  },
  {
    _id: '12',
    question: 'What should I do during a pain flare-up?',
    answer: [
      {
        children: [
          {
            text: "During acute flare-ups, focus on gentle movement and avoid activities that significantly increase pain. Use heat or ice as preferred, maintain good posture, and continue with gentle mobility exercises if tolerated. If the flare-up is severe or doesn't improve within 2-3 days, contact our clinic for guidance.",
          },
        ],
      },
    ],
    category: 'Pain Management',
    tags: ['flare-up', 'acute pain', 'management'],
  },
]

// Helper function to extract text from Sanity rich text
function getPlainText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return ''
  return richText
    .map(
      block => block.children?.map((child: any) => child.text).join('') || ''
    )
    .join(' ')
}

export function MemberFAQs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch('/api/faqs?status=published', {
          cache: 'no-store',
        })

        if (response.ok) {
          const data = await response.json()
          setFaqs(data)
        } else {
          console.warn('Failed to fetch FAQs, using fallback data')
          setFaqs(fallbackFAQs as FAQ[])
        }
      } catch (error) {
        console.warn('Error fetching FAQs, using fallback data:', error)
        setFaqs(fallbackFAQs as FAQ[])
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='h-10 bg-muted rounded-lg animate-pulse'></div>
          <div className='flex flex-wrap gap-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='h-8 w-24 bg-muted rounded-lg animate-pulse'
              ></div>
            ))}
          </div>
        </div>
        <div className='space-y-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className='h-32 bg-muted rounded-lg animate-pulse'
            ></div>
          ))}
        </div>
      </div>
    )
  }

  const displayFAQs = faqs.length > 0 ? faqs : (fallbackFAQs as FAQ[])

  const categories = [
    'All',
    ...Array.from(new Set(displayFAQs.map(faq => faq.category))),
  ]

  const filteredFAQs = displayFAQs.filter(faq => {
    const answerText = getPlainText(faq.answer).toLowerCase()
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answerText.includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <div className='space-y-6'>
      {/* Search and Filters */}
      <div className='space-y-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Search FAQs by question, answer, or topic...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>

        <div className='flex flex-wrap gap-2'>
          <span className='text-sm font-medium text-muted-foreground mr-2'>
            Category:
          </span>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className='text-sm text-muted-foreground'>
        Showing {filteredFAQs.length} of {displayFAQs.length} questions
      </div>

      {/* FAQ List */}
      <div className='space-y-4'>
        {filteredFAQs.map(faq => (
          <Card key={faq._id} className='transition-shadow hover:shadow-md'>
            <CardHeader
              className='cursor-pointer'
              onClick={() => toggleFAQ(faq._id)}
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <CardTitle className='text-lg leading-tight mb-2'>
                    {faq.question}
                  </CardTitle>
                  <div className='flex flex-wrap gap-1'>
                    <Badge variant='secondary' className='text-xs'>
                      {faq.category}
                    </Badge>
                    {faq.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant='outline' className='text-xs'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant='ghost' size='sm'>
                  {expandedFAQ === faq._id ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedFAQ === faq._id && (
              <CardContent className='pt-0'>
                <div className='prose prose-sm max-w-none text-muted-foreground'>
                  <p>{getPlainText(faq.answer)}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className='text-center py-12'>
          <Search className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No FAQs found</h3>
          <p className='text-muted-foreground'>
            Try adjusting your search terms or category filter to find what
            you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}
