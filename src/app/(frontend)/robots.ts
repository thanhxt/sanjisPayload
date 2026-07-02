import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep the CMS admin, API surface and payment return page out of the index.
      disallow: ['/admin', '/api/', '/return'],
    },
    sitemap: 'https://sanjiskitchen.de/sitemap.xml',
    host: 'https://sanjiskitchen.de',
  }
}
