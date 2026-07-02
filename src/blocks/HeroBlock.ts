import type { Block } from 'payload'
import { bilingualText } from './fields'

/**
 * Full-screen hero with a video or image background,
 * the Sanji's logo and a scroll indicator (previously the landing page).
 */
export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlockType',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'backgroundType',
      type: 'select',
      required: true,
      defaultValue: 'video',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
        description: 'Background image from the media library.',
      },
    },
    {
      name: 'backgroundSrc',
      type: 'text',
      admin: {
        description:
          'Path to a file in /public (e.g. /LandingPageVideo2.MOV). Used for videos or when no media is selected.',
      },
    },
    {
      name: 'showLogo',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: "Show the Sanji's logo in the center." },
    },
    bilingualText('heading', { label: 'Heading (optional, shown below the logo)' }),
    {
      name: 'showScrollIndicator',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
