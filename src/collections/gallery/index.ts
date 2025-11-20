import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/gallery/hooks'
import { checkRole } from '../user/access/checkRole'

/**
 * This is the gallery collection for the website.
 * It is used to manage the gallery of the website.
 */
export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    read: ({ req: { user } }) => checkRole(['admin'], user),
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
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}