import type { CollectionConfig } from 'payload'
import { afterChangeHook } from './hooks'
import { checkRole } from '../user/access/checkRole'

/**
 * This is the hero collection for the website.
 * It is used to manage the hero section of the website.
 */
export const Hero: CollectionConfig = {
  slug: 'hero',
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkRole(['admin'], user),
    update: ({ req: { user } }) => checkRole(['admin'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),
  },
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