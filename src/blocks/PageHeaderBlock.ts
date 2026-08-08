import type { Block } from 'payload'
import { bilingualText } from './fields'

/**
 * Compact page banner with a blurred background image and a centered
 * heading (previously the hardcoded header of the Kontakt page).
 */
export const PageHeaderBlock: Block = {
  slug: 'pageHeader',
  interfaceName: 'PageHeaderBlockType',
  labels: { singular: 'Page Header', plural: 'Page Headers' },
  imageURL: '/block-previews/page-header.svg',
  fields: [
    bilingualText('heading', { label: 'Heading', required: true }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Background image from the media library.' },
    },
    {
      name: 'heroSlug',
      type: 'text',
      admin: {
        description:
          "Alternatively: title of an entry in the Hero collection (e.g. 'kontaktHero'). Used when no image is selected.",
      },
    },
  ],
}
