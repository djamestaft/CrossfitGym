'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Testimonial {
  _id: string
  name: string
  role: string
  rating: number
  content: string
  featured?: boolean
  imageUrl?: string
  imageAlt?: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    _id: '1',
    name: 'Sarah Mitchell',
    role: 'Office Manager, Geelong West',
    rating: 5,
    content:
      'The FMS assessment completely changed how I approach exercise. I was struggling with chronic shoulder pain from years of desk work. The team identified specific movement patterns that were causing my issues and created a personalized program that actually worked.',
    featured: true,
  },
  {
    _id: '2',
    name: 'Mark Thompson',
    role: 'Marathon Runner, Newtown',
    rating: 5,
    content:
      'After my back injury, I thought my running days were over. The GMC team not only got me back to running but helped me understand how to prevent future injuries. Their approach is professional, evidence-based, and genuinely caring.',
    featured: true,
  },
  {
    _id: '3',
    name: 'Jenny Liu',
    role: 'New Mother, Belmont',
    rating: 5,
    content:
      'Pregnancy and childbirth left me with significant core weakness and back pain. The movement plan they created was perfect for my situation as a new mum - realistic, effective, and something I could do at home with my baby nearby.',
  },
  {
    _id: '4',
    name: 'David Chen',
    role: 'Tradesman, Highton',
    rating: 5,
    content:
      'Working in construction, my body takes a beating. The team taught me how to move properly and gave me exercises I could do on-site during breaks. My chronic hip pain is gone and I feel stronger than I have in years.',
  },
  {
    _id: '5',
    name: 'Lisa Anderson',
    role: 'Teacher, Torquay',
    rating: 5,
    content:
      "As a teacher, I'm on my feet all day and was developing knee problems. The FMS assessment revealed issues with my movement patterns that I never would have noticed. The corrective exercises have made such a difference.",
  },
  {
    _id: '6',
    name: 'Robert Williams',
    role: 'Retiree, Ocean Grove',
    rating: 5,
    content:
      "At 68, I thought stiffness and pain were just part of aging. The GMC team showed me that wasn't true. Their gentle approach and clear explanations helped me regain mobility I thought I'd lost forever. I'm now more active than I've been in decades.",
  },
]

interface TestimonialsProps {
  showAll?: boolean
  maxItems?: number
}

export function Testimonials({
  showAll = false,
  maxItems = 3,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials', {
          cache: 'no-store',
        })

        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        } else {
          console.warn('Failed to fetch testimonials, using fallback data')
          setTestimonials(fallbackTestimonials)
        }
      } catch (error) {
        console.warn('Error fetching testimonials, using fallback data:', error)
        setTestimonials(fallbackTestimonials)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials
  const displayedTestimonials = showAll
    ? displayTestimonials
    : displayTestimonials.slice(0, maxItems)

  useEffect(() => {
    if (!isAutoPlaying || showAll) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayedTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, displayedTestimonials.length, showAll])

  if (loading) {
    return (
      <div
        className={
          showAll ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'relative'
        }
      >
        {Array.from({ length: showAll ? 3 : maxItems }).map((_, index) => (
          <div key={index} className='animate-pulse'>
            <div className='bg-muted rounded-lg h-64'></div>
          </div>
        ))}
      </div>
    )
  }

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % displayedTestimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      prev =>
        (prev - 1 + displayedTestimonials.length) % displayedTestimonials.length
    )
    setIsAutoPlaying(false)
  }

  if (showAll) {
    return (
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {displayTestimonials.map(testimonial => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='overflow-hidden'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayedTestimonials.map(testimonial => (
            <div key={testimonial._id} className='w-full flex-shrink-0'>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {displayedTestimonials.length > 1 && (
        <>
          <Button
            variant='outline'
            size='icon'
            className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm'
            onClick={prevTestimonial}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm'
            onClick={nextTestimonial}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>

          <div className='flex justify-center mt-6 gap-2'>
            {displayedTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className='h-full'>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0'>
              {testimonial.imageUrl ? (
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.imageAlt || testimonial.name}
                  className='w-12 h-12 rounded-full object-cover'
                />
              ) : (
                <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center'>
                  <Quote className='h-6 w-6 text-primary' />
                </div>
              )}
            </div>
            <div className='flex-1'>
              <div className='flex mb-2'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className='h-4 w-4 fill-primary text-primary' />
                ))}
              </div>
              <h3 className='font-semibold'>{testimonial.name}</h3>
              <p className='text-sm text-muted-foreground'>
                {testimonial.role}
              </p>
            </div>
          </div>

          <blockquote className='text-sm leading-relaxed italic'>
            "{testimonial.content}"
          </blockquote>

          {testimonial.featured && (
            <div className='pt-2 border-t'>
              <Badge variant='default' className='text-xs'>
                Featured Story
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
