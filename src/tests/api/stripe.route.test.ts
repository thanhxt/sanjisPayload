import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockCreate, requestHeaders } = vi.hoisted(() => ({
  mockCreate: vi.fn(),
  requestHeaders: { current: new Headers() },
}))

vi.mock('next/headers', () => ({
  headers: vi.fn(async () => requestHeaders.current),
}))

vi.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: mockCreate,
      },
    },
  },
}))

import { POST } from '@/app/(frontend)/api/stripe/route'

const callWithHeaders = async (init: Record<string, string> = {}) => {
  requestHeaders.current = new Headers(init)
  const res = await POST(new Request('http://localhost/api/stripe', { method: 'POST' }) as never)
  return { res, returnUrl: mockCreate.mock.calls.at(-1)?.[0]?.return_url as string | undefined }
}

const returnUrlFor = (origin: string) => `${origin}/return?session_id={CHECKOUT_SESSION_ID}`

describe('POST /api/stripe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllEnvs()
    // Mirrors production: NEXT_PUBLIC_SITE_URL is an internal URL, the public domain is allowlisted.
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3005')
    vi.stubEnv('ALLOWED_ORIGINS', 'https://sanjis.example, https://www.sanjis.example')
    mockCreate.mockResolvedValue({ client_secret: 'cs_test_123' })
  })

  it('returns the client secret', async () => {
    const { res } = await callWithHeaders({ origin: 'https://sanjis.example' })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ clientSecret: 'cs_test_123' })
  })

  it('uses the request origin when it is allowlisted', async () => {
    const { returnUrl } = await callWithHeaders({ origin: 'https://www.sanjis.example' })

    expect(returnUrl).toBe(returnUrlFor('https://www.sanjis.example'))
  })

  it('falls back to the first allowlisted origin when no Origin or Referer header is sent', async () => {
    const { returnUrl } = await callWithHeaders()

    expect(returnUrl).toBe(returnUrlFor('https://sanjis.example'))
  })

  it('ignores a foreign Origin header', async () => {
    const { returnUrl } = await callWithHeaders({ origin: 'https://evil.example' })

    expect(returnUrl).toBe(returnUrlFor('https://sanjis.example'))
  })

  it('ignores a malformed Origin header', async () => {
    const { returnUrl } = await callWithHeaders({ origin: 'null' })

    expect(returnUrl).toBe(returnUrlFor('https://sanjis.example'))
  })

  it('uses the Referer origin when Origin is missing', async () => {
    const { returnUrl } = await callWithHeaders({ referer: 'https://www.sanjis.example/voucher?x=1' })

    expect(returnUrl).toBe(returnUrlFor('https://www.sanjis.example'))
  })

  it('accepts the NEXT_PUBLIC_SITE_URL origin for local development', async () => {
    const { returnUrl } = await callWithHeaders({ origin: 'http://localhost:3005' })

    expect(returnUrl).toBe(returnUrlFor('http://localhost:3005'))
  })

  describe('without ALLOWED_ORIGINS', () => {
    beforeEach(() => {
      vi.stubEnv('ALLOWED_ORIGINS', '')
    })

    it('keeps using the request origin as before', async () => {
      const { returnUrl } = await callWithHeaders({ origin: 'https://sanjis.example' })

      expect(returnUrl).toBe(returnUrlFor('https://sanjis.example'))
    })

    it('falls back to NEXT_PUBLIC_SITE_URL when no Origin header is sent', async () => {
      const { returnUrl } = await callWithHeaders()

      expect(returnUrl).toBe(returnUrlFor('http://localhost:3005'))
    })

    it('falls back to localhost:3000 when NEXT_PUBLIC_SITE_URL is unset too', async () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', '')
      const { returnUrl } = await callWithHeaders()

      expect(returnUrl).toBe(returnUrlFor('http://localhost:3000'))
    })
  })

  it('returns 500 when Stripe fails', async () => {
    mockCreate.mockRejectedValue(new Error('stripe down'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const { res } = await callWithHeaders({ origin: 'https://sanjis.example' })

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Failed to create checkout session' })
  })
})
