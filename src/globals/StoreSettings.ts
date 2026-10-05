import type { GlobalConfig } from 'payload'
import { adminOnly } from '../access/admin'

export const StoreSettings: GlobalConfig = {
  slug: 'store-settings',
  label: 'Store settings',
  access: { read: () => true, update: adminOnly },
  admin: { group: 'Store' },
  fields: [
    {
      name: 'esewaNumber',
      label: 'eSewa payment number',
      type: 'text',
      required: true,
      defaultValue: '9800000000',
      admin: { description: 'Demo placeholder. Replace with your restaurant eSewa number before accepting payments.' },
    },
  ],
}
