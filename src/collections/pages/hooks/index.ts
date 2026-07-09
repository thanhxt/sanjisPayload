import type { CollectionAfterChangeHook, FieldHook } from 'payload'
import { revalidatePaths } from '@/lib/revalidate-paths'
import { pagePath } from '@/lib/preview'

/**
 * Normalizes the slug so it is URL safe. Falls back to the page title.
 */
export const formatSlug: FieldHook = ({ value, data }) => {
  const source = typeof value === 'string' && value.length > 0 ? value : data?.title

  if (typeof source !== 'string') return value

  return source
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9/-]/g, '')
    .replace(/\/{2,}/g, '/')
    .replace(/^\/|\/$/g, '')
}

/**
 * Revalidates the page path whenever a page is published or updated.
 */
export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  // Autosaved drafts should not purge the public cache.
  if (doc._status !== 'published' && previousDoc?._status !== 'published') return doc

  const paths = new Set<string>([pagePath(doc.slug)])
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    paths.add(pagePath(previousDoc.slug))
  }

  // Navbar/footer links are built from published pages, so refresh the
  // static routes that would otherwise keep a stale navigation.
  paths.add('/')
  paths.add('/speisekarte')
  paths.add('/voucher')

  await revalidatePaths({ paths: [...paths], req })

  return doc
}

/**
 * When a published page's slug changes, keep the old path working by
 * creating (or retargeting) a redirect from the old slug to the new one.
 */
export const createRedirectOnSlugChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (doc._status !== 'published') return doc

  const oldSlug = previousDoc?.slug
  if (!oldSlug || oldSlug === doc.slug || oldSlug === 'home') return doc

  try {
    const existing = await req.payload.find({
      collection: 'redirects',
      where: { from: { equals: oldSlug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await req.payload.update({
        collection: 'redirects',
        id: existing.docs[0].id,
        data: { to: doc.slug },
      })
    } else {
      await req.payload.create({
        collection: 'redirects',
        data: { from: oldSlug, to: doc.slug },
      })
    }

    // Redirects pointing at the old slug would now chain; retarget them.
    const chained = await req.payload.find({
      collection: 'redirects',
      where: { to: { equals: oldSlug } },
      limit: 100,
    })
    for (const redirectDoc of chained.docs) {
      await req.payload.update({
        collection: 'redirects',
        id: redirectDoc.id,
        data: { to: doc.slug },
      })
    }
  } catch (error) {
    console.warn(`[REDIRECTS] Could not create redirect ${oldSlug} -> ${doc.slug}`, error)
  }

  return doc
}
