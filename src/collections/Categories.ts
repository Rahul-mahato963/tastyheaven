import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt'],
    group: 'Menu',
  },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
  timestamps: true,
}
