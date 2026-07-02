import type { Block } from 'payload'

/**
 * Renders one of the fixed legal documents
 * (Impressum, Datenschutz, Widerrufsbelehrung).
 */
export const LegalContentBlock: Block = {
  slug: 'legalContent',
  interfaceName: 'LegalContentBlockType',
  labels: { singular: 'Legal Content', plural: 'Legal Contents' },
  fields: [
    {
      name: 'document',
      type: 'select',
      required: true,
      options: [
        { label: 'Impressum', value: 'impressum' },
        { label: 'Datenschutz', value: 'datenschutz' },
        { label: 'Widerrufsbelehrung', value: 'widerrufsbelehrung' },
      ],
    },
  ],
}
