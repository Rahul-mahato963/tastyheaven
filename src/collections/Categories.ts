import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access/admin'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
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
