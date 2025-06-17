import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/collections/menuAppetizerDish/hooks'

export const MenuAppetizerDish: CollectionConfig = {
  slug: 'menuAppetizerDish',
  access: {
    read: () => true,
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
  hooks: {
    afterChange: [afterChangeHook],
  },
}