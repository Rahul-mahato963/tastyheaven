import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Restaurants } from './collections/Restaurants'
import { MenuItems } from './collections/MenuItems'
import { Categories } from './collections/Categories'
import { Orders } from './collections/Orders'
import { StoreSettings } from './globals/StoreSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

if (process.env.VERCEL && !blobToken) {
  throw new Error(
    'BLOB_READ_WRITE_TOKEN is required on Vercel. Add a Vercel Blob read-write token to the project environment variables and redeploy.',
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Restaurants, MenuItems, Categories, Orders],
  globals: [StoreSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: blobToken
    ? [
        vercelBlobStorage({
          collections: {
            media: {
              prefix: 'media',
            },
          },
          clientUploads: true,
          token: blobToken,
        }),
      ]
    : [],
})
