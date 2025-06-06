import type { CollectionConfig } from 'payload'

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
}