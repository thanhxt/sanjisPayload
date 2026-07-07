import type { Block } from 'payload'
import { bilingualText } from './fields'

/**
 * Centered heading + text with one or more link buttons.
 */
export const CallToActionBlock: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlockType',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  imageURL: '/block-previews/cta.svg',
  fields: [
    bilingualText('heading', { label: 'Heading', required: true }),
    bilingualText('text', { label: 'Text', textarea: true }),
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      fields: [
        bilingualText('label', { label: 'Button label', required: true }),
        { name: 'url', type: 'text', required: true },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Open the link in a new tab.' },
        },
      ],
    },
  ],
}
