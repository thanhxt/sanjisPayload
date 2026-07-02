import type { MetadataRoute } from 'next'

const BASE_URL = 'https://sanjiskitchen.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: 'about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: 'speisekarte', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'reservierung', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'voucher', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: 'kontakt', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: 'impressum', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'datenschutz', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'widerrufsbelehrung', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path ? `/${path}` : ''}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
