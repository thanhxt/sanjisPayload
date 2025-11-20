import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSteaksSharing/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSteaksSharing: CollectionConfig = {
  slug: 'menuSteaksSharing',
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
    
    
  ],
  admin: {
    useAsTitle: 'titleDE',
    group: 'Menu',
    description: 'Manage steaks sharing',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}