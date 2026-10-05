import type { Access } from 'payload'

// The users collection is the CMS login collection, so a signed-in user is an
// administrator with access to the Payload admin panel.
export const adminOnly: Access = ({ req }) => Boolean(req.user)

// Payload's first-user setup happens before anyone can sign in. Permit that
// one bootstrap account, then require an authenticated admin for new users.
export const adminOrFirstUser: Access = async ({ req }) => {
  if (req.user) return true
  const users = await req.payload.count({ collection: 'users', overrideAccess: true })
  return users.totalDocs === 0
}
