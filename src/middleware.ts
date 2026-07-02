import { NextRequest, NextResponse } from 'next/server'

/**
 * Lightweight in-memory rate limiter for the public API surface.
 *
 * This protects unauthenticated write endpoints (contact mail, captcha,
 * consent logging) from flooding. It is per-instance and best-effort — for a
 * multi-instance deployment back this with a shared store (e.g. Upstash/Redis).
 */
const WINDOW_MS = 60_000
const MAX_REQUESTS = 20
const hits = new Map<string, { count: number; start: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = hits.get(ip)

  if (!record || now - record.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now })
    return false
  }

  record.count += 1
  return record.count > MAX_REQUESTS
}

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    )
  }

  return NextResponse.next()
}

export const config = {
  // Target only the unauthenticated public write endpoints. Route groups such
  // as (frontend)/(payload) do not appear in the URL, so these resolve to
  // /api/*. The Payload admin/GraphQL API (also under /api/*) is deliberately
  // excluded to avoid throttling authenticated CMS usage.
  matcher: [
    '/api/consent-logs',
    '/api/cleanup-consent-logs',
    '/api/send-email-node',
    '/api/send-captcha',
  ],
}
