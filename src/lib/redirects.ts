import type { Payload } from 'payload'

/**
 * Normalizes a redirect path to the slug format used by the Pages
 * collection: lowercase, no leading/trailing slashes, no whitespace.
 */
export const normalizeRedirectPath = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined
  return value
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Looks up a redirect for a slug and returns the target path
 * (ready for next/navigation redirect), or null when none exists.
 */
export const findRedirectTarget = async (
  payload: Pick<Payload, 'find'>,
  slug: string,
): Promise<string | null> => {
  try {
    const result = await payload.find({
      collection: 'redirects',
      where: { from: { equals: slug } },
      limit: 1,
    })

    const target = result.docs[0]?.to
    if (!target || target === slug) return null

    return target === 'home' ? '/' : `/${target}`
  } catch {
    // A broken redirect lookup should never take the page down.
    return null
  }
}
