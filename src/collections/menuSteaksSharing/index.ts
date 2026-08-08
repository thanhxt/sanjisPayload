import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSteaksSharing/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSteaksSharing: CollectionConfig = {
  slug: 'menuSteaksSharing',
  labels: {
    singular: { de: 'Sharing Steak', en: 'Sharing steak' },
    plural: { de: 'Sharing Steaks', en: 'Sharing steaks' },
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
      label: { de: 'Name des Steaks', en: 'Steak name' },
      type: 'text',
      required: true,
      admin: {
        description: {
          de: 'z.B. "TOMAHAWK", "CHATEAUBRIAND" oder "PORTERHOUSE".',
          en: 'e.g. "TOMAHAWK", "CHATEAUBRIAND" or "PORTERHOUSE".',
        },
      },
    },
    {
      name: 'descriptionDE',
      label: { de: 'Beschreibung (Deutsch)', en: 'Description (German)' },
      type: 'text',
      admin: {
        description: {
          de: 'Zeile unter dem Namen, z.B. die Fleischsorte.',
          en: 'Line below the name, e.g. the type of beef.',
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
      name: 'regionDE',
      label: { de: 'Herkunft (Deutsch)', en: 'Origin (German)' },
      type: 'text',
    },
    {
      name: 'regionEN',
      label: { de: 'Herkunft (Englisch)', en: 'Origin (English)' },
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'weightSmall',
          label: { de: 'Gewicht klein (g)', en: 'Weight small (g)' },
          type: 'number',
        },
        {
          name: 'priceSmall',
          label: { de: 'Preis klein (€)', en: 'Price small (€)' },
          type: 'number',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'weightLarge',
          label: { de: 'Gewicht groß (g)', en: 'Weight large (g)' },
          type: 'number',
          admin: {
            description: {
              de: 'Leer lassen, wenn es nur eine Größe gibt (z.B. Tomahawk).',
              en: 'Leave empty if there is only one size (e.g. Tomahawk).',
            },
          },
        },
        {
          name: 'priceLarge',
          label: { de: 'Preis groß (€)', en: 'Price large (€)' },
          type: 'number',
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'titleDE',
    group: { de: 'Speisekarte', en: 'Menu' },
    defaultColumns: ['titleDE', 'priceSmall', 'priceLarge'],
    description: {
      de: 'Die drei großen Steaks zum Teilen unter "SHARING STEAKS" im Bereich STEAKS (/speisekarte) – am Tisch flambiert & tranchiert.',
      en: 'The three large steaks to share under "SHARING STEAKS" in the STEAKS section (/speisekarte) – flambéed & carved at the table.',
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
