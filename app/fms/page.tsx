import type { Metadata } from 'next'
import { FMSForm } from '@/components/fms-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Activity,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Functional Movement Screen (FMS) Assessment | Geelong Movement Co',
  description:
    'Book your professional FMS assessment in Geelong. Identify movement limitations and develop a personalized plan to train around pain and move freely.',
  openGraph: {
    title: 'Functional Movement Screen Assessment | Geelong Movement Co',
    description:
      'Professional movement screening to help you train around pain and move freely again.',
  },
}

export default function FMSPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='bg-gradient-to-b from-muted to-background py-12 md:py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center space-y-6'>
            <Badge variant='secondary' className='mb-4'>
              Professional Movement Assessment
            </Badge>
            <h1 className='text-4xl md:text-6xl font-bold text-balance'>
              Train Around Pain,{' '}
              <span className='text-primary'>Move Freely Again</span>
            </h1>
            <p className='text-xl text-muted-foreground text-balance max-w-2xl mx-auto'>
              Our Functional Movement Screen identifies your unique movement
              patterns and limitations, creating a personalized plan to help you
              move without pain.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button size='lg' className='text-lg px-8' asChild>
                <a href='#assessment-form'>
                  Get Your Free Assessment
                  <ArrowRight className='ml-2 h-5 w-5' />
                </a>
              </Button>
              <p className='text-sm text-muted-foreground'>
                ✓ 45-minute comprehensive assessment ✓ Personalized movement
                plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Shield className='h-12 w-12 text-primary mx-auto mb-4' />
                <h3 className='font-semibold mb-2'>Qualified Professionals</h3>
                <p className='text-sm text-muted-foreground'>
                  Licensed physiotherapists with advanced movement training
                </p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Users className='h-12 w-12 text-primary mx-auto mb-4' />
                <h3 className='font-semibold mb-2'>500+ Clients Helped</h3>
                <p className='text-sm text-muted-foreground'>
                  Trusted by athletes, workers, and everyday people in Geelong
                </p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Activity className='h-12 w-12 text-primary mx-auto mb-4' />
                <h3 className='font-semibold mb-2'>Evidence-Based Methods</h3>
                <p className='text-sm text-muted-foreground'>
                  Using proven FMS protocols and movement science
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className='py-12 bg-muted'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-8'>
              What to Expect in Your Assessment
            </h2>
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div className='space-y-6'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold'>
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-2'>Movement History</h3>
                    <p className='text-muted-foreground'>
                      We'll discuss your goals, pain points, and movement
                      challenges
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold'>
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-2'>
                      7-Point Movement Screen
                    </h3>
                    <p className='text-muted-foreground'>
                      Comprehensive assessment of your fundamental movement
                      patterns
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold'>
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-2'>Personalized Plan</h3>
                    <p className='text-muted-foreground'>
                      Receive your custom movement program and next steps
                    </p>
                  </div>
                </div>
              </div>

              <div className='bg-background p-6 rounded-lg'>
                <div className='flex items-center gap-2 mb-4'>
                  <Clock className='h-5 w-5 text-primary' />
                  <span className='font-semibold'>45 minutes</span>
                </div>
                <h3 className='font-semibold mb-3'>Assessment Includes:</h3>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    Detailed movement analysis
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    Injury risk identification
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    Corrective exercise recommendations
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    Written movement plan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            What Our Clients Say
          </h2>
          <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
            <Card>
              <CardContent className='pt-6'>
                <div className='flex mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-primary text-primary'
                    />
                  ))}
                </div>
                <p className='text-sm mb-4'>
                  "The FMS assessment completely changed how I approach
                  exercise. No more back pain during workouts!"
                </p>
                <div className='text-sm'>
                  <p className='font-semibold'>Sarah M.</p>
                  <p className='text-muted-foreground'>Office Worker</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='pt-6'>
                <div className='flex mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-primary text-primary'
                    />
                  ))}
                </div>
                <p className='text-sm mb-4'>
                  "Professional, thorough, and genuinely caring. They helped me
                  get back to running pain-free."
                </p>
                <div className='text-sm'>
                  <p className='font-semibold'>Mark T.</p>
                  <p className='text-muted-foreground'>Runner</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='pt-6'>
                <div className='flex mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-primary text-primary'
                    />
                  ))}
                </div>
                <p className='text-sm mb-4'>
                  "The movement plan they created has made such a difference. I
                  feel stronger and more confident."
                </p>
                <div className='text-sm'>
                  <p className='font-semibold'>Jenny L.</p>
                  <p className='text-muted-foreground'>New Mum</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section id='assessment-form' className='py-12 bg-muted'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold mb-4'>
              Book Your Free FMS Assessment
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Take the first step towards pain-free movement. Our team will
              contact you within 1 business day to schedule your assessment.
            </p>
          </div>
          <FMSForm />
        </div>
      </section>

      {/* Related Content */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-2xl font-bold mb-6'>
              Learn More About Movement Health
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              <Card className='text-left'>
                <CardContent className='pt-6'>
                  <h3 className='font-semibold mb-2'>
                    Understanding Shoulder Pain
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Common causes and movement solutions for shoulder discomfort
                  </p>
                  <Button variant='outline' size='sm' asChild>
                    <Link href='/hubs/shoulder'>
                      Read More
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className='text-left'>
                <CardContent className='pt-6'>
                  <h3 className='font-semibold mb-2'>
                    Low Back Pain Solutions
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Evidence-based approaches to managing and preventing back
                    pain
                  </p>
                  <Button variant='outline' size='sm' asChild>
                    <Link href='/hubs/low-back'>
                      Read More
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
