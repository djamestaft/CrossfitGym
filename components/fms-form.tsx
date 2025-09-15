'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, ArrowLeft, CheckCircle, Shield } from 'lucide-react'
import { Turnstile } from '@/components/turnstile'

interface FormData {
  // Step 1
  name: string
  email: string
  phone: string
  preferredTime: string

  // Step 2
  goals: string
  injuryFlags: string[]
  experience: string
}

const STORAGE_KEY = 'fms_form_data'

export function FMSForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formStartTime] = useState(Date.now())
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  // Load saved form data from localStorage on mount
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window === 'undefined') {
      return {
        name: '',
        email: '',
        phone: '',
        preferredTime: '',
        goals: '',
        injuryFlags: [],
        experience: '',
      }
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            email: '',
            phone: '',
            preferredTime: '',
            goals: '',
            injuryFlags: [],
            experience: '',
          }
    } catch {
      return {
        name: '',
        email: '',
        phone: '',
        preferredTime: '',
        goals: '',
        injuryFlags: [],
        experience: '',
      }
    }
  })

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  // Clear localStorage after successful submission
  useEffect(() => {
    if (isSubmitted) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [isSubmitted])

  // Track form abandonment on component unmount
  useEffect(() => {
    return () => {
      // Only track abandonment if form was started but not submitted
      if (!isSubmitted && (formData.name || formData.email || formData.phone)) {
        const timeSpent = Math.floor((Date.now() - formStartTime) / 1000)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'fms_form_abandon', {
            event_category: 'engagement',
            event_label: `abandoned_step_${step}`,
            value: timeSpent,
            custom_parameters: {
              form_id: 'fms_assessment',
              step_number: step,
              time_spent_seconds: timeSpent,
            },
          })
        }
      }
    }
  }, [
    isSubmitted,
    formData.name,
    formData.email,
    formData.phone,
    step,
    formStartTime,
  ])

  // Track form start when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'fms_form_start', {
        event_category: 'engagement',
        event_label: 'fms_conversion_funnel',
        custom_parameters: {
          form_id: 'fms_assessment',
          form_version: '2.0',
          page_location: window.location.href,
        },
      })
    }
  }, [])

  // Track step completion
  useEffect(() => {
    if (step === 2 && formData.name && formData.email && formData.phone) {
      // Step 1 completed
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'fms_form_step_complete', {
          event_category: 'engagement',
          event_label: 'step_1_complete',
          value: 1,
          custom_parameters: {
            form_id: 'fms_assessment',
            step_number: 1,
            fields_completed: 3,
          },
        })
      }
    }
  }, [step, formData.name, formData.email, formData.phone])

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-+()]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.goals.trim()) {
      newErrors.goals = 'Please tell us about your goals'
    }

    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
      // GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'fms_start', {
          event_category: 'engagement',
          event_label: 'FMS Form Step 2',
        })
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return

    // Check if Turnstile token is available
    if (!turnstileToken) {
      setErrors({ submit: 'Please complete the security check' })
      return
    }

    setIsSubmitting(true)

    try {
      // Submit form to API with Turnstile token
      const response = await fetch('/api/fms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, turnstileToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed')
      }

      // GA4 event for successful submission
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'fms_form_submit', {
          event_category: 'conversion',
          event_label: 'fms_lead_generated',
          value: 1,
          custom_parameters: {
            form_id: 'fms_assessment',
            submission_id: data.submissionId,
            fitness_goal: formData.experience,
            experience_level: formData.experience,
            time_to_complete: Math.floor((Date.now() - formStartTime) / 1000),
            fields_completed: 7,
            preferred_time: formData.preferredTime,
          },
        })
      }

      setIsSubmitted(true)
    } catch (error) {
      // Error logged for debugging in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Form submission error:', error)
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'

      setErrors({ submit: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInjuryFlagChange = (flag: string, checked: boolean) => {
    setFormData(prev => {
      if (flag === 'None of the above') {
        // If "None of the above" is selected, clear all other flags
        return {
          ...prev,
          injuryFlags: checked ? ['None of the above'] : [],
        }
      } else {
        // If any other flag is selected, remove "None of the above" and manage the flag
        const otherFlags = prev.injuryFlags.filter(
          f => f !== 'None of the above'
        )
        return {
          ...prev,
          injuryFlags: checked
            ? [...otherFlags, flag]
            : otherFlags.filter(f => f !== flag),
        }
      }
    })
  }

  if (isSubmitted) {
    return (
      <Card className='w-full max-w-2xl mx-auto'>
        <CardContent className='pt-6'>
          <div className='text-center space-y-4'>
            <CheckCircle className='h-16 w-16 text-primary mx-auto' />
            <h2 className='text-2xl font-bold text-foreground'>Thank You!</h2>
            <p className='text-muted-foreground'>
              We've received your FMS assessment request. Our team will contact
              you within 1 business day to schedule your appointment.
            </p>
            <div className='bg-muted p-4 rounded-lg'>
              <p className='text-sm text-muted-foreground'>
                <strong>What's next?</strong>
                <br />• We'll call you to confirm your preferred time
                <br />• Your FMS assessment takes about 45 minutes
                <br />• We'll create a personalized movement plan for you
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>
          Functional Movement Screen Assessment
        </CardTitle>
        <CardDescription className='text-center'>
          Step {step} of 2 - Let's understand your movement goals
        </CardDescription>
        <div className='w-full bg-muted rounded-full h-2'>
          <div
            className='bg-primary h-2 rounded-full transition-all duration-300'
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        {step === 1 && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name *</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={e => {
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                  // Clear error when user starts typing
                  if (errors.name) {
                    setErrors(prev => ({ ...prev, name: '' }))
                  }
                }}
                placeholder='Enter your full name'
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className='text-sm text-destructive' role='alert'>
                  {errors.name}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email Address *</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={e => {
                  setFormData(prev => ({ ...prev, email: e.target.value }))
                  // Clear error when user starts typing
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: '' }))
                  }
                }}
                placeholder='Enter your email address'
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className='text-sm text-destructive' role='alert'>
                  {errors.email}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone Number *</Label>
              <Input
                id='phone'
                type='tel'
                value={formData.phone}
                onChange={e => {
                  setFormData(prev => ({ ...prev, phone: e.target.value }))
                  // Clear error when user starts typing
                  if (errors.phone) {
                    setErrors(prev => ({ ...prev, phone: '' }))
                  }
                }}
                placeholder='Enter your phone number'
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className='text-sm text-destructive' role='alert'>
                  {errors.phone}
                </p>
              )}
            </div>

            <div className='space-y-3'>
              <Label>Preferred Assessment Time *</Label>
              <RadioGroup
                value={formData.preferredTime}
                onValueChange={value => {
                  setFormData(prev => ({ ...prev, preferredTime: value }))
                  // Clear error when value is selected
                  if (errors.preferredTime) {
                    setErrors(prev => ({ ...prev, preferredTime: '' }))
                  }
                }}
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='morning' id='morning' />
                  <Label htmlFor='morning'>Morning (8am - 12pm)</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='afternoon' id='afternoon' />
                  <Label htmlFor='afternoon'>Afternoon (12pm - 5pm)</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='evening' id='evening' />
                  <Label htmlFor='evening'>Evening (5pm - 7pm)</Label>
                </div>
              </RadioGroup>
              {errors.preferredTime && (
                <p className='text-sm text-destructive' role='alert'>
                  {errors.preferredTime}
                </p>
              )}
            </div>

            <Button onClick={handleNext} className='w-full'>
              Continue to Step 2
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='goals'>What are your movement goals? *</Label>
              <Textarea
                id='goals'
                value={formData.goals}
                onChange={e =>
                  setFormData(prev => ({ ...prev, goals: e.target.value }))
                }
                placeholder="Tell us what you'd like to achieve (e.g., reduce back pain, improve mobility, return to sport)"
                className={errors.goals ? 'border-destructive' : ''}
                rows={3}
              />
              {errors.goals && (
                <p className='text-sm text-destructive' role='alert'>
                  {errors.goals}
                </p>
              )}
            </div>

            <div className='space-y-3'>
              <Label>
                Do any of these apply to you? (Check all that apply)
              </Label>
              <div className='space-y-2'>
                {[
                  'Current pain or injury',
                  'Previous surgery',
                  'Chronic condition',
                  'Recent accident/trauma',
                  'None of the above',
                ].map(flag => (
                  <div key={flag} className='flex items-center space-x-2'>
                    <Checkbox
                      id={flag}
                      checked={formData.injuryFlags.includes(flag)}
                      onCheckedChange={checked =>
                        handleInjuryFlagChange(flag, checked as boolean)
                      }
                    />
                    <Label htmlFor={flag} className='text-sm'>
                      {flag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-3'>
              <Label>Exercise Experience Level *</Label>
              <RadioGroup
                value={formData.experience}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, experience: value }))
                }
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='beginner' id='beginner' />
                  <Label htmlFor='beginner'>Beginner - New to exercise</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='intermediate' id='intermediate' />
                  <Label htmlFor='intermediate'>
                    Intermediate - Some experience
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='advanced' id='advanced' />
                  <Label htmlFor='advanced'>Advanced - Very experienced</Label>
                </div>
              </RadioGroup>
              {errors.experience && (
                <p className='text-sm text-destructive' role='alert'>
                  {errors.experience}
                </p>
              )}
            </div>

            {errors.submit && (
              <p className='text-sm text-destructive text-center' role='alert'>
                {errors.submit}
              </p>
            )}

            <div className='flex gap-3'>
              <Button
                variant='outline'
                onClick={() => setStep(1)}
                className='flex-1'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='flex-1'
              >
                {isSubmitting ? 'Submitting...' : 'Book My Assessment'}
              </Button>
            </div>
          </div>
        )}

        {/* Bot Protection */}
        <div className='border-t pt-4 mt-6'>
          <div className='flex items-center space-x-2 mb-2'>
            <Shield className='h-4 w-4 text-muted-foreground' />
            <Label className='text-sm text-muted-foreground'>
              Security Verification
            </Label>
          </div>
          <div className='text-center'>
            <div className='inline-block w-full max-w-sm mx-auto'>
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                onTokenChange={setTurnstileToken}
                onError={() =>
                  setErrors({
                    submit: 'Security verification failed. Please try again.',
                  })
                }
                onExpire={() =>
                  setErrors({
                    submit:
                      'Security verification expired. Please complete it again.',
                  })
                }
                theme='light'
                size='normal'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
