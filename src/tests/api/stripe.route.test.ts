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

describe('POST /api/stripe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllEnvs()
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://sanjis.example')
    vi.stubEnv('ALLOWED_ORIGINS', '')
    mockCreate.mockResolvedValue({ client_secret: 'cs_test_123' })
  })

  it('returns the client secret', async () => {
    const { res } = await callWithHeaders({ origin: 'https://sanjis.example' })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ clientSecret: 'cs_test_123' })
  })

  it('uses the request origin when it matches the site URL', async () => {
    const { returnUrl } = await callWithHeaders({ origin: 'https://sanjis.example' })

    expect(returnUrl).toBe('https://sanjis.example/return?session_id={CHECKOUT_SESSION_ID}')
  })

  it('falls back to the site URL when no Origin or Referer header is sent', async () => {
    const { returnUrl } = await callWithHeaders()

    expect(returnUrl).toBe('https://sanjis.example/return?session_id={CHECKOUT_SESSION_ID}')
  })

  it('ignores a foreign Origin header', async () => {
    const { returnUrl } = await callWithHeaders({ origin: 'https://evil.example' })

    expect(returnUrl).toBe('https://sanjis.example/return?session_id={CHECKOUT_SESSION_ID}')
  })

  it('ignores a malformed Origin header', async () => {
    const { returnUrl } = await callWithHeaders({ origin: 'null' })

    expect(returnUrl).toBe('https://sanjis.example/return?session_id={CHECKOUT_SESSION_ID}')
  })

  it('uses the Referer origin when Origin is missing', async () => {
    vi.stubEnv('ALLOWED_ORIGINS', 'https://www.sanjis.example')
    const { returnUrl } = await callWithHeaders({ referer: 'https://www.sanjis.example/checkout?x=1' })

    expect(returnUrl).toBe('https://www.sanjis.example/return?session_id={CHECKOUT_SESSION_ID}')
  })

  it('accepts origins listed in ALLOWED_ORIGINS', async () => {
    vi.stubEnv('ALLOWED_ORIGINS', 'https://www.sanjis.example, https://staging.sanjis.example')
    const { returnUrl } = await callWithHeaders({ origin: 'https://staging.sanjis.example' })

    expect(returnUrl).toBe('https://staging.sanjis.example/return?session_id={CHECKOUT_SESSION_ID}')
  })

  it('falls back to localhost when NEXT_PUBLIC_SITE_URL is unset', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '')
    const { returnUrl } = await callWithHeaders({ origin: 'https://evil.example' })

    expect(returnUrl).toBe('http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}')
  })

  it('returns 500 when Stripe fails', async () => {
    mockCreate.mockRejectedValue(new Error('stripe down'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const { res } = await callWithHeaders({ origin: 'https://sanjis.example' })

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Failed to create checkout session' })
  })
})
