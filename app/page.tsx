import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Activity,
  Users,
  Clock,
  CheckCircle,
  Star,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section 1*/}
      <section className='bg-gradient-to-b from-secondary to-background py-16 md:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto text-center space-y-6 md:space-y-8'>
            <Badge variant='secondary' className='mb-4'>
              Geelong's Movement Specialists
            </Badge>
            <h1 className='text-5xl md:text-7xl font-bold text-balance text-foreground'>
              Train Around Pain, Move Freely Again
            </h1>
            <p className='text-lg md:text-xl text-muted-foreground text-balance max-w-3xl mx-auto px-4'>
              Professional movement therapy and functional movement screening in
              Geelong. Expert physiotherapy and exercise rehabilitation to help
              you move without limitations.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center px-4'>
              <Button
                size='lg'
                className='text-lg px-8 bg-primary hover:bg-primary/90'
                asChild
              >
                <Link href='/fms'>
                  Get Your Free Assessment
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
              <p className='text-sm text-slate-500'>
                ✓ No obligation ✓ 45-minute comprehensive evaluation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className='py-16 md:py-20 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12 px-4'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
              How We Help You Move Better
            </h2>
            <p className='text-base md:text-lg text-muted-foreground max-w-2xl mx-auto'>
              Our evidence-based approach identifies your unique movement
              patterns and creates personalized solutions.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4'>
            <Card className='text-center border-border shadow-sm hover:shadow-md transition-shadow'>
              <CardContent className='pt-6 md:pt-8 px-4'>
                <Activity className='h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 md:mb-6' />
                <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground'>
                  Functional Movement Screen
                </h3>
                <p className='text-muted-foreground mb-4 md:mb-6 text-sm md:text-base'>
                  Comprehensive 7-point assessment to identify movement
                  limitations and injury risks.
                </p>
                <Button
                  variant='outline'
                  className='border-primary text-primary hover:bg-primary/10 bg-transparent font-medium'
                  asChild
                >
                  <Link href='/fms'>
                    Learn More
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className='text-center border-border shadow-sm hover:shadow-md transition-shadow'>
              <CardContent className='pt-6 md:pt-8 px-4'>
                <Users className='h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 md:mb-6' />
                <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground'>
                  Personalized Therapy
                </h3>
                <p className='text-muted-foreground mb-4 md:mb-6 text-sm md:text-base'>
                  One-on-one treatment plans tailored to your specific needs and
                  goals.
                </p>
                <Button
                  variant='outline'
                  className='border-primary text-primary hover:bg-primary/10 bg-transparent font-medium'
                  asChild
                >
                  <Link href='/timetable'>
                    View Schedule
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className='text-center border-border shadow-sm hover:shadow-md transition-shadow'>
              <CardContent className='pt-6 md:pt-8 px-4'>
                <Clock className='h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 md:mb-6' />
                <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground'>
                  Ongoing Support
                </h3>
                <p className='text-muted-foreground mb-4 md:mb-6 text-sm md:text-base'>
                  Access to movement resources and ongoing guidance through our
                  member portal.
                </p>
                <Button
                  variant='outline'
                  className='border-primary text-primary hover:bg-primary/10 bg-transparent font-medium'
                  asChild
                >
                  <Link href='/portal'>
                    Member Portal
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className='py-16 md:py-20 bg-secondary'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12 px-4'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
              Trusted by 500+ Geelong Residents
            </h2>
            <div className='flex justify-center items-center gap-2 mb-8 flex-wrap'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='h-5 w-5 fill-primary text-primary' />
                ))}
              </div>
              <span className='text-muted-foreground'>4.9/5 from 127 reviews</span>
            </div>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4'>
            <Card className='border-border shadow-sm hover:shadow-md transition-shadow'>
              <CardContent className='pt-6 px-4'>
                <div className='flex mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-primary text-primary'
                    />
                  ))}
                </div>
                <p className='text-sm mb-4 text-muted-foreground'>
                  "The team at GMC completely transformed my approach to
                  fitness. No more shoulder pain during workouts!"
                </p>
                <div className='text-sm'>
                  <p className='font-semibold text-foreground'>Sarah Mitchell</p>
                  <p className='text-muted-foreground'>Office Manager</p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border shadow-sm hover:shadow-md transition-shadow'>
              <CardContent className='pt-6 px-4'>
                <div className='flex mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-primary text-primary'
                    />
                  ))}
                </div>
                <p className='text-sm mb-4 text-muted-foreground'>
                  "Professional, caring, and incredibly knowledgeable. They
                  helped me get back to running after my back injury."
                </p>
                <div className='text-sm'>
                  <p className='font-semibold text-foreground'>Mark Thompson</p>
                  <p className='text-muted-foreground'>Marathon Runner</p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border shadow-sm hover:shadow-md transition-shadow'>
              <CardContent className='pt-6 px-4'>
                <div className='flex mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-primary text-primary'
                    />
                  ))}
                </div>
                <p className='text-sm mb-4 text-muted-foreground'>
                  "The FMS assessment was eye-opening. The personalized plan has
                  made such a difference to my daily comfort."
                </p>
                <div className='text-sm'>
                  <p className='font-semibold text-foreground'>Jenny Liu</p>
                  <p className='text-muted-foreground'>New Mother</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access to Timetable */}
      <section className='py-16 md:py-20 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto px-4'>
            <Card className='bg-primary-gradient border-0 shadow-lg'>
              <CardContent className='pt-8 pb-8 px-6'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                  <div className='text-center md:text-left'>
                    <div className='flex items-center gap-2 mb-2 justify-center md:justify-start'>
                      <Calendar className='h-6 w-6 text-primary-foreground' />
                      <h3 className='text-2xl font-bold text-primary-foreground'>
                        View Our Class Schedule
                      </h3>
                    </div>
                    <p className='text-primary-foreground'>
                      Check availability and book your spot in our movement
                      classes and workshops.
                    </p>
                  </div>
                  <Button
                    size='lg'
                    variant='secondary'
                    className='bg-white text-primary hover:bg-slate-50 font-medium'
                    asChild
                  >
                    <Link href='/timetable'>
                      View Timetable
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 md:py-20 bg-secondary'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl mx-auto text-center space-y-6 md:space-y-8 px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
              Ready to Move Without Limitations?
            </h2>
            <p className='text-lg md:text-xl text-muted-foreground'>
              Book your free Functional Movement Screen assessment today. Our
              team will contact you within 1 business day.
            </p>
            <div className='space-y-6'>
              <Button
                size='lg'
                className='text-lg px-8 bg-primary hover:bg-primary/90 font-medium'
                asChild
              >
                <Link href='/fms'>
                  Book Your Free Assessment
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
              <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-primary' />
                  No obligation
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-primary' />
                  45-minute assessment
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-primary' />
                  Personalized plan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
