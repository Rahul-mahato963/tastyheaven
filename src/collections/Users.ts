import type { CollectionConfig } from 'payload'
import { adminOnly, adminOrFirstUser } from '../access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req }) => Boolean(req.user?.role === 'admin'),
    create: adminOrFirstUser,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      saveToJWT: true,
      options: [{ label: 'Admin', value: 'admin' }],
      access: {
        update: ({ req }) => Boolean(req.user?.role === 'admin'),
      },
    },
  ],
}
