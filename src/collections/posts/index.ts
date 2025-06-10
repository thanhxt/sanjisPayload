import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/posts/hooks'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'Mitarbeiter',
      type: 'text',
      required: true,
    },
    {
      name: 'Bild',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'beschreibung',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}