import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuMainDish/hooks'

export const MenuMainDish: CollectionConfig = {
  slug: 'menuMainDish',
  access: {
    read: () => true,
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