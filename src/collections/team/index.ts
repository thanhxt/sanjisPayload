import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/team/hooks'

/**
 * This is the team collection for the website.
 * It is used to manage the team of the website.
 */
export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    read: () => true,
  },
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