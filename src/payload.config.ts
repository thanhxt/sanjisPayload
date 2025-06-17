import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Team } from './collections/team'
import { Media } from './collections/media'
import { Hero } from './collections/hero'
import { Admins } from './collections/auth/admin'
import { MenuMainDish } from './collections/menuMainDish'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Team,
    Media,
    Hero,
    Admins,
    MenuMainDish,
  ],
  upload: {
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
    },
  },
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