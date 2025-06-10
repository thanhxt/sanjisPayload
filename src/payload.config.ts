import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Pages } from './collections/pages'
import { Posts } from './collections/posts'
import { Nav } from './globals/nav'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { Media } from './collections/media'
import { Customers } from './collections/auth/customer'
import { Admins } from './collections/auth/admin'
import { Hero } from './collections/hero'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Pages,
    Posts,
    Media,
    Customers,
    Admins,
    Hero,
  ],
  upload: {
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
    },
  },
  // Define and configure your globals in this array
  globals: [
    Nav,
  ],
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { de, en },
  },
  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})