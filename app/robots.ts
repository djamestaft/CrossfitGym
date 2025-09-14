import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal/auth', '/api/', '/admin/'],
    },
    sitemap: 'https://geelongmovement.co/sitemap.xml',
  }
}
