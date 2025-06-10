import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/team/hooks'

export const Team: CollectionConfig = {
  slug: 'team',
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