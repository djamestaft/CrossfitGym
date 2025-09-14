import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GraduationCap, Award, Clock, MapPin, Mail, Phone } from 'lucide-react'

interface Coach {
  id: string
  name: string
  title: string
  qualifications: string[]
  specializations: string[]
  experience: string
  bio: string
  image?: string
  email?: string
  phone?: string
  availableDays: string[]
}

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    title: 'Senior Physiotherapist & Movement Specialist',
    qualifications: [
      'Bachelor of Physiotherapy (Hons)',
      'Master of Sports Physiotherapy',
      'Certified FMS Level 2',
      'Dry Needling Certification',
    ],
    specializations: [
      'Shoulder & Neck Pain',
      'Workplace Ergonomics',
      "Women's Health",
      'Postural Correction',
    ],
    experience: '12 years',
    bio: 'Dr. Sarah Mitchell brings over a decade of experience in movement therapy and rehabilitation. She specializes in helping office workers and new mothers overcome pain and movement limitations through evidence-based treatment approaches. Sarah is passionate about educating clients on proper movement patterns and has helped hundreds of people in Geelong return to pain-free living.',
    image: '/coach-sarah.jpg',
    email: 'sarah@geelongmovement.com',
    phone: '(03) 5234 5679',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
  },
  {
    id: '2',
    name: 'Dr. Mark Thompson',
    title: 'Sports Physiotherapist & Rehabilitation Specialist',
    qualifications: [
      'Bachelor of Exercise Science',
      'Master of Physiotherapy',
      'Sports Medicine Australia Certification',
      'Certified Strength & Conditioning Specialist',
    ],
    specializations: [
      'Sports Injuries',
      'Lower Back Pain',
      'Return to Sport Programs',
      'Strength & Conditioning',
    ],
    experience: '15 years',
    bio: 'Dr. Mark Thompson has extensive experience working with athletes and active individuals. His background in both exercise science and physiotherapy allows him to create comprehensive rehabilitation programs that not only address current injuries but also prevent future problems. Mark has worked with local sports teams and is known for his practical, results-driven approach to movement therapy.',
    image: '/coach-mark.jpg',
    email: 'mark@geelongmovement.com',
    phone: '(03) 5234 5680',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
  },
  {
    id: '3',
    name: 'Dr. Emma Rodriguez',
    title: 'Musculoskeletal Physiotherapist',
    qualifications: [
      'Bachelor of Physiotherapy',
      'Graduate Certificate in Manual Therapy',
      'Pilates Instructor Certification',
      'Pain Science Specialist',
    ],
    specializations: [
      'Chronic Pain Management',
      'Hip & Knee Conditions',
      'Movement Re-education',
      'Clinical Pilates',
    ],
    experience: '8 years',
    bio: 'Dr. Emma Rodriguez specializes in complex musculoskeletal conditions and chronic pain management. Her gentle yet effective approach combines manual therapy techniques with movement re-education to help clients achieve lasting results. Emma is particularly skilled at working with clients who have had previous unsuccessful treatments, using her expertise in pain science to develop innovative solutions.',
    image: '/coach-emma.jpg',
    email: 'emma@geelongmovement.com',
    phone: '(03) 5234 5681',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
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
  const displayedCoaches = showAll ? coaches : coaches.slice(0, maxItems)

  if (layout === 'list') {
    return (
      <div className='space-y-8'>
        {displayedCoaches.map(coach => (
          <CoachCard key={coach.id} coach={coach} layout='list' />
        ))}
      </div>
    )
  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {displayedCoaches.map(coach => (
        <CoachCard key={coach.id} coach={coach} layout='grid' />
      ))}
    </div>
  )
}

function CoachCard({
  coach,
  layout,
}: {
  coach: Coach
  layout: 'grid' | 'list'
}) {
  if (layout === 'list') {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='space-y-4'>
              <div className='w-32 h-32 bg-muted rounded-lg mx-auto md:mx-0 flex items-center justify-center'>
                <div className='text-4xl font-bold text-primary'>
                  {coach.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
              </div>
              <div className='text-center md:text-left'>
                <h3 className='font-bold text-lg'>{coach.name}</h3>
                <p className='text-sm text-muted-foreground mb-2'>
                  {coach.title}
                </p>
                <div className='flex items-center gap-1 justify-center md:justify-start mb-1'>
                  <Clock className='h-3 w-3 text-muted-foreground' />
                  <span className='text-xs text-muted-foreground'>
                    {coach.experience} experience
                  </span>
                </div>
                <div className='flex items-center gap-1 justify-center md:justify-start'>
                  <MapPin className='h-3 w-3 text-muted-foreground' />
                  <span className='text-xs text-muted-foreground'>
                    Available {coach.availableDays.length} days/week
                  </span>
                </div>
              </div>
            </div>

            <div className='md:col-span-2 space-y-4'>
              <p className='text-sm leading-relaxed'>{coach.bio}</p>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <h4 className='font-semibold text-sm mb-2 flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4' />
                    Qualifications
                  </h4>
                  <ul className='space-y-1'>
                    {coach.qualifications.map((qual, index) => (
                      <li key={index} className='text-xs text-muted-foreground'>
                        • {qual}
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
                    {coach.specializations.map((spec, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 pt-2'>
                {coach.email && (
                  <Button variant='outline' size='sm' asChild>
                    <a href={`mailto:${coach.email}`}>
                      <Mail className='mr-2 h-3 w-3' />
                      Email
                    </a>
                  </Button>
                )}
                {coach.phone && (
                  <Button variant='outline' size='sm' asChild>
                    <a href={`tel:${coach.phone}`}>
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
        <div className='w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center'>
          <div className='text-2xl font-bold text-primary'>
            {coach.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </div>
        </div>
        <CardTitle className='text-lg'>{coach.name}</CardTitle>
        <p className='text-sm text-muted-foreground'>{coach.title}</p>
        <div className='flex items-center gap-1 justify-center'>
          <Clock className='h-3 w-3 text-muted-foreground' />
          <span className='text-xs text-muted-foreground'>
            {coach.experience} experience
          </span>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm leading-relaxed'>
          {coach.bio.substring(0, 150)}...
        </p>

        <div>
          <h4 className='font-semibold text-sm mb-2 flex items-center gap-2'>
            <Award className='h-4 w-4' />
            Specializations
          </h4>
          <div className='flex flex-wrap gap-1'>
            {coach.specializations.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant='outline' className='text-xs'>
                {spec}
              </Badge>
            ))}
            {coach.specializations.length > 3 && (
              <Badge variant='outline' className='text-xs'>
                +{coach.specializations.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className='flex gap-2 pt-2'>
          {coach.email && (
            <Button
              variant='outline'
              size='sm'
              className='flex-1 bg-transparent'
              asChild
            >
              <a href={`mailto:${coach.email}`}>
                <Mail className='mr-2 h-3 w-3' />
                Email
              </a>
            </Button>
          )}
          {coach.phone && (
            <Button
              variant='outline'
              size='sm'
              className='flex-1 bg-transparent'
              asChild
            >
              <a href={`tel:${coach.phone}`}>
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
