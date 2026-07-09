import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../../payload-types'
import type { MenuAppetizerDish } from '@/type/appetizerDishType'
import type { MainDish } from '@/type/mainDishType'
import type { SteaksDish } from '@/type/steaksDishType'
import type { SteaksDishChoice } from '@/type/steaksDishChoiceType'
import type { SteaksDishSharing } from '@/type/steaksDishSharingType'
import type { SideDish } from '@/type/sidedishType'

/**
 * One-time migration: converts the dishes from the old menu collections
 * into a 'speisekarte' page built from menuSection blocks, so the menu
 * can be edited entirely in the Pages tab afterwards.
 *
 * The old collections are left untouched (they are only hidden in the
 * admin panel) — verify the result, then they can be removed for good.
 *
 * Run with: npm run migrate:menu
 */

type MenuSection = Extract<NonNullable<Page['layout']>[number], { blockType: 'menuSection' }>
type Group = NonNullable<MenuSection['groups']>[number]
type Item = NonNullable<Group['items']>[number]

const byPosition = <T extends { position?: number | null }>(docs: T[]): T[] =>
  [...docs].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

const price = (value: number | string | null | undefined): string =>
  value === null || value === undefined ? '' : String(value)

const migrate = async (): Promise<void> => {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'speisekarte' } },
    limit: 1,
    draft: true,
  })
  if (existing.docs.length > 0) {
    console.log("[MIGRATE] Page 'speisekarte' already exists – nothing to do.")
    return
  }

  const find = async <T>(collection: string): Promise<T[]> => {
    const result = await payload.find({
      // The old menu collections are not part of the generated types union
      // forever, so keep the lookup loose.
      collection: collection as Parameters<typeof payload.find>[0]['collection'],
      limit: 500,
    })
    return result.docs as T[]
  }

  const appetizers = byPosition(await find<MenuAppetizerDish>('menuAppetizerDish'))
  const mains = byPosition(await find<MainDish>('menuMainDish'))
  const cuts = byPosition(await find<SteaksDish>('menuSteaksDish'))
  const choices = await find<SteaksDishChoice>('menuSanjisChoice')
  const sharing = byPosition(await find<SteaksDishSharing>('menuSteaksSharing'))
  const sides = byPosition(await find<SideDish>('menuSideDish'))

  const vorspeise: MenuSection = {
    blockType: 'menuSection',
    heading: { de: 'VORSPEISE', en: 'STARTERS' },
    groups: [
      {
        layout: 'list',
        items: appetizers.map(
          (dish): Item => ({
            name: dish.title,
            description: { de: dish.descriptionDE, en: dish.descriptionEN },
            prices: [{ price: price(dish.price) }],
          }),
        ),
      },
      {
        title: { de: 'STARTER SHARING', en: 'STARTER SHARING' },
        intro: {
          de: 'ab 2 Personen - 24,90 p.p.',
          en: 'starts at 2 persons - 24,90 p.p.',
        },
        layout: 'list',
        items: [
          { name: 'spicy salmon tatare' },
          { name: 'yellowfin tuna tataki' },
          { name: 'wagyu beef la lot' },
          { name: 'green mango duck salad' },
        ],
      },
    ],
  }

  const steaks: MenuSection = {
    blockType: 'menuSection',
    heading: { de: 'STEAKS', en: 'STEAK' },
    groups: [
      {
        title: { de: 'STEAK CUTS', en: 'STEAK CUTS' },
        layout: 'cards',
        items: cuts.map(
          (dish): Item => ({
            name: dish.titleDE,
            description: { de: dish.descriptionDE, en: dish.descriptionEN },
            region: { de: dish.regionDE, en: dish.regionEN },
            prices: [
              { label: `${dish.weightSmall}g`, price: price(dish.priceSmall) },
              { label: `${dish.weightLarge}g`, price: price(dish.priceLarge) },
            ],
          }),
        ),
      },
      {
        layout: 'cards',
        items: choices.map(
          (dish): Item => ({
            name: dish.titleDE,
            subtitle: { de: dish.steaktitle, en: dish.steaktitle },
            description: { de: dish.descriptionDE, en: dish.descriptionEN },
            highlight: true,
            prices: [
              { label: dish.stake1, price: `${price(dish.price1)}€ | p. ${dish.stakeWeight1}g` },
              { label: dish.stake2, price: `${price(dish.price2)}€ | p. ${dish.stakeWeight2}g` },
            ],
          }),
        ),
      },
      {
        title: { de: 'SHARING STEAKS', en: 'SHARING STEAKS' },
        intro: {
          de: '(Ca. 45 - 60min Zubereitungszeit)\nAm Tisch flambiert & tranchiert.',
          en: '(Approx. 45 - 60min preparation time)\nFlambéed & carved at the table.',
        },
        layout: 'cards',
        items: sharing.map(
          (dish): Item => ({
            name: dish.titleDE,
            description: { de: dish.descriptionDE, en: dish.descriptionEN },
            region: { de: dish.regionDE, en: dish.regionEN },
            prices:
              dish.weightLarge && dish.weightLarge !== dish.weightSmall
                ? [
                    { label: `${dish.weightSmall}g`, price: price(dish.priceSmall) },
                    { label: `${dish.weightLarge}g`, price: price(dish.priceLarge) },
                  ]
                : [{ label: `${dish.weightSmall}g`, price: price(dish.priceSmall) }],
          }),
        ),
      },
      {
        title: { de: 'BEILAGEN', en: 'SIDES' },
        layout: 'list',
        items: sides
          .filter((side) => side.category === 'side')
          .map(
            (side): Item => ({
              name: side.titleDE,
              subtitle: side.titleEN ? { de: '', en: side.titleEN } : undefined,
              prices: [{ price: side.price }],
            }),
          ),
      },
      {
        title: { de: 'SAUCEN', en: 'SAUCES' },
        layout: 'list',
        items: sides
          .filter((side) => side.category === 'sauce')
          .map(
            (side): Item => ({
              name: side.titleDE,
              subtitle: side.titleEN ? { de: '', en: side.titleEN } : undefined,
              prices: [{ price: side.price }],
            }),
          ),
      },
    ],
    note: {
      de: 'Upgrade! Surf & Turf + Black Tiger Prawns 17,9\n\nWenn Sie auf bestimmte Zutaten allergisch reagieren - Fragen Sie bitte unsere Mitarbeiter nach der Allergen-Informationskarte.\nAlle Preise in € inklusive 7% Mehrwertsteuer.',
      en: 'Upgrade! Surf & Turf + Black Tiger Prawns 17,9\n\nIf you are allergic to certain ingredients - please ask our staff for the allergen information card.\nAll prices in € including 7% VAT.',
    },
  }

  const hauptspeise: MenuSection = {
    blockType: 'menuSection',
    heading: { de: 'HAUPTSPEISE', en: 'MAIN COURSE' },
    groups: [
      {
        layout: 'list',
        items: mains.map(
          (dish): Item => ({
            name: dish.titleDE,
            description: { de: dish.descriptionDE, en: dish.descriptionEN },
            prices: [{ price: price(dish.price) }],
          }),
        ),
      },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Speisekarte',
      slug: 'speisekarte',
      _status: 'published',
      showInNav: true,
      navOrder: 0,
      navLabel: { de: 'Speisekarte', en: 'Menu' },
      meta: {
        title: "Speisekarte | Sanji's",
        description:
          "Speisekarte von Sanji's – Spezialitäten, Vorspeisen, Hauptgerichte, Desserts, Getränke",
      },
      layout: [
        {
          blockType: 'pageHeader',
          heading: { de: 'Speisekarte', en: 'Menu' },
          heroSlug: 'speisekarteHero',
        },
        vorspeise,
        steaks,
        hauptspeise,
      ],
    },
  })

  console.log(
    `[MIGRATE] Created page 'speisekarte' with ${appetizers.length} starters, ${cuts.length} steak cuts, ${choices.length} choice items, ${sharing.length} sharing steaks, ${mains.length} mains, ${sides.length} sides/sauces.`,
  )
}

migrate()
  .then(() => {
    console.log('[MIGRATE] Done')
    process.exit(0)
  })
  .catch((error) => {
    console.error('[MIGRATE] Failed', error)
    process.exit(1)
  })
