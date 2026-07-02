import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../../payload-types'

/**
 * Creates one Pages document per previously hardcoded route so the site
 * looks identical after the blocks migration. Existing pages are never
 * overwritten — the script is safe to run multiple times.
 *
 * Run with: npm run seed:pages
 */

type SeedPage = Pick<Page, 'title' | 'slug' | 'layout' | 'meta'>

const welcomeHeading = {
  de: "WILLKOMMEN IM\nSANJI'S",
  en: "WELCOME TO\nSANJI'S",
}

const pages: SeedPage[] = [
  {
    title: 'Home',
    slug: 'home',
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
        heading: welcomeHeading,
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
  {
    title: 'Über uns',
    slug: 'about',
    meta: {
      title: "Über uns | Sanji's",
      description: "Über uns von Sanji's – Geschichte, Team, Mission, Werte, Kontakt",
    },
    layout: [
      {
        blockType: 'mediaText',
        heading: welcomeHeading,
        body: {
          de: 'Tauchen Sie ein in eine Welt des exquisiten Genusses, in der Qualität auf höchstem Niveau zelebriert wird. Bei uns steht das Beste vom Besten im Mittelpunkt: von zartem Wagyu-Rindfleisch bis hin zu erstklassigem Black Angus. Unser Engagement für herausragende Qualität spiegelt sich nicht nur in unseren Gerichten wider, sondern auch in unserer Auswahl an erstklassigen Zutaten und handgefertigten Cocktails.\n\nBei uns dreht sich alles um die feinsten Geschmackserlebnisse, die Sie sich vorstellen können. Mit jedem Bissen und jedem Schluck entführen wir Sie auf eine kulinarische Reise, die Ihre Sinne verzaubern wird. Unsere Leidenschaft für außergewöhnliches Essen und exzellenten Service ist in jedem Detail spürbar – von der Auswahl der Zutaten bis hin zur Präsentation auf Ihrem Teller.',
          en: 'Dive into a world of exquisite taste, where quality is celebrated at the highest level. At our restaurant, the best of the best is at the center: from tender Wagyu beef to top-quality Black Angus. Our commitment to exceptional quality is reflected not only in our dishes, but also in our selection of high-quality ingredients and handcrafted cocktails.\n\nAt our restaurant, everything revolves around the finest taste experiences you can imagine. With every bite and every sip, we transport you on a culinary journey that will enchant your senses. Our passion for exceptional food and excellent service is palpable in every detail – from the selection of ingredients to the presentation on your plate.',
        },
        heroSlug: 'aboutHero',
        imagePosition: 'left',
      },
      { blockType: 'team' },
    ],
  },
  {
    title: 'Kontakt',
    slug: 'kontakt',
    meta: {
      title: "Kontakt | Sanji's",
      description: "Kontakt von Sanji's",
    },
    layout: [
      {
        blockType: 'pageHeader',
        heading: { de: 'Kontakt', en: 'Contact' },
        heroSlug: 'kontaktHero',
      },
      { blockType: 'contact' },
    ],
  },
  {
    title: 'Reservierung',
    slug: 'reservierung',
    meta: {
      title: "Reservierung | Sanji's – Steak, Grill & Bar München",
      description:
        "Reservieren Sie Ihren Tisch online bei Sanji's Kitchen. Genießen Sie erstklassige Steaks und eine stilvolle Atmosphäre in München.",
    },
    layout: [{ blockType: 'reservations' }],
  },
  {
    title: 'Impressum',
    slug: 'impressum',
    meta: {
      title: "Impressum | Sanji's – Steak, Grill & Bar München",
      description:
        "Impressum von Sanji's – Angaben gemäß § 5 TMG, Kontakt, Umsatzsteuer-ID, EU-Streitschlichtung, Verbraucherstreitbeilegung.",
    },
    layout: [{ blockType: 'legalContent', document: 'impressum' }],
  },
  {
    title: 'Datenschutz',
    slug: 'datenschutz',
    meta: {
      title: "Datenschutz | Sanji's – Steak, Grill & Bar München",
      description:
        "Datenschutzerklärung von Sanji's – Informationen zu Cookies, Hosting, OpenTable, Google Maps & Co.",
    },
    layout: [{ blockType: 'legalContent', document: 'datenschutz' }],
  },
  {
    title: 'Widerrufsbelehrung',
    slug: 'widerrufsbelehrung',
    meta: {
      title: "Widerrufsbelehrung | Sanji's – Steak, Grill & Bar München",
      description:
        "Widerrufsbelehrung für Bestellungen bei Sanji's Kitchen. Informationen zu Widerrufsrecht, Folgen und Muster-Widerrufsformular.",
    },
    layout: [{ blockType: 'legalContent', document: 'widerrufsbelehrung' }],
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
