'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'FMS Assessment', href: '/fms' },
    { label: 'Timetable', href: '/timetable' },
    { label: 'About', href: '/about' },
    { label: 'Member Portal', href: '/portal' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
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
        <nav className='hidden lg:flex items-center space-x-6'>
          {navigationItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-secondary'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className='hidden lg:flex items-center space-x-4'>
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
          className='lg:hidden p-2 rounded-md hover:bg-secondary transition-colors'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Toggle mobile menu'
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
        <div className='lg:hidden border-t bg-background'>
          <nav className='container mx-auto px-4 py-4 space-y-1'>
            {navigationItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className='block py-3 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className='pt-4 border-t mt-4 space-y-3'>
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
  )
}
