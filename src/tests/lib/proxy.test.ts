import { beforeEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy, resetRateLimit } from '@/proxy'

const makeRequest = (path: string, { ip, cookie }: { ip: string; cookie?: string }) =>
  new NextRequest(`http://localhost${path}`, {
    headers: {
      'x-forwarded-for': ip,
      ...(cookie ? { cookie } : {}),
    },
  })

describe('proxy rate limiting', () => {
  beforeEach(() => {
    resetRateLimit()
  })

  it('does not rate limit non-API routes', () => {
    for (let i = 0; i < 50; i++) {
      const res = proxy(makeRequest('/speisekarte', { ip: '10.0.0.1' }))
      expect(res.status).toBe(200)
    }
  })

  it('blocks anonymous traffic after 20 requests per window', () => {
    let blocked = 0
    for (let i = 0; i < 25; i++) {
      const res = proxy(makeRequest('/api/opening-times', { ip: '10.0.0.2' }))
      if (res.status === 429) blocked++
    }
    expect(blocked).toBe(5)
  })

  it('gives admin-session traffic a higher budget', () => {
    for (let i = 0; i < 100; i++) {
      const res = proxy(
        makeRequest('/api/pages/123?autosave=true', { ip: '10.0.0.3', cookie: 'payload-token=abc' }),
      )
      expect(res.status).toBe(200)
    }
  })

  it('keeps the strict limit on sensitive routes even with an admin cookie', () => {
    let blocked = 0
    for (let i = 0; i < 25; i++) {
      const res = proxy(
        makeRequest('/api/send-email-node', { ip: '10.0.0.4', cookie: 'payload-token=abc' }),
      )
      if (res.status === 429) blocked++
    }
    expect(blocked).toBe(5)
  })

  it('never rate limits media file serving', () => {
    for (let i = 0; i < 100; i++) {
      const res = proxy(makeRequest('/api/media/file/photo.jpg', { ip: '10.0.0.5' }))
      expect(res.status).toBe(200)
    }
  })

  it('tracks IPs independently', () => {
    for (let i = 0; i < 20; i++) {
      expect(proxy(makeRequest('/api/opening-times', { ip: '10.0.1.1' })).status).toBe(200)
    }
    expect(proxy(makeRequest('/api/opening-times', { ip: '10.0.1.1' })).status).toBe(429)
    expect(proxy(makeRequest('/api/opening-times', { ip: '10.0.1.2' })).status).toBe(200)
  })
})
