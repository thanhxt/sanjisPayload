import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Deletes every Pages document except the landing page ('home'),
 * so all other pages can be rebuilt from scratch in the Pages tab.
 *
 * Run with: npm run cleanup:pages
 */

const cleanup = async (): Promise<void> => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { not_equals: 'home' } },
    limit: 200,
    draft: true,
    select: { slug: true },
  })

  if (result.docs.length === 0) {
    console.log('[CLEANUP] No pages to delete')
    return
  }

  for (const page of result.docs) {
    await payload.delete({ collection: 'pages', id: page.id })
    console.log(`[CLEANUP] Deleted page '${page.slug}'`)
  }
}

cleanup()
  .then(() => {
    console.log('[CLEANUP] Done')
    process.exit(0)
  })
  .catch((error) => {
    console.error('[CLEANUP] Failed', error)
    process.exit(1)
  })
