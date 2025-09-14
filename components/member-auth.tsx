'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, CheckCircle } from 'lucide-react'

interface MemberAuthProps {
  onAuthenticated: (email: string) => void
}

export function MemberAuth({ onAuthenticated }: MemberAuthProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Simulate magic link sending
      await new Promise(resolve => setTimeout(resolve, 2000))

      // For demo purposes, automatically authenticate after "sending" link
      setTimeout(() => {
        onAuthenticated(email)
        // GA4 event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'portal_login', {
            event_category: 'engagement',
            event_label: 'Member Portal Access',
          })
        }
      }, 3000)

      setIsLinkSent(true)
    } catch (error) {
      // Error logged for debugging in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Authentication error:', error)
      }
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLinkSent) {
    return (
      <Card className='w-full max-w-md mx-auto'>
        <CardContent className='pt-6'>
          <div className='text-center space-y-4'>
            <Mail className='h-16 w-16 text-primary mx-auto' />
            <h2 className='text-2xl font-bold'>Check Your Email</h2>
            <p className='text-muted-foreground'>
              We've sent a secure login link to <strong>{email}</strong>
            </p>
            <Alert>
              <CheckCircle className='h-4 w-4' />
              <AlertDescription>
                For demo purposes, you'll be automatically logged in shortly.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl'>Member Portal Access</CardTitle>
        <CardDescription>
          Enter your email to receive a secure login link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email address'
              className={error ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {error && (
              <p className='text-sm text-destructive' role='alert'>
                {error}
              </p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Sending Login Link...
              </>
            ) : (
              'Send Login Link'
            )}
          </Button>

          <p className='text-xs text-muted-foreground text-center'>
            Only current GMC members can access the portal. New to GMC?{' '}
            <a href='/fms' className='text-primary hover:underline'>
              Book an assessment
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
