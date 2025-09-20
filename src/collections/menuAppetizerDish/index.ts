import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuAppetizerDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuAppetizerDish: CollectionConfig = {
  slug: 'menuAppetizerDish',
  access: {
    read: () => true,
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
      name: 'title',
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
  admin: {
    useAsTitle: 'title',
    group: 'Menu',
    description: 'Manage appetizer dishes',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}