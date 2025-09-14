import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Award,
  Users,
  CheckCircle,
  FileText,
  Heart,
  Clock,
  MapPin,
} from 'lucide-react'

const safetyStandards = [
  {
    icon: Shield,
    title: 'Professional Registration',
    description:
      'All physiotherapists are registered with AHPRA (Australian Health Practitioner Regulation Agency)',
    details: [
      'Current AHPRA registration',
      'Professional indemnity insurance',
      'Continuing education requirements met',
    ],
  },
  {
    icon: Award,
    title: 'Evidence-Based Practice',
    description:
      'Our treatments are based on the latest research and clinical evidence',
    details: [
      'Peer-reviewed treatment protocols',
      'Regular clinical supervision',
      'Participation in professional development',
    ],
  },
  {
    icon: Users,
    title: 'Client-Centered Care',
    description:
      'Your safety, comfort, and individual needs are our top priority',
    details: [
      'Comprehensive health screening',
      'Informed consent process',
      'Regular progress monitoring',
    ],
  },
  {
    icon: Heart,
    title: 'Duty of Care',
    description:
      'We maintain the highest standards of professional care and ethics',
    details: [
      'Confidentiality protection',
      'Professional boundaries',
      'Emergency procedures in place',
    ],
  },
]

const certifications = [
  {
    name: 'AHPRA Registration',
    description: 'Australian Health Practitioner Regulation Agency',
    status: 'Current',
    color: 'bg-primary text-primary-foreground',
  },
  {
    name: 'Professional Indemnity',
    description: 'Comprehensive insurance coverage',
    status: 'Active',
    color: 'bg-secondary text-secondary-foreground',
  },
  {
    name: 'First Aid Certified',
    description: 'Current CPR and first aid training',
    status: 'Valid',
    color: 'bg-accent text-accent-foreground',
  },
  {
    name: 'Privacy Compliance',
    description: 'Australian Privacy Principles adherent',
    status: 'Compliant',
    color: 'bg-muted text-muted-foreground',
  },
]

const clinicInfo = {
  address: '123 Movement Street, Geelong VIC 3220',
  phone: '(03) 5234 5678',
  email: 'info@geelongmovement.com',
  hours: {
    weekdays: '7:00 AM - 7:00 PM',
    saturday: '8:00 AM - 4:00 PM',
    sunday: '10:00 AM - 2:00 PM',
  },
  emergencyProcedures:
    'Emergency protocols in place for all treatment sessions',
}

interface SafetyPanelProps {
  variant?: 'full' | 'compact'
}

export function SafetyPanel({ variant = 'full' }: SafetyPanelProps) {
  if (variant === 'compact') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Shield className='h-5 w-5 text-primary' />
            Safety & Standards
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-2'>
            {certifications.map((cert, index) => (
              <div key={index} className='text-center'>
                <Badge className={`${cert.color} text-xs mb-1`}>
                  {cert.status}
                </Badge>
                <p className='text-xs font-medium'>{cert.name}</p>
              </div>
            ))}
          </div>
          <div className='text-xs text-muted-foreground space-y-1'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-3 w-3 text-primary' />
              <span>AHPRA registered physiotherapists</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-3 w-3 text-primary' />
              <span>Evidence-based treatment protocols</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-3 w-3 text-primary' />
              <span>Comprehensive insurance coverage</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-8'>
      {/* Main Safety Standards */}
      <div>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold mb-4'>
            Your Safety is Our Priority
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            We maintain the highest professional standards to ensure you receive
            safe, effective, and ethical care.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {safetyStandards.map((standard, index) => {
            const IconComponent = standard.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className='flex items-center gap-3'>
                    <div className='p-2 bg-primary/10 rounded-lg'>
                      <IconComponent className='h-6 w-6 text-primary' />
                    </div>
                    {standard.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <p className='text-muted-foreground'>
                    {standard.description}
                  </p>
                  <ul className='space-y-1'>
                    {standard.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className='flex items-center gap-2 text-sm'
                      >
                        <CheckCircle className='h-4 w-4 text-primary flex-shrink-0' />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Professional Certifications & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {certifications.map((cert, index) => (
              <div key={index} className='text-center space-y-2'>
                <Badge className={`${cert.color} w-full justify-center`}>
                  {cert.status}
                </Badge>
                <div>
                  <p className='font-semibold text-sm'>{cert.name}</p>
                  <p className='text-xs text-muted-foreground'>
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinic Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <MapPin className='h-5 w-5' />
            Clinic Information & Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <h4 className='font-semibold mb-2'>Location & Contact</h4>
                <div className='space-y-2 text-sm text-muted-foreground'>
                  <div className='flex items-start gap-2'>
                    <MapPin className='h-4 w-4 mt-0.5 flex-shrink-0' />
                    <span>{clinicInfo.address}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center'>
                      📞
                    </span>
                    <a
                      href={`tel:${clinicInfo.phone}`}
                      className='hover:text-primary'
                    >
                      {clinicInfo.phone}
                    </a>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center'>
                      ✉️
                    </span>
                    <a
                      href={`mailto:${clinicInfo.email}`}
                      className='hover:text-primary'
                    >
                      {clinicInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='font-semibold mb-2 flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  Operating Hours
                </h4>
                <div className='space-y-1 text-sm text-muted-foreground'>
                  <div className='flex justify-between'>
                    <span>Monday - Friday:</span>
                    <span>{clinicInfo.hours.weekdays}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Saturday:</span>
                    <span>{clinicInfo.hours.saturday}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Sunday:</span>
                    <span>{clinicInfo.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <h4 className='font-semibold mb-2'>Emergency Procedures</h4>
                <p className='text-sm text-muted-foreground mb-3'>
                  {clinicInfo.emergencyProcedures}
                </p>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    <span>First aid trained staff on-site</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    <span>Emergency contact protocols</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <CheckCircle className='h-4 w-4 text-primary' />
                    <span>Clear evacuation procedures</span>
                  </div>
                </div>
              </div>

              <div className='bg-muted p-4 rounded-lg'>
                <h4 className='font-semibold mb-2 text-sm'>
                  Privacy & Confidentiality
                </h4>
                <p className='text-xs text-muted-foreground'>
                  Your personal health information is protected under Australian
                  Privacy Principles. We maintain strict confidentiality and
                  only share information with your explicit consent or as
                  required by law.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
