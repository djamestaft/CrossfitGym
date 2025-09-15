import { ChatToggle } from '@/components/chat-toggle'
import { Layout } from '@/components/layout/Layout'
import StickyMobileCTA from '@/components/sticky-mobile-cta'
import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import Script from 'next/script'
import type React from 'react'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Geelong Movement Co - Train Around Pain, Move Freely Again',
  description:
    'Professional movement therapy and functional movement screening in Geelong. Expert physiotherapy and exercise rehabilitation to help you train around pain and move freely.',
  generator: 'v0.app',
  keywords:
    'physiotherapy, movement therapy, functional movement screen, FMS, Geelong, pain management, exercise rehabilitation, train around pain, movement assessment',
  authors: [{ name: 'Geelong Movement Co' }],
  creator: 'Geelong Movement Co',
  publisher: 'Geelong Movement Co',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Geelong Movement Co - Train Around Pain, Move Freely Again',
    description:
      'Professional movement therapy and functional movement screening in Geelong.',
    type: 'website',
    locale: 'en_AU',
    url: 'https://geelongmovement.co',
    siteName: 'Geelong Movement Co',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Geelong Movement Co - Professional Movement Therapy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geelong Movement Co - Train Around Pain, Move Freely Again',
    description:
      'Professional movement therapy and functional movement screening in Geelong.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://geelongmovement.co',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Geelong Movement Co',
  description:
    'Professional movement therapy and functional movement screening in Geelong',
  url: 'https://geelongmovement.co',
  telephone: '+61-3-5222-1234',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Movement Street',
    addressLocality: 'Geelong',
    addressRegion: 'VIC',
    postalCode: '3220',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -38.1499,
    longitude: 144.3617,
  },
  openingHours: ['Mo-Fr 06:00-20:00', 'Sa 07:00-17:00', 'Su 08:00-16:00'],
  priceRange: '$$',
  image: 'https://geelongmovement.co/og-image.jpg',
  sameAs: [
    'https://www.facebook.com/geelongmovementco',
    'https://www.instagram.com/geelongmovementco',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        <Script
          id='organization-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#3f2e2e' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            {children}
            <Analytics />
            <ChatToggle />
            {/* <FloatingContactWidget /> */}
            <StickyMobileCTA />
          </Layout>
        </Suspense>
      </body>
    </html>
  )
}
