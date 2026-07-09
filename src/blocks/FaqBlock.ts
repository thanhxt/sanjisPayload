import type { Block } from 'payload'
import { bilingualText, anchorIdField } from './fields'

/**
 * Accordion with frequently asked questions
 * (e.g. parking, reservations, allergens).
 */
export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlockType',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  imageURL: '/block-previews/faq.svg',
  fields: [
    bilingualText('heading', { label: 'Heading (optional)' }),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Question', plural: 'Questions' },
      fields: [
        bilingualText('question', { label: 'Question', required: true }),
        bilingualText('answer', { label: 'Answer', required: true, textarea: true }),
      ],
    },
    anchorIdField,
  ],
}
