import type { Block } from 'payload'

/**
 * Free-form rich text content, one editor per language.
 */
export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlockType',
  labels: { singular: 'Rich Text', plural: 'Rich Texts' },
  imageURL: '/block-previews/rich-text.svg',
  fields: [
    {
      name: 'content',
      type: 'group',
      fields: [
        { name: 'de', label: 'Deutsch', type: 'richText' },
        { name: 'en', label: 'English', type: 'richText' },
      ],
    },
  ],
}
