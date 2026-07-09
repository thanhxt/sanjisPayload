import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSteaksDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSanjisChoice: CollectionConfig = {
  slug: 'menuSanjisChoice',
  labels: {
    singular: { de: "Sanji's Choice Box", en: "Sanji's Choice box" },
    plural: { de: "Sanji's Choice Boxen", en: "Sanji's Choice boxes" },
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
      label: { de: 'Überschrift der Box', en: 'Box heading' },
      type: 'text',
      required: true,
      admin: {
        description: {
          de: 'Große Überschrift der hervorgehobenen Box, z.B. "SANJI\'S CHOICE".',
          en: 'Large heading of the highlighted box, e.g. "SANJI\'S CHOICE".',
        },
      },
    },
    {
      name: 'steaktitle',
      label: { de: 'Untertitel', en: 'Subtitle' },
      type: 'text',
      admin: {
        description: {
          de: 'Zweite Zeile unter der Überschrift, z.B. der Name des Steaks.',
          en: 'Second line below the heading, e.g. the steak name.',
        },
      },
    },
    {
      name: 'descriptionDE',
      label: { de: 'Beschreibung (Deutsch)', en: 'Description (German)' },
      type: 'text',
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
      type: 'row',
      fields: [
        {
          name: 'stake1',
          label: { de: 'Option 1 – Name', en: 'Option 1 – name' },
          type: 'text',
          admin: {
            description: {
              de: 'z.B. "Bistro Filet".',
              en: 'e.g. "Bistro Filet".',
            },
          },
        },
        {
          name: 'price1',
          label: { de: 'Option 1 – Preis (€)', en: 'Option 1 – price (€)' },
          type: 'number',
        },
        {
          name: 'stakeWeight1',
          label: { de: 'Option 1 – Gewicht (g)', en: 'Option 1 – weight (g)' },
          type: 'number',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stake2',
          label: { de: 'Option 2 – Name', en: 'Option 2 – name' },
          type: 'text',
        },
        {
          name: 'price2',
          label: { de: 'Option 2 – Preis (€)', en: 'Option 2 – price (€)' },
          type: 'number',
        },
        {
          name: 'stakeWeight2',
          label: { de: 'Option 2 – Gewicht (g)', en: 'Option 2 – weight (g)' },
          type: 'number',
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'titleDE',
    group: { de: 'Speisekarte', en: 'Menu' },
    defaultColumns: ['titleDE', 'steaktitle', 'price1', 'price2'],
    description: {
      de: 'Die hervorgehobene Empfehlungs-Box im Bereich STEAKS (/speisekarte) mit zwei Steak-Optionen. Wird angezeigt: "Name Preis€ | p. Gewichtg".',
      en: 'The highlighted recommendation box in the STEAKS section (/speisekarte) with two steak options. Displayed as: "name price€ | p. weightg".',
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
