'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA when user scrolls past hero section
      const scrollPosition = window.scrollY
      const heroHeight = window.innerHeight * 0.5 // 50vh
      setIsVisible(scrollPosition > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky-cta ${isVisible ? 'visible' : ''}`}>
      <Link
        href='/fms'
        className='btn-primary w-full inline-flex items-center justify-center gap-2 text-lg'
      >
        Book Free Assessment
        <ArrowRight size={20} />
      </Link>
    </div>
  )
}
