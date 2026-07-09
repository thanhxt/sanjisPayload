import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockCreateSession } = vi.hoisted(() => ({
  mockCreateSession: vi.fn(),
}))

vi.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: mockCreateSession,
      },
    },
  },
}))

vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue({
    get: () => 'http://localhost:3000',
  }),
}))

import { POST } from '@/app/(frontend)/api/stripe/route'

const makeRequest = () =>
  new Request('http://localhost/api/stripe', { method: 'POST' })

describe('POST /api/stripe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_PRICE_ID = 'price_test_123'
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    mockCreateSession.mockResolvedValue({ client_secret: 'cs_secret' })
  })

  it('returns 500 when STRIPE_PRICE_ID is not configured', async () => {
    delete process.env.STRIPE_PRICE_ID

    const res = await POST(makeRequest() as never)
    expect(res.status).toBe(500)
    expect(mockCreateSession).not.toHaveBeenCalled()
  })

  it('returns 500 when STRIPE_SECRET_KEY is not configured', async () => {
    delete process.env.STRIPE_SECRET_KEY

    const res = await POST(makeRequest() as never)
    expect(res.status).toBe(500)
    expect(mockCreateSession).not.toHaveBeenCalled()
  })

  it('creates a checkout session and returns the client secret', async () => {
    const res = await POST(makeRequest() as never)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.clientSecret).toBe('cs_secret')
    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [expect.objectContaining({ price: 'price_test_123' })],
      }),
    )
  })

  it('returns 500 when Stripe rejects the session', async () => {
    mockCreateSession.mockRejectedValue(new Error('stripe down'))

    const res = await POST(makeRequest() as never)
    expect(res.status).toBe(500)
  })
})
