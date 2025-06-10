import type { CollectionConfig } from 'payload'
import { afterChangeHook } from './hooks'

export const Hero: CollectionConfig = {
  slug: 'hero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}