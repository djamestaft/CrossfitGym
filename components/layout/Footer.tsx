'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className='bg-muted/50 border-t'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8'>
          {/* Business Info */}
          <div className='space-y-4'>
            <Link href='/' className='flex items-center space-x-3'>
              <Image
                src='/images/logo.webp'
                alt='Geelong Movement Co Logo'
                width={100}
                height={100}
                className='w-auto h-8'
              />
            </Link>
            <div className='space-y-2 text-sm text-muted-foreground'>
              <div className='flex items-start space-x-2'>
                <MapPin className='h-4 w-4 mt-0.5 flex-shrink-0 text-primary' />
                <div>
                  <span>
                    123 Movement Street
                    <br />
                    Geelong VIC 3220
                  </span>
                  <div className='mt-2'>
                    <a
                      href='https://maps.google.com/?q=123+Movement+Street+Geelong+VIC+3220'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors text-xs'
                      aria-label='View location on Google Maps'
                    >
                      <ExternalLink className='h-3 w-3' />
                      <span>View on Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <Phone className='h-4 w-4 text-primary' />
                <a
                  href='tel:+61312345678'
                  className='hover:text-primary transition-colors'
                >
                  (03) 1234 5678
                </a>
              </div>

              {/* Emergency Contact */}
              <div className='bg-red-50 border border-red-200 rounded-md p-3 mt-4'>
                <div className='flex items-center space-x-2 mb-1'>
                  <Phone className='h-4 w-4 text-red-600' />
                  <span className='text-xs font-medium text-red-700'>
                    Emergency Contact:
                  </span>
                </div>
                <a
                  href='tel:+61400000000'
                  className='text-sm font-semibold text-red-800 hover:text-red-900 transition-colors'
                >
                  0400 000 000
                </a>
                <p className='text-xs text-red-600 mt-1'>
                  For urgent matters and emergencies only
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <Mail className='h-4 w-4 text-primary' />
                <a
                  href='mailto:info@geelongmovement.co'
                  className='hover:text-primary transition-colors'
                >
                  info@geelongmovement.co
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground flex items-center space-x-2'>
              <Clock className='h-4 w-4 text-primary' />
              <span>Opening Hours</span>
            </h3>
            <div className='space-y-1 text-sm text-muted-foreground'>
              <div className='flex justify-between'>
                <span>Monday - Friday</span>
                <span>6:00 AM - 8:00 PM</span>
              </div>
              <div className='flex justify-between'>
                <span>Saturday</span>
                <span>7:00 AM - 4:00 PM</span>
              </div>
              <div className='flex justify-between'>
                <span>Sunday</span>
                <span>8:00 AM - 2:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground'>Quick Links</h3>
            <div className='space-y-2 text-sm'>
              <Link
                href='/fms'
                className='block text-muted-foreground hover:text-primary transition-colors'
              >
                FMS Assessment
              </Link>
              <Link
                href='/about'
                className='block text-muted-foreground hover:text-primary transition-colors'
              >
                About Us
              </Link>
              <Link
                href='/timetable'
                className='block text-muted-foreground hover:text-primary transition-colors'
              >
                Class Timetable
              </Link>
              <Link
                href='/portal'
                className='block text-muted-foreground hover:text-primary transition-colors'
              >
                Member Portal
              </Link>
              <Link
                href='/contact'
                className='block text-muted-foreground hover:text-primary transition-colors'
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground'>Follow Us</h3>
            <div className='space-y-3'>
              <div className='flex space-x-3'>
                <a
                  href='https://facebook.com/geelongmovementco'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors'
                  aria-label='Follow us on Facebook'
                >
                  <Facebook className='h-5 w-5' />
                  <span className='text-sm'>Facebook</span>
                </a>
              </div>
              <div className='flex space-x-3'>
                <a
                  href='https://instagram.com/geelongmovementco'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors'
                  aria-label='Follow us on Instagram'
                >
                  <Instagram className='h-5 w-5' />
                  <span className='text-sm'>Instagram</span>
                </a>
              </div>
              <div className='flex space-x-3'>
                <a
                  href='https://twitter.com/geelongmovementco'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors'
                  aria-label='Follow us on Twitter'
                >
                  <Twitter className='h-5 w-5' />
                  <span className='text-sm'>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Legal & Trust */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground'>Trust & Legal</h3>
            <div className='space-y-2 text-sm text-muted-foreground'>
              <div>
                <span className='block'>
                  Exercise & Sports Science Australia
                </span>
                <span className='text-xs'>Registered Member</span>
              </div>
              <div className='space-y-1'>
                <Link
                  href='/privacy'
                  className='block hover:text-primary transition-colors'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='block hover:text-primary transition-colors'
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 pt-8 border-t text-center text-sm text-muted-foreground'>
          <p>
            &copy; 2025 Geelong Movement Co. All rights reserved. ABN: 12 345
            678 901
          </p>
        </div>
      </div>
    </footer>
  )
}
