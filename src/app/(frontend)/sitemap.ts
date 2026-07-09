import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const BASE_URL = 'https://sanjiskitchen.de'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: 'voucher', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: 'impressum', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'datenschutz', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'widerrufsbelehrung', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const entries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path ? `/${path}` : ''}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // Pages built in the CMS (published only); 'home' is already listed as ''.
  try {
    const payload = await getPayload({ config })
    const pages = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      limit: 200,
      select: { slug: true, updatedAt: true },
    })

    for (const page of pages.docs) {
      if (page.slug === 'home') continue
      entries.push({
        url: `${BASE_URL}/${page.slug}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  } catch {
    // Without a database the sitemap only lists the static routes.
  }

  return entries
}
