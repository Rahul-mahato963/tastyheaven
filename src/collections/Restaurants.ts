import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access/admin'

export const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'cuisine', 'featured', 'createdAt'],
    group: 'Restaurants',
  },
  fields: [
    { name: 'name', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea' },
    { name: 'cuisine', type: 'text', required: true },
    { name: 'rating', type: 'number', min: 0, max: 5, defaultValue: 4.8 },
    { name: 'deliveryTime', type: 'text', defaultValue: '20-30 min' },
    { name: 'deliveryFee', type: 'number', min: 0, defaultValue: 0 },
    { name: 'featured', type: 'checkbox', defaultValue: false, index: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
  timestamps: true,
}
