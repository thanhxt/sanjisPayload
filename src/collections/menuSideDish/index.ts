import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSideDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSideDish: CollectionConfig = {
  slug: 'menuSideDish',
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
      name: 'titleDE',
      type: 'text',
      required: true,
    },
    {
      name: 'titleEN',
      type: 'text',
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'side',
      options: [
        {
          label: 'Side (Beilage)',
          value: 'side',
        },
        {
          label: 'Sauce',
          value: 'sauce',
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'titleDE',
    group: 'Menu',
    description: 'Manage side dishes and sauces',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
