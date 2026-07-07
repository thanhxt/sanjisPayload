import type { Block } from 'payload'
import { bilingualText, anchorIdField } from './fields'

/**
 * A single image or video, e.g. a banner for special occasions
 * (New Year's menu, events). Can optionally link somewhere.
 */
export const MediaBlock: Block = {
  slug: 'mediaOnly',
  interfaceName: 'MediaBlockType',
  labels: { singular: 'Media (Bild/Video)', plural: 'Media (Bild/Video)' },
  imageURL: '/block-previews/media.svg',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Image from the media library.' },
    },
    {
      name: 'staticSrc',
      type: 'text',
      admin: {
        description:
          'Alternatively: path to a file in /public (e.g. /gallery1.mp4). Videos (.mp4/.mov/.webm) play automatically without sound.',
      },
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'contained',
      options: [
        { label: 'Contained (centered with margins)', value: 'contained' },
        { label: 'Full width', value: 'full' },
      ],
    },
    bilingualText('caption', { label: 'Caption (optional)' }),
    {
      name: 'link',
      type: 'group',
      label: 'Link (optional, makes the media clickable)',
      fields: [
        { name: 'url', type: 'text' },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Open the link in a new tab.' },
        },
      ],
    },
    anchorIdField,
  ],
}
