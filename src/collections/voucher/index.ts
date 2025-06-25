import type { CollectionConfig } from 'payload'

/**
 * This is the voucher collection for the website.
 * It is used to manage vouchers/gift cards for the restaurant.
 */
export const Voucher: CollectionConfig = {
  slug: 'vouchers',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique voucher code (e.g., SANJIS2024)',
      },
    },
    {
      name: 'value',
      type: 'number',
      required: true,
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
      admin: {
        description: 'Currency of the voucher value',
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
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
      admin: {
        description: 'Related order ID when voucher was used',
        condition: (data) => data.isRedeemed === true,
      },
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Optional description for the voucher',
      },
    },
  ],
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'value', 'currency', 'expiresAt', 'isRedeemed'],
    group: 'Commerce',
  },
}