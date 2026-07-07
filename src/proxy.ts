import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ipCache = new Map<string, { count: number; lastRequest: number }>()

// Configuration
const MAX_REQUESTS = 20 // Maximum requests per window (anonymous traffic)
const ADMIN_MAX_REQUESTS = 600 // Admin panel traffic (autosave + live preview are chatty)
const WINDOW_MS = 60 * 1000 // 1 minute window

// These routes trigger emails/payments and always use the strict limit,
// even when a (potentially forged) admin session cookie is present.
const SENSITIVE_PATHS = [
  '/api/send-email',
  '/api/send-email-node',
  '/api/send-captcha',
  '/api/send-order-confirmation',
  '/api/create-order',
  '/api/create-voucher',
  '/api/stripe',
  '/api/test-email',
]

export function proxy(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname.startsWith('/(payload)/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'anonymous'

    const isSensitive = SENSITIVE_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))
    const hasAdminSession = request.cookies.has('payload-token')
    const maxRequests = !isSensitive && hasAdminSession ? ADMIN_MAX_REQUESTS : MAX_REQUESTS

    // Separate buckets so chatty admin panel traffic does not
    // exhaust the strict budget of the sensitive routes.
    const cacheKey = `${ip}|${maxRequests}`

    const now = Date.now()
    const rateData = ipCache.get(cacheKey)

    if (!rateData) {
      // First request from this IP
      ipCache.set(cacheKey, { count: 1, lastRequest: now })
    } else {
      // Existing IP, check time window
      if (now - rateData.lastRequest > WINDOW_MS) {
        // Window expired, reset count
        ipCache.set(cacheKey, { count: 1, lastRequest: now })
      } else {
        // Within window, check count
        if (rateData.count >= maxRequests) {
          console.warn(`[RATE LIMIT] 🚫 Blocked | IP: ${ip} | Path: ${request.nextUrl.pathname} | Requests: ${rateData.count}`)
          return new NextResponse(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            {
              status: 429,
              headers: { 'Content-Type': 'application/json' }
            }
          )
        }
        // Increment count
        rateData.count += 1
      }
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/:path*',
    '/(payload)/api/:path*',
  ],
}
