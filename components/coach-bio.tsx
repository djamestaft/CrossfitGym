/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, Clock, GraduationCap, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Coach {
  _id: string
  name: string
  specialties: string[]
  experience?: number
  bio: any[]
  qualifications?: any[]
  achievements?: string[]
  imageUrl?: string
  imageAlt?: string
  active: boolean
  order: number
  socialMedia?: {
    linkedin?: string
    instagram?: string
    facebook?: string
    twitter?: string
  }
  contactPreferences?: {
    email?: string
    phone?: string
    preferredContact?: string
  }
  availability?: string[]
}

const fallbackCoaches: Coach[] = [
  {
    _id: '1',
    name: 'Dr. Sarah Mitchell',
    specialties: [
      'Shoulder & Neck Pain',
      'Workplace Ergonomics',
      "Women's Health",
      'Postural Correction',
    ],
    experience: 12,
    bio: [
      {
        children: [
          {
            text: 'Dr. Sarah Mitchell brings over a decade of experience in movement therapy and rehabilitation. She specializes in helping office workers and new mothers overcome pain and movement limitations through evidence-based treatment approaches.',
          },
        ],
      },
    ],
    qualifications: [
      {
        certification: 'Bachelor of Physiotherapy (Hons)',
        issuer: 'University of Melbourne',
        year: 2011,
      },
      {
        certification: 'Master of Sports Physiotherapy',
        issuer: 'La Trobe University',
        year: 2014,
      },
    ],
    achievements: [
      'Published researcher in movement therapy',
      '1000+ successful patient outcomes',
    ],
    active: true,
    order: 1,
    contactPreferences: {
      email: 'sarah@geelongmovement.com',
      phone: '(03) 5234 5679',
      preferredContact: 'email',
    },
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
  },
  {
    _id: '2',
    name: 'Dr. Mark Thompson',
    specialties: [
      'Sports Injuries',
      'Lower Back Pain',
      'Return to Sport Programs',
      'Strength & Conditioning',
    ],
    experience: 15,
    bio: [
      {
        children: [
          {
            text: 'Dr. Mark Thompson has extensive experience working with athletes and active individuals. His background in both exercise science and physiotherapy allows him to create comprehensive rehabilitation programs.',
          },
        ],
      },
    ],
    qualifications: [
      {
        certification: 'Bachelor of Exercise Science',
        issuer: 'Deakin University',
        year: 2008,
      },
      {
        certification: 'Master of Physiotherapy',
        issuer: 'University of Melbourne',
        year: 2010,
      },
    ],
    achievements: [
      'Worked with elite sports teams',
      'Specialized in sports rehabilitation',
    ],
    active: true,
    order: 2,
    contactPreferences: {
      email: 'mark@geelongmovement.com',
      phone: '(03) 5234 5680',
      preferredContact: 'phone',
    },
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
  },
  {
    _id: '3',
    name: 'Dr. Emma Rodriguez',
    specialties: [
      'Chronic Pain Management',
      'Hip & Knee Conditions',
      'Movement Re-education',
      'Clinical Pilates',
    ],
    experience: 8,
    bio: [
      {
        children: [
          {
            text: 'Dr. Emma Rodriguez specializes in complex musculoskeletal conditions and chronic pain management. Her gentle yet effective approach combines manual therapy techniques with movement re-education.',
          },
        ],
      },
    ],
    qualifications: [
      {
        certification: 'Bachelor of Physiotherapy',
        issuer: 'Monash University',
        year: 2015,
      },
      {
        certification: 'Graduate Certificate in Manual Therapy',
        issuer: 'Australian Physiotherapy Association',
        year: 2017,
      },
    ],
    achievements: ['Pain science specialist', 'Expert in complex cases'],
    active: true,
    order: 3,
    contactPreferences: {
      email: 'emma@geelongmovement.com',
      phone: '(03) 5234 5681',
      preferredContact: 'email',
    },
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
  },
]

interface CoachBioProps {
  showAll?: boolean
  maxItems?: number
  layout?: 'grid' | 'list'
}

export function CoachBio({
  showAll = false,
  maxItems = 3,
  layout = 'grid',
}: CoachBioProps) {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCoaches() {
      try {
        const response = await fetch('/api/coaches?active=true', {
          cache: 'no-store',
        })

        if (response.ok) {
          const data = await response.json()
          setCoaches(data)
        } else {
          console.warn('Failed to fetch coaches, using fallback data')
          setCoaches(fallbackCoaches)
        }
      } catch (error) {
        console.warn('Error fetching coaches, using fallback data:', error)
        setCoaches(fallbackCoaches)
      } finally {
        setLoading(false)
      }
    }

    fetchCoaches()
  }, [])

  if (loading) {
    return (
      <div
        className={
          layout === 'list'
            ? 'space-y-8'
            : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
        }
      >
        {Array.from({ length: showAll ? 3 : maxItems }).map((_, index) => (
          <div key={index} className='animate-pulse'>
            <div className='bg-muted rounded-lg h-96'></div>
          </div>
        ))}
      </div>
    )
  }

  const displayCoaches = coaches.length > 0 ? coaches : fallbackCoaches
  const displayedCoaches = showAll
    ? displayCoaches
    : displayCoaches.slice(0, maxItems)

  if (layout === 'list') {
    return (
      <div className='space-y-8'>
        {displayedCoaches.map(coach => (
          <CoachCard key={coach._id} coach={coach} layout='list' />
        ))}
      </div>
    )
  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {displayedCoaches.map(coach => (
        <CoachCard key={coach._id} coach={coach} layout='grid' />
      ))}
    </div>
  )
}

// Helper function to extract text from Sanity rich text
function getPlainText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return ''
  return richText
    .map(
      block => block.children?.map((child: any) => child.text).join('') || ''
    )
    .join(' ')
}

function CoachCard({
  coach,
  layout,
}: {
  coach: Coach
  layout: 'grid' | 'list'
}) {
  const bioText = getPlainText(coach.bio)
  const email = coach.contactPreferences?.email
  const phone = coach.contactPreferences?.phone
  const availability = coach.availability || []
  const experience = coach.experience
    ? `${coach.experience} years`
    : 'Experience available'

  if (layout === 'list') {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='space-y-4'>
              <div className='w-32 h-32 bg-muted rounded-lg mx-auto md:mx-0 flex items-center justify-center overflow-hidden'>
                {coach.imageUrl ? (
                  <img
                    src={coach.imageUrl}
                    alt={coach.imageAlt || coach.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='text-4xl font-bold text-primary'>
                    {coach.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                )}
              </div>
              <div className='text-center md:text-left'>
                <h3 className='font-bold text-lg'>{coach.name}</h3>
                <p className='text-sm text-muted-foreground mb-2'>
                  Physiotherapist
                </p>
                <div className='flex items-center gap-1 justify-center md:justify-start mb-1'>
                  <Clock className='h-3 w-3 text-muted-foreground' />
                  <span className='text-xs text-muted-foreground'>
                    {experience}
                  </span>
                </div>
                <div className='flex items-center gap-1 justify-center md:justify-start'>
                  <MapPin className='h-3 w-3 text-muted-foreground' />
                  <span className='text-xs text-muted-foreground'>
                    Available {availability.length} days/week
                  </span>
                </div>
              </div>
            </div>

            <div className='md:col-span-2 space-y-4'>
              <p className='text-sm leading-relaxed'>{bioText}</p>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <h4 className='font-semibold text-sm mb-2 flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4' />
                    Qualifications
                  </h4>
                  <ul className='space-y-1'>
                    {coach.qualifications?.map((qual, index) => (
                      <li key={index} className='text-xs text-muted-foreground'>
                        • {qual.certification} ({qual.issuer})
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold text-sm mb-2 flex items-center gap-2'>
                    <Award className='h-4 w-4' />
                    Specializations
                  </h4>
                  <div className='flex flex-wrap gap-1'>
                    {coach.specialties.map((spec, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 pt-2'>
                {email && (
                  <Button variant='outline' size='sm' asChild>
                    <a href={`mailto:${email}`}>
                      <Mail className='mr-2 h-3 w-3' />
                      Email
                    </a>
                  </Button>
                )}
                {phone && (
                  <Button variant='outline' size='sm' asChild>
                    <a href={`tel:${phone}`}>
                      <Phone className='mr-2 h-3 w-3' />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='h-full'>
      <CardHeader className='text-center'>
        <div className='w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden'>
          {coach.imageUrl ? (
            <img
              src={coach.imageUrl}
              alt={coach.imageAlt || coach.name}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='text-2xl font-bold text-primary'>
              {coach.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>
          )}
        </div>
        <CardTitle className='text-lg'>{coach.name}</CardTitle>
        <p className='text-sm text-muted-foreground'>Physiotherapist</p>
        <div className='flex items-center gap-1 justify-center'>
          <Clock className='h-3 w-3 text-muted-foreground' />
          <span className='text-xs text-muted-foreground'>{experience}</span>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm leading-relaxed'>
          {bioText.substring(0, 150)}...
        </p>

        <div>
          <h4 className='font-semibold text-sm mb-2 flex items-center gap-2'>
            <Award className='h-4 w-4' />
            Specializations
          </h4>
          <div className='flex flex-wrap gap-1'>
            {coach.specialties.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant='outline' className='text-xs'>
                {spec}
              </Badge>
            ))}
            {coach.specialties.length > 3 && (
              <Badge variant='outline' className='text-xs'>
                +{coach.specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className='flex gap-2 pt-2'>
          {email && (
            <Button
              variant='outline'
              size='sm'
              className='flex-1 bg-transparent'
              asChild
            >
              <a href={`mailto:${email}`}>
                <Mail className='mr-2 h-3 w-3' />
                Email
              </a>
            </Button>
          )}
          {phone && (
            <Button
              variant='outline'
              size='sm'
              className='flex-1 bg-transparent'
              asChild
            >
              <a href={`tel:${phone}`}>
                <Phone className='mr-2 h-3 w-3' />
                Call
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
