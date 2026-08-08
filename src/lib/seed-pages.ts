import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../../payload-types'

/**
 * Creates the 'home' page document (the landing page) so it can be edited
 * in the admin panel. All other pages are meant to be created manually
 * via the Pages tab. Existing pages are never overwritten — the script
 * is safe to run multiple times.
 *
 * Run with: npm run seed:pages
 */

type SeedPage = Pick<Page, 'title' | 'slug' | 'layout' | 'meta' | 'showInNav'>

const pages: SeedPage[] = [
  {
    title: 'Home',
    slug: 'home',
    showInNav: false, // the navbar always contains a 'Startseite' link
    meta: {
      title: "Sanji's – Steak, Grill & Bar München",
      description:
        "Reservieren Sie online Ihren Tisch bei Sanji's Kitchen in München und genießen Sie kulinarische Highlights in stilvollem Ambiente.",
    },
    layout: [
      {
        blockType: 'hero',
        backgroundType: 'video',
        backgroundSrc: '/LandingPageVideo2.MOV',
        showLogo: true,
        showScrollIndicator: true,
      },
      {
        blockType: 'mediaText',
        heading: {
          de: "WILLKOMMEN IM\nSANJI'S",
          en: "WELCOME TO\nSANJI'S",
        },
        body: {
          de: 'Entdecken Sie die perfekte Fusion aus Qualität, Geschmack und südostasiatischem Ambiente bei Sanjis. Wir laden Sie ein, sich zurückzulehnen, zu entspannen und das Beste zu genießen, was die Welt der kulinarischen Köstlichkeiten zu bieten hat.',
          en: 'Discover the perfect fusion of quality, taste, and Southeast Asian ambiance at Sanjis. We invite you to relax, unwind, and enjoy the best that the world of culinary delights has to offer.',
        },
        staticSrc: '/LandingPageImage1.jpg',
        imagePosition: 'right',
        cta: {
          label: { de: 'Lerne uns kennen', en: 'Learn about us' },
          url: '/about',
        },
      },
      { blockType: 'reservations' },
      { blockType: 'maps' },
      { blockType: 'gallery' },
    ],
  },
]

const seed = async (): Promise<void> => {
  const payload = await getPayload({ config })

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      draft: true,
    })

    if (existing.docs.length > 0) {
      console.log(`[SEED] Skipping '${page.slug}' – page already exists`)
      continue
    }

    await payload.create({
      collection: 'pages',
      data: { ...page, _status: 'published' },
    })
    console.log(`[SEED] Created page '${page.slug}'`)
  }
}

seed()
  .then(() => {
    console.log('[SEED] Done')
    process.exit(0)
  })
  .catch((error) => {
    console.error('[SEED] Failed', error)
    process.exit(1)
  })
