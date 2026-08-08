import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuAppetizerDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuAppetizerDish: CollectionConfig = {
  slug: 'menuAppetizerDish',
  labels: {
    singular: { de: 'Vorspeise', en: 'Starter' },
    plural: { de: 'Vorspeisen', en: 'Starters' },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkRole(['admin'], user),
    update: ({ req: { user } }) => checkRole(['admin'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'title',
      label: { de: 'Name des Gerichts', en: 'Dish name' },
      type: 'text',
      required: true,
      admin: {
        description: {
          de: 'Erscheint genau so auf der Karte, z.B. "spicy salmon tatare".',
          en: 'Appears on the menu exactly as typed, e.g. "spicy salmon tatare".',
        },
      },
    },
    {
      name: 'price',
      label: { de: 'Preis in €', en: 'Price in €' },
      type: 'number',
      required: true,
      admin: {
        description: {
          de: 'Nur die Zahl, z.B. 16,9 → steht rechts neben dem Gericht.',
          en: 'Just the number, e.g. 16.9 → shown to the right of the dish.',
        },
      },
    },
    {
      name: 'descriptionDE',
      label: { de: 'Beschreibung (Deutsch)', en: 'Description (German)' },
      type: 'text',
      admin: {
        description: {
          de: 'Kleine graue Zeile unter dem Gericht, z.B. die Zutaten.',
          en: 'Small grey line below the dish, e.g. the ingredients.',
        },
      },
    },
    {
      name: 'descriptionEN',
      label: { de: 'Beschreibung (Englisch)', en: 'Description (English)' },
      type: 'text',
      admin: {
        description: {
          de: 'Wird angezeigt, wenn Gäste die Website auf Englisch nutzen.',
          en: 'Shown when guests use the website in English.',
        },
      },
    },
    {
      name: 'position',
      label: { de: 'Reihenfolge', en: 'Sort order' },
      type: 'number',
      admin: {
        position: 'sidebar',
        description: {
          de: 'Kleinere Zahl = weiter oben in der Liste (1, 2, 3, …).',
          en: 'Lower number = higher up in the list (1, 2, 3, …).',
        },
      },
    },
  ],
  admin: {
    useAsTitle: 'title',
    group: { de: 'Speisekarte', en: 'Menu' },
    defaultColumns: ['title', 'price', 'position'],
    description: {
      de: 'Die Gerichte im Bereich VORSPEISE auf der Speisekarten-Seite (/speisekarte).',
      en: 'The dishes in the STARTERS section of the menu page (/speisekarte).',
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
