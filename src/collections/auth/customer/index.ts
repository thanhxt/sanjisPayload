import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    loginWithUsername: {
        allowEmailLogin: true,
        requireEmail: true,
    }
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}