import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ipCache = new Map<string, { count: number; lastRequest: number }>()

// Configuration
const MAX_REQUESTS = 20 // Maximum requests per window
const WINDOW_MS = 60 * 1000 // 1 minute window

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname.startsWith('/(payload)/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'anonymous'

    const now = Date.now()
    const rateData = ipCache.get(ip)

    if (!rateData) {
      // First request from this IP
      ipCache.set(ip, { count: 1, lastRequest: now })
    } else {
      // Existing IP, check time window
      if (now - rateData.lastRequest > WINDOW_MS) {
        // Window expired, reset count
        ipCache.set(ip, { count: 1, lastRequest: now })
      } else {
        // Within window, check count
        if (rateData.count >= MAX_REQUESTS) {
          console.warn(`[RATE LIMIT] Blocked IP: ${ip} for path: ${request.nextUrl.pathname}`)
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
