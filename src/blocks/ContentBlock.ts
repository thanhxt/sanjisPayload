import type { Block } from 'payload'
import { bilingualText } from './fields'

/**
 * Two-column media + text section with an optional call-to-action button
 * (previously the Introduction section and the About hero section).
 */
export const ContentBlock: Block = {
  slug: 'mediaText',
  interfaceName: 'ContentBlockType',
  labels: { singular: 'Media + Text', plural: 'Media + Text' },
  imageURL: '/block-previews/media-text.svg',
  fields: [
    bilingualText('heading', { label: 'Heading', required: true }),
    bilingualText('body', { label: 'Body (blank line starts a new paragraph)', textarea: true }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Image from the media library.' },
    },
    {
      name: 'heroSlug',
      type: 'text',
      admin: {
        description:
          "Alternatively: title of an entry in the Hero collection (e.g. 'aboutHero'). Used when no image is selected.",
      },
    },
    {
      name: 'staticSrc',
      type: 'text',
      admin: {
        description: 'Alternatively: path to an image in /public (e.g. /LandingPageImage1.jpg).',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image right', value: 'right' },
        { label: 'Image left', value: 'left' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to action (optional)',
      fields: [
        bilingualText('label', { label: 'Button label' }),
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
