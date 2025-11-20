import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuSteaksDish/hooks'
import { checkRole } from '../user/access/checkRole'

export const MenuSanjisChoice: CollectionConfig = {
  slug: 'menuSanjisChoice',
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
        name: 'steaktitle',
        type: 'text',
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
        name: 'stake1',
        type: 'text',
    },
    {
        name: 'price1',
        type: 'number',
    },
    {
        name: 'stakeWeight1',
        type: 'number',
    },
    {
        name: 'stake2',
        type: 'text',
    },
    {
        name: 'price2',
        type: 'number',
    },
    {
        name: 'stakeWeight2',
        type: 'number',
    },
  ],
  admin: {
    useAsTitle: 'titleDE',
    group: 'Menu',
    description: 'Manage sanjis choice',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}