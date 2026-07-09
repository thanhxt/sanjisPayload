import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSteaksDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSteaksDish: CollectionConfig = {
  slug: 'menuSteaksDish',
  labels: {
    singular: { de: 'Steak Cut', en: 'Steak cut' },
    plural: { de: 'Steak Cuts', en: 'Steak cuts' },
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
      label: { de: 'Name des Cuts', en: 'Cut name' },
      type: 'text',
      required: true,
      admin: {
        description: {
          de: 'Überschrift der Karte, z.B. "RUMP CAP / TAFELSPITZ".',
          en: 'Card heading, e.g. "RUMP CAP / TAFELSPITZ".',
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
      admin: {
        description: {
          de: 'Kleine Zeile mit der Herkunft, z.B. "Australien".',
          en: 'Small line with the origin, e.g. "Australia".',
        },
      },
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
          admin: {
            description: {
              de: 'Kleine Portion, z.B. 200.',
              en: 'Small portion, e.g. 200.',
            },
          },
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
              de: 'Große Portion, z.B. 300.',
              en: 'Large portion, e.g. 300.',
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
    {
      name: 'position',
      label: { de: 'Reihenfolge', en: 'Sort order' },
      type: 'number',
      admin: {
        position: 'sidebar',
        description: {
          de: 'Kleinere Zahl = weiter vorne im Raster (1, 2, 3, …).',
          en: 'Lower number = earlier in the grid (1, 2, 3, …).',
        },
      },
    },
  ],
  admin: {
    useAsTitle: 'titleDE',
    group: { de: 'Speisekarte', en: 'Menu' },
    defaultColumns: ['titleDE', 'priceSmall', 'priceLarge', 'position'],
    description: {
      de: 'Die Steak-Karten im 3er-Raster des Bereichs STEAKS (/speisekarte). Jeder Cut zeigt zwei Portionsgrößen: Gewicht | Preis.',
      en: 'The steak cards in the 3-column grid of the STEAKS section (/speisekarte). Each cut shows two portion sizes: weight | price.',
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
