import type { CollectionConfig } from 'payload'

/**
 * This is the order collection for the website.
 * It is used to manage orders and payments for the restaurant.
 */
export const Order: CollectionConfig = {
  slug: 'orders',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Order amount in the specified currency',
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
        description: 'Currency of the order amount',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Paid',
          value: 'paid',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
      ],
      admin: {
        description: 'Current status of the payment',
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address of the customer',
      },
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      admin: {
        description: 'Stripe Payment Intent ID for tracking the payment',
      },
    },
    {
      name: 'vouchers',
      type: 'relationship',
      relationTo: 'vouchers',
      hasMany: true,
      admin: {
        description: 'Vouchers used in this order',
      },
    },
    {
      name: 'orderItems',
      type: 'array',
      admin: {
        description: 'Items included in this order',
      },
      fields: [
        {
          name: 'itemName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the ordered item',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          defaultValue: 1,
          admin: {
            description: 'Quantity of the item',
          },
        },
        {
          name: 'unitPrice',
          type: 'number',
          required: true,
          admin: {
            description: 'Price per unit',
          },
        },
        {
          name: 'totalPrice',
          type: 'number',
          required: true,
          admin: {
            description: 'Total price for this item (quantity * unitPrice)',
          },
        },
      ],
    },
    {
      name: 'orderDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        description: 'Date when the order was placed',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'paymentDate',
      type: 'date',
      admin: {
        description: 'Date when the payment was completed',
        condition: (data) => data.paymentStatus === 'paid',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'customerName',
      type: 'text',
      admin: {
        description: 'Name of the customer',
      },
    },
    {
      name: 'customerPhone',
      type: 'text',
      admin: {
        description: 'Phone number of the customer',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Additional notes for the order',
      },
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether the order confirmation email was sent',
      },
    },
    {
      name: 'emailSentAt',
      type: 'date',
      admin: {
        description: 'Date when the order confirmation email was sent',
        condition: (data) => data.emailSent === true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  admin: {
    useAsTitle: 'customerEmail',
    defaultColumns: ['customerEmail', 'amount', 'currency', 'paymentStatus', 'orderDate'],
    group: 'Commerce',
  },
}
