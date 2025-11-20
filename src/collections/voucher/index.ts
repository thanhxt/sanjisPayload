import type { CollectionConfig } from 'payload'
import { checkRole } from '../user/access/checkRole'

/**
 * This is the voucher collection for the website.
 * It is used to manage vouchers/gift cards for the restaurant.
 */
export const Voucher: CollectionConfig = {
  slug: 'vouchers',
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkRole(['admin','editor'], user),
    update: () => true,
    delete: ({ req: { user } }) => checkRole(['admin','editor'], user),
  },
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, req, operation, originalDoc }) => {
        if (operation !== 'update') return data
        const user = req?.user
        // Only use user.id, as _id is not present on the User type
        const editorId = user?.id
        const editorEmail = user?.email
        const now = new Date().toISOString()
        const previousHistory = Array.isArray(originalDoc?.editHistory) ? originalDoc.editHistory : []
        const newEntry = {
          editedAt: now,
          editor: editorId || null,
          editorEmail: editorEmail || null,
        }

        return {
          ...data,
          updatedBy: editorId || null,
          editHistory: [...previousHistory, newEntry],
        }
      },
    ],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      access: {
        update: ({ req: { user } }) => checkRole(['admin','editor'], user),
      },
      admin: {
        description: 'Unique voucher code (e.g., SANJIS2024)',
      },
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      access: {
        update: ({ req: { user } }) => checkRole(['admin','editor'], user),
      },
      admin: {
        description: 'Voucher value in the specified currency (e.g., 25 for 25€)',
      },
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      defaultValue: 'EUR',
      options: [
        {
          label: 'Euro (EUR)',
          value: 'EUR',
        },
        {
          label: 'US Dollar (USD)',
          value: 'USD',
        },
        {
          label: 'Swiss Franc (CHF)',
          value: 'CHF',
        },
      ],
      access: {
        update: ({ req: { user } }) => checkRole(['admin','editor'], user),
      },
      admin: {
        description: 'Currency of the voucher value',
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      access: {
        update: ({ req: { user } }) => checkRole(['admin','editor'], user),
      },
      admin: {
        description: 'Expiration date of the voucher',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'isRedeemed',
      type: 'checkbox',
      defaultValue: false,
      access:{
        update: ({ req: { user } }) => checkRole(['admin','editor','user'], user),        
      },
      admin: {
        description: 'Whether the voucher has been redeemed',
      },
    },
    {
      name: 'redeemedAt',
      type: 'date',
      admin: {
        description: 'Date when the voucher was redeemed',
        condition: (data) => data.isRedeemed === true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'orderId',
      type: 'text',
      access: {
        update: ({ req: { user } }) => checkRole(['admin','editor'], user),
      },
      admin: {
        description: 'Related order ID when voucher was used',
        condition: (data) => data.isRedeemed === true,
      },
    },
    {
      name: 'description',
      type: 'text',
      access: {
        update: ({ req: { user } }) => checkRole(['admin','editor'], user),
      },
      admin: {
        description: 'Optional description for the voucher',
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user),
      },
      admin: {
        description: 'Last user who edited this voucher',
        readOnly: true,
      },
    },
    {
      name: 'editHistory',
      type: 'array',
      defaultValue: [],
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user),
      },
      admin: {
        description: 'History of edits to this voucher',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'editedAt',
          type: 'date',
          required: true,
          admin: {
            readOnly: true,
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'editor',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'editorEmail',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'value', 'currency', 'expiresAt', 'isRedeemed', 'updatedBy'],
    group: 'Commerce',
  },
}