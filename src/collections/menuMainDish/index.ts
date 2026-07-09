import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuMainDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuMainDish: CollectionConfig = {
  slug: 'menuMainDish',
  labels: {
    singular: { de: 'Hauptgericht', en: 'Main course' },
    plural: { de: 'Hauptgerichte', en: 'Main courses' },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkRole(['admin'], user),
    update: ({ req: { user } }) => checkRole(['admin'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'titleDE',
      label: { de: 'Name des Gerichts', en: 'Dish name' },
      type: 'text',
      required: true,
      admin: {
        description: {
          de: 'Erscheint genau so auf der Karte im Bereich HAUPTSPEISE.',
          en: 'Appears exactly as typed in the MAIN COURSE section.',
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
          de: 'Nur die Zahl, z.B. 28,9 → steht rechts neben dem Gericht.',
          en: 'Just the number, e.g. 28.9 → shown to the right of the dish.',
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
    useAsTitle: 'titleDE',
    group: { de: 'Speisekarte', en: 'Menu' },
    defaultColumns: ['titleDE', 'price', 'position'],
    description: {
      de: 'Die Gerichte im Bereich HAUPTSPEISE auf der Speisekarten-Seite (/speisekarte).',
      en: 'The dishes in the MAIN COURSE section of the menu page (/speisekarte).',
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
