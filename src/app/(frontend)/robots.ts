import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep the CMS admin, API surface, payment return page and
      // draft-mode preview routes out of the index.
      disallow: ['/admin', '/api/', '/return', '/next/'],
    },
    sitemap: 'https://sanjiskitchen.de/sitemap.xml',
    host: 'https://sanjiskitchen.de',
  }
}
