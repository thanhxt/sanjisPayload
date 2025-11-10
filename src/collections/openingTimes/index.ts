import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/openingTimes/hooks'
import { checkRole } from '../user/access/checkRole'

export const OpeningTimes: CollectionConfig = {
  slug: 'Oeffnungzeiten',
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkRole(['admin','editor'], user),
    update: ({ req: { user } }) => checkRole(['admin','editor'], user),
    delete: ({ req: { user } }) => checkRole(['admin','editor'], user),
  },
  fields: [
    {
        name: 'Feld1',
        type: 'text',
        required: true,
    },
    {
        name: 'Uhrzeit1',
        type: 'text',
    },
    {
        name: 'Feld2',
        type: 'text',
    },
    {
        name: 'Uhrzeit2',
        type: 'text',
    },
    {
        name: 'Feld3',
        type: 'text'
    },
    {
        name: 'Uhrzeit3',
        type: 'text',
    },
  ],
  admin: {
    useAsTitle: 'Feld1',
    description: 'Manage opening times',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}