import type { GlobalConfig, GlobalAfterChangeHook } from 'payload'
import { checkRole } from '@/collections/user/access/checkRole'
import { bilingualText } from '@/blocks/fields'
import { revalidatePaths } from '@/lib/revalidate-paths'

/**
 * Site-wide announcement shown as a speech bubble at the bottom right,
 * e.g. holiday hours or a link to a special-occasion page.
 */
const afterChangeHook: GlobalAfterChangeHook = async ({ doc, req }) => {
  // CMS pages revalidate on their own; refresh the static routes.
  await revalidatePaths({ paths: ['/', '/speisekarte', '/voucher'], req })
  return doc
}

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  label: 'Announcement (Speech Bubble)',
  access: {
    read: () => true,
    update: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
  },
  admin: {
    description:
      'Shown as a speech bubble at the bottom right on every page while enabled. Visitors can dismiss it for their session.',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show the speech bubble on the website.' },
    },
    bilingualText('message', { label: 'Message', textarea: true }),
    {
      name: 'link',
      type: 'group',
      label: 'Link (optional button inside the bubble)',
      fields: [
        bilingualText('label', { label: 'Button label' }),
        { name: 'url', type: 'text' },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Open the link in a new tab.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}
