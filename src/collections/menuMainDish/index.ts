import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuMainDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuMainDish: CollectionConfig = {
  slug: 'menuMainDish',
  access: {
    read: ({ req: { user } }) => checkRole(['admin'], user),
    create: ({ req: { user } }) => checkRole(['admin'], user),
    update: ({ req: { user } }) => checkRole(['admin'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'position',
      type: 'number',
    },
    {
      name: 'titleDE',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'descriptionDE',
      type: 'text',
    },
    {
      name: 'descriptionEN',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}