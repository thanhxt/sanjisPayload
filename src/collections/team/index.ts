import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/team/hooks'
import { checkRole } from '../user/access/checkRole'

/**
 * This is the team collection for the website.
 * It is used to manage the team of the website.
 */
export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    read: ({ req: { user } }) => checkRole(['admin'], user),
    create: ({ req: { user } }) => checkRole(['admin'], user),
    update: ({ req: { user } }) => checkRole(['admin'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),

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