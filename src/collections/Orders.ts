import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'phone', 'total', 'paymentStatus', 'createdAt'],
    group: 'Store',
  },
  fields: [
    { name: 'customerName', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'deliveryAddress', type: 'textarea', required: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'itemId', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'quantity', type: 'number', required: true, min: 1 },
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
      ],
    },
    { name: 'total', type: 'number', required: true, min: 0 },
    { name: 'paymentReference', type: 'text', required: true },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'reference-submitted',
      options: [
        { label: 'Reference submitted - verify in eSewa', value: 'reference-submitted' },
        { label: 'Payment verified', value: 'verified' },
      ],
    },
    { name: 'orderStatus', type: 'select', required: true, defaultValue: 'new', options: ['new', 'preparing', 'ready', 'completed', 'cancelled'] },
  ],
  timestamps: true,
}
