'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'FMS Assessment', href: '/fms' },
    { label: 'Timetable', href: '/timetable' },
    { label: 'About', href: '/about' },
    { label: 'Member Portal', href: '/portal' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Skip to main content link for screen readers */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50'
      >
        Skip to main content
      </a>

      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <Image
              src='/images/logo.webp'
              alt='Geelong Movement Co Logo'
              width={100}
              height={100}
              className='w-auto h-8'
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className='hidden lg:flex items-center space-x-6'
            role='navigation'
            aria-label='Main navigation'
          >
            {navigationItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors px-2 py-2 hover:bg-secondary ${
                  isActive(item.href)
                    ? 'text-amber-700 font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className='hidden lg:flex items-center space-x-4'>
            {/* Emergency Contact */}
            <div className='hidden xl:flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 rounded-md'>
              <span className='text-xs font-medium text-red-700'>
                Emergency:
              </span>
              <a
                href='tel:+61400000000'
                className='text-sm font-semibold text-red-800 hover:text-red-900 flex items-center space-x-1'
              >
                <Phone className='h-4 w-4' />
                <span>0400 000 000</span>
              </a>
            </div>

            <a
              href='tel:+61312345678'
              className='text-sm text-muted-foreground hover:text-primary flex items-center space-x-1'
            >
              <Phone className='h-4 w-4' />
              <span>(03) 1234 5678</span>
            </a>
            <Button size='sm' className='font-medium' asChild>
              <Link href='/fms'>Get Assessment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='lg:hidden p-2 rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle mobile menu'
            aria-expanded={isMobileMenuOpen}
            aria-controls='mobile-navigation'
          >
            {isMobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className='lg:hidden border-t bg-background'
            id='mobile-navigation'
          >
            <nav
              className='container mx-auto px-4 py-4 space-y-1'
              role='navigation'
              aria-label='Mobile navigation'
            >
              {navigationItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-4 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-amber-700 font-semibold'
                      : 'text-foreground hover:text-primary hover:bg-secondary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <div className='pt-4 border-t mt-4 space-y-3'>
                {/* Emergency Contact */}
                <div className='bg-red-50 border border-red-200 rounded-md p-3'>
                  <div className='flex items-center space-x-2 mb-1'>
                    <span className='text-xs font-medium text-red-700'>
                      Emergency Contact:
                    </span>
                  </div>
                  <a
                    href='tel:+61400000000'
                    className='flex items-center space-x-2 py-2 px-3 text-base font-semibold text-red-800 hover:text-red-900 hover:bg-red-100 rounded-md transition-colors'
                  >
                    <Phone className='h-5 w-5' />
                    <span>0400 000 000</span>
                  </a>
                </div>

                <a
                  href='tel:+61312345678'
                  className='flex items-center space-x-2 py-3 px-4 text-base text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors'
                >
                  <Phone className='h-5 w-5' />
                  <span>(03) 1234 5678</span>
                </a>
                <Button size='lg' className='w-full font-medium' asChild>
                  <Link href='/fms'>Get Assessment</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
