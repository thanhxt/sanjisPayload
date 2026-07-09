import type { CollectionConfig, FieldHook } from 'payload'
import { checkRole } from '../user/access/checkRole'
import { normalizeRedirectPath } from '@/lib/redirects'

const normalizePathHook: FieldHook = ({ value }) => normalizeRedirectPath(value) ?? value

/**
 * Redirects old page paths to new ones, so links keep working when a
 * page slug changes. Renaming a published page creates one automatically.
 */
export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: {
    singular: { de: 'Weiterleitung', en: 'Redirect' },
    plural: { de: 'Weiterleitungen', en: 'Redirects' },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
    update: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
    delete: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
  },
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'updatedAt'],
    description: {
      de: 'Leitet alte Seitenpfade auf neue um (z.B. nach dem Umbenennen einer Seite). Wird beim Umbenennen veröffentlichter Seiten automatisch angelegt.',
      en: 'Redirects old page paths to new ones (e.g. after renaming a page). Created automatically when a published page is renamed.',
    },
  },
  fields: [
    {
      name: 'from',
      label: { de: 'Alter Pfad', en: 'Old path' },
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [normalizePathHook] },
      admin: {
        description: {
          de: "Der alte Pfad ohne führenden Schrägstrich, z.B. 'ueber-uns'.",
          en: "The old path without a leading slash, e.g. 'ueber-uns'.",
        },
      },
    },
    {
      name: 'to',
      label: { de: 'Neuer Pfad', en: 'New path' },
      type: 'text',
      required: true,
      hooks: { beforeValidate: [normalizePathHook] },
      admin: {
        description: {
          de: "Das Ziel, z.B. 'about' — oder 'home' für die Startseite.",
          en: "The target, e.g. 'about' — or 'home' for the start page.",
        },
      },
    },
  ],
}
