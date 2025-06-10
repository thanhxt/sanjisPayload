import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/posts/hooks'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'Mitarbeiter',
      type: 'text',
    },
    {
      name: 'Bild',
      type: 'relationship',
      relationTo: 'media',
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