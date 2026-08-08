import { getPayload } from 'payload'
import config from '@payload-config'
import type { NavLink } from '@/type/navLinkType'

/**
 * Builds the navigation links from the published Pages documents
 * (showInNav = true, sorted by navOrder). The start page is excluded
 * because the navbar/footer always link the logo/Startseite to '/'.
 */
export const getCmsNavLinks = async (): Promise<NavLink[]> => {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      where: { showInNav: { equals: true } },
      overrideAccess: false, // published pages only
      limit: 50,
      sort: 'navOrder',
      select: { slug: true, title: true, navLabel: true },
    })

    return result.docs
      .filter((page) => page.slug !== 'home')
      .map((page) => ({
        href: `/${page.slug}`,
        label: {
          de: page.navLabel?.de || page.title,
          en: page.navLabel?.en || page.navLabel?.de || page.title,
        },
      }))
  } catch {
    // Without a database (e.g. during CI builds) the nav falls back
    // to the static entries only.
    return []
  }
}
