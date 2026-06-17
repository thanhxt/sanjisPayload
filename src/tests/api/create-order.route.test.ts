import { describe, expect, it, vi, beforeEach } from 'vitest'

vi.mock('payload', () => ({
  getPayload: vi.fn(),
}))

vi.mock('@/payload.config', () => ({
  default: {},
}))

import { getPayload } from 'payload'
import { POST } from '@/app/(frontend)/api/create-order/route'

describe('POST /api/create-order', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.INTERNAL_API_SECRET = 'test-secret'
  })

  it('returns 401 if missing or invalid authorization header', async () => {
    const req = new Request('http://localhost/api', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer wrong-secret' },
    })

    const res = await POST(req as never)
    expect(res.status).toBe(401)
  })


  it('returns 400 for missing required fields', async () => {
    const req = new Request('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: 10 }),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' },
    })

    const res = await POST(req as never)
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body).toEqual({ error: 'Missing required fields' })
  })

  it('returns duplicate response when order already exists', async () => {
    const payloadClient = {
      find: vi.fn().mockResolvedValue({ docs: [{ id: 'existing-order' }] }),
      create: vi.fn(),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new Request('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'pi_123',
        amount: 50,
        customerEmail: 'a@example.com',
      }),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' },
    })

    const res = await POST(req as never)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toMatchObject({
      success: true,
      isDuplicate: true,
      orderId: 'existing-order',
    })
    expect(payloadClient.create).not.toHaveBeenCalled()
  })

  it('creates an order when no duplicate exists', async () => {
    const payloadClient = {
      find: vi.fn().mockResolvedValue({ docs: [] }),
      create: vi.fn().mockResolvedValue({ id: 'new-order' }),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new Request('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'pi_new',
        amount: 90,
        currency: 'EUR',
        customerEmail: 'b@example.com',
        orderItems: [{ itemName: 'Voucher', quantity: 1, totalPrice: 90 }],
      }),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' },
    })

    const res = await POST(req as never)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toMatchObject({
      success: true,
      isDuplicate: false,
      orderId: 'new-order',
    })
    expect(payloadClient.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'orders',
        data: expect.objectContaining({
          stripePaymentIntentId: 'pi_new',
          customerEmail: 'b@example.com',
        }),
      }),
    )
  })
})
