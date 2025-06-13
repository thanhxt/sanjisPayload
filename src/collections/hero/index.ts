import type { CollectionConfig } from 'payload'
import { afterChangeHook } from './hooks'

/**
 * This is the hero collection for the website.
 * It is used to manage the hero section of the website.
 */
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