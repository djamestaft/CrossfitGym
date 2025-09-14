import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Clock, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Assessment Booked Successfully | Geelong Movement Co',
  description:
    'Your FMS assessment has been booked. We will contact you within 1 business day to confirm your appointment.',
}

export default function FMSSuccessPage() {
  return (
    <div className='min-h-screen bg-background py-12'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto text-center space-y-8'>
          <div className='space-y-4'>
            <CheckCircle className='h-20 w-20 text-primary mx-auto' />
            <h1 className='text-4xl font-bold'>Assessment Booked!</h1>
            <p className='text-xl text-muted-foreground'>
              Thank you for choosing Geelong Movement Co. We're excited to help
              you move freely again.
            </p>
          </div>

          <Card>
            <CardContent className='pt-6 space-y-6'>
              <h2 className='text-2xl font-semibold'>What Happens Next?</h2>

              <div className='space-y-4 text-left'>
                <div className='flex gap-4'>
                  <Phone className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold'>We'll Call You</h3>
                    <p className='text-muted-foreground'>
                      Our team will contact you within 1 business day to confirm
                      your preferred appointment time.
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <Clock className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold'>45-Minute Assessment</h3>
                    <p className='text-muted-foreground'>
                      Your comprehensive FMS evaluation will identify movement
                      limitations and create your personalized plan.
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <CheckCircle className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold'>
                      Personalized Movement Plan
                    </h3>
                    <p className='text-muted-foreground'>
                      Leave with a clear understanding of your movement patterns
                      and a plan to train around any limitations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='bg-muted p-6 rounded-lg'>
            <h3 className='font-semibold mb-3'>Prepare for Your Assessment</h3>
            <ul className='text-sm text-muted-foreground space-y-2 text-left'>
              <li>• Wear comfortable, loose-fitting clothing</li>
              <li>• Bring a water bottle</li>
              <li>• Arrive 10 minutes early for paperwork</li>
              <li>• Bring any relevant medical reports or scans</li>
            </ul>
          </div>

          <div className='space-y-4'>
            <p className='text-muted-foreground'>
              Questions about your appointment?
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button variant='outline' asChild>
                <Link href='tel:+61352345678'>Call Us: (03) 5234 5678</Link>
              </Button>
              <Button asChild>
                <Link href='/'>
                  Return to Home
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
