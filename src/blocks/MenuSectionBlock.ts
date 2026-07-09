import type { Block } from 'payload'
import { bilingualText, anchorIdField } from './fields'

/**
 * One menu section (e.g. VORSPEISE, STEAKS, HAUPTSPEISE), fully edited
 * inside the page layout. Renders as a large collapsible accordion row;
 * stacking several menuSection blocks recreates the classic menu page.
 *
 * A section contains groups (e.g. steak cuts / Sanji's choice / sides),
 * each with its own layout and dishes.
 */
export const MenuSectionBlock: Block = {
  slug: 'menuSection',
  interfaceName: 'MenuSectionBlockType',
  labels: { singular: 'Menu Section (Speisekarte)', plural: 'Menu Sections (Speisekarte)' },
  imageURL: '/block-previews/menu.svg',
  fields: [
    bilingualText('heading', { label: 'Section heading (e.g. VORSPEISE / STARTERS)', required: true }),
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Group', plural: 'Groups' },
      admin: {
        description:
          "Groups inside this section, e.g. 'Steak Cuts', 'Sharing Steaks', 'Beilagen'. A simple section has one group without a title.",
      },
      fields: [
        bilingualText('title', { label: 'Group title (optional)' }),
        bilingualText('intro', { label: 'Intro text (optional)', textarea: true }),
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'list',
          required: true,
          options: [
            { label: 'List (name, dotted line, price)', value: 'list' },
            { label: 'Cards (3-column grid)', value: 'cards' },
          ],
        },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Dish', plural: 'Dishes' },
          fields: [
            { name: 'name', type: 'text', required: true },
            bilingualText('subtitle', { label: 'Subtitle (optional)' }),
            bilingualText('description', { label: 'Description (optional)', textarea: true }),
            bilingualText('region', { label: 'Region / origin (optional)' }),
            {
              name: 'prices',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Price line', plural: 'Price lines' },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  admin: { description: "Optional, e.g. '300g' or 'Bistro Filet'." },
                },
                {
                  name: 'price',
                  type: 'text',
                  required: true,
                  admin: { description: "Free text, e.g. '24,90' or '39 pro 100g'." },
                },
              ],
            },
            {
              name: 'highlight',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: "Render as a highlighted box (like Sanji's Choice)." },
            },
          ],
        },
      ],
    },
    bilingualText('note', { label: 'Note below the section (optional, e.g. allergens)', textarea: true }),
    anchorIdField,
  ],
}
