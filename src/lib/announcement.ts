import { getPayload } from 'payload'
import config from '@payload-config'
import type { Announcement } from '../../payload-types'

/** Loads the site-wide announcement (speech bubble) global. */
export const getAnnouncement = async (): Promise<Announcement | null> => {
  try {
    const payload = await getPayload({ config })
    const announcement = await payload.findGlobal({ slug: 'announcement' })
    if (!announcement?.enabled) return null
    return announcement
  } catch {
    // Without a database (e.g. during CI builds) no bubble is shown.
    return null
  }
}
