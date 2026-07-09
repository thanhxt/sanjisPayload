import type { CollectionConfig } from 'payload'
import { checkRole } from '../user/access/checkRole'
import { allBlocks } from '@/blocks'
import { generatePreviewPath } from '@/lib/preview'
import { afterChangeHook, createRedirectOnSlugChange, formatSlug } from './hooks'

/**
 * Pages are built from an editable array of layout blocks and rendered
 * by the dynamic route at src/app/(frontend)/[[...slug]]/page.tsx.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    // Everyone can read published pages, editors/admins can also read drafts.
    read: ({ req: { user } }) => {
      if (checkRole(['admin', 'editor'], user)) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
    update: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Build pages from layout blocks. Changes appear live in the preview panel.',
    livePreview: {
      url: ({ data, req }) => generatePreviewPath({ slug: data?.slug, req }),
    },
    preview: (data, { req }) => generatePreviewPath({ slug: data?.slug as string, req }),
  },
  versions: {
    drafts: {
      autosave: {
        interval: 800, // keeps live preview responsive without flooding the API
      },
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: "URL path of the page (e.g. 'about'). Use 'home' for the start page.",
      },
      hooks: {
        beforeValidate: [formatSlug],
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
      admin: {
        description: 'The sections of this page, rendered top to bottom.',
      },
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Show a link to this page in the navbar and footer.',
      },
    },
    {
      name: 'navOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Sort order of the link in the navbar (lower = further left).',
      },
    },
    {
      name: 'navLabel',
      type: 'group',
      label: 'Nav label (optional, defaults to the page title)',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'de', label: 'Deutsch', type: 'text' },
        { name: 'en', label: 'English', type: 'text' },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
  hooks: {
    afterChange: [afterChangeHook, createRedirectOnSlugChange],
  },
}
