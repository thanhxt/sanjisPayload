import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSideDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSideDish: CollectionConfig = {
  slug: 'menuSideDish',
  labels: {
    singular: { de: 'Beilage / Sauce', en: 'Side dish / sauce' },
    plural: { de: 'Beilagen & Saucen', en: 'Side dishes & sauces' },
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
      label: { de: 'Name (Deutsch)', en: 'Name (German)' },
      type: 'text',
      required: true,
      admin: {
        description: {
          de: 'z.B. "Trüffel Pommes" oder "Pfefferrahm-Sauce".',
          en: 'e.g. "Trüffel Pommes" or "Pfefferrahm-Sauce".',
        },
      },
    },
    {
      name: 'titleEN',
      label: { de: 'Name (Englisch)', en: 'Name (English)' },
      type: 'text',
      admin: {
        description: {
          de: 'Optional – wird angezeigt, wenn Gäste die Website auf Englisch nutzen.',
          en: 'Optional – shown when guests use the website in English.',
        },
      },
    },
    {
      name: 'price',
      label: { de: 'Preis', en: 'Price' },
      type: 'text',
      required: true,
      admin: {
        description: {
          de: 'Freier Text, z.B. "5,9" – erscheint genau so hinter dem Namen.',
          en: 'Free text, e.g. "5.9" – appears exactly as typed after the name.',
        },
      },
    },
    {
      name: 'category',
      label: { de: 'Kategorie', en: 'Category' },
      type: 'select',
      required: true,
      defaultValue: 'side',
      options: [
        {
          label: { de: 'Beilage', en: 'Side dish' },
          value: 'side',
        },
        {
          label: { de: 'Sauce', en: 'Sauce' },
          value: 'sauce',
        },
      ],
      admin: {
        description: {
          de: 'Bestimmt, ob der Eintrag in der Liste BEILAGEN oder SAUCEN erscheint.',
          en: 'Determines whether the entry appears in the SIDES or SAUCES list.',
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
    defaultColumns: ['titleDE', 'category', 'price', 'position'],
    description: {
      de: 'Beilagen und Saucen im Bereich STEAKS der Speisekarte (/speisekarte).',
      en: 'Side dishes and sauces in the STEAKS section of the menu page (/speisekarte).',
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
