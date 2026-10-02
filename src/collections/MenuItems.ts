import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'restaurant', 'price', 'isPopular', 'isAvailable'],
    group: 'Menu',
  },
  fields: [
    { name: 'name', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea' },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'restaurant', type: 'relationship', relationTo: 'restaurants', required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'isPopular', type: 'checkbox', defaultValue: false, index: true },
    { name: 'isAvailable', type: 'checkbox', defaultValue: true, index: true },
  ],
  timestamps: true,
}
