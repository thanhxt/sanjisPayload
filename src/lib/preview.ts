import type { PayloadRequest } from 'payload'

const LOCAL_BASE_URL = 'http://localhost:3000'

const getRequestOrigin = (req?: PayloadRequest): string | null => {
  const host = req?.headers?.get?.('host')
  if (!host) return null

  const forwardedProto = req?.headers?.get?.('x-forwarded-proto')
  const protocol = forwardedProto || (host.includes('localhost') ? 'http' : 'https')
  return `${protocol}://${host}`
}

/** Frontend path a page document is rendered at. */
export const pagePath = (slug?: string | null): string =>
  !slug || slug === 'home' ? '/' : `/${slug}`

/**
 * URL of the draft-mode preview route for a page document.
 * Used by both the admin Live Preview panel and the preview button.
 */
export const generatePreviewPath = ({
  slug,
  req,
}: {
  slug?: string | null
  req?: PayloadRequest
}): string => {
  const baseUrl = getRequestOrigin(req) || process.env.NEXT_PUBLIC_SITE_URL || LOCAL_BASE_URL
  const params = new URLSearchParams({ path: pagePath(slug) })
  return `${baseUrl}/next/preview?${params.toString()}`
}
