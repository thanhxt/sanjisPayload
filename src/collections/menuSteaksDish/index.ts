import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSteaksDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSteaksDish: CollectionConfig = {
  slug: 'menuSteaksDish',
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkRole(['admin'], user),
    update: ({ req: { user } }) => checkRole(['admin'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'titleDE',
      type: 'text',
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
    {
        name: 'regionDE',
        type: 'text',
    },
    {
        name: 'regionEN',
        type: 'text',
    },
    {
        name: 'weightSmall',
        type: 'number',
    },
    {
      name: 'priceSmall',
      type: 'number',
    },
    {
        name: 'weightLarge',
        type: 'number',
    },
    {
        name: 'priceLarge',
        type: 'number',
    },
    {
        name: 'position',
        type: 'number',
    },
  ],
  admin: {
    useAsTitle: 'titleDE',
    group: 'Menu',
    description: 'Manage steaks dishes',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}