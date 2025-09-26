import { SanityTestimonials } from '@/components/testimonials-Sanity'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { client } from '@/sanity/lib/client'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Geelong Movement Co',
  description:
    'Meet our qualified physiotherapists and learn about our commitment to safe, evidence-based movement therapy in Geelong.',
  openGraph: {
    title: 'About Us | Geelong Movement Co',
    description:
      'Expert physiotherapists committed to helping you move freely and without pain.',
  },
}

export default async function AboutPage() {
  const testimonials =
    await client.fetch(`*[_type == "testimonial"] | order(featured desc, _createdAt desc) {
    _id,
    name,
    content,
    rating,
    role,
    featured,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`)

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <section className='bg-gradient-to-b from-muted to-background py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-6'>
            <Badge variant='secondary' className='mb-4'>
              About GMC
            </Badge>
            <h1 className='text-4xl md:text-6xl font-bold text-balance'>
              Expert Care, <span className='text-primary'>Proven Results</span>
            </h1>
            <p className='text-xl text-muted-foreground text-balance max-w-2xl mx-auto'>
              Meet our qualified team of physiotherapists and learn about our
              commitment to safe, evidence-based movement therapy.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Meet Our Expert Team</h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Our qualified physiotherapists bring decades of combined
              experience in movement therapy and rehabilitation.
            </p>
          </div>
          {/* Team component will be added here */}
        </div>
      </section>

      {/* Safety & Standards */}
      <section className='py-16 bg-muted'>
        <div className='container mx-auto px-4'>
          {/* Safety component will be added here */}
        </div>
      </section>

      {/* Client Success Stories */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Client Success Stories</h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Real results from real people who have transformed their movement
              and quality of life.
            </p>
          </div>
          <SanityTestimonials testimonials={testimonials} showAll={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-primary text-primary-foreground'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center space-y-6'>
            <h2 className='text-3xl font-bold'>
              Ready to Start Your Movement Journey?
            </h2>
            <p className='text-xl opacity-90'>
              Book your free FMS assessment with our expert team and take the
              first step towards pain-free movement.
            </p>
            <Button size='lg' variant='secondary' asChild>
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
