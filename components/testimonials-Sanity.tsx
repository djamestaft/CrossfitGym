import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star } from 'lucide-react'

interface SanityTestimonial {
  _id: string
  name: string
  content: string
  rating: number
  role?: string
  imageUrl?: string
  imageAlt?: string
}

interface TestimonialsProps {
  testimonials: SanityTestimonial[]
  showAll?: boolean
  maxItems?: number
}

export function SanityTestimonials({
  testimonials,
  showAll = false,
  maxItems = 3,
}: TestimonialsProps) {
  const displayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, maxItems)

  if (showAll) {
    return (
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {displayedTestimonials.map(testimonial => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='overflow-hidden'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {displayedTestimonials.map(testimonial => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: SanityTestimonial }) {
  return (
    <Card className='h-full'>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0'>
              <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center'>
                <Quote className='h-6 w-6 text-primary' />
              </div>
            </div>
            <div className='flex-1'>
              <div className='flex mb-2'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <h3 className='font-semibold'>{testimonial.name}</h3>
              {testimonial.role && (
                <p className='text-sm text-muted-foreground'>
                  {testimonial.role}
                </p>
              )}
            </div>
          </div>

          <blockquote className='text-sm leading-relaxed italic'>
            "{testimonial.content}"
          </blockquote>
        </div>
      </CardContent>
    </Card>
  )
}
