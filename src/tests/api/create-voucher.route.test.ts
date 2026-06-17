import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('payload', () => ({
  getPayload: vi.fn(),
}))

vi.mock('@/payload.config', () => ({
  default: {},
}))

import { getPayload } from 'payload'
import { POST } from '@/app/(frontend)/api/create-voucher/route'

describe('POST /api/create-voucher', () => {
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
    const req = new Request('http://localhost/api/create-voucher', {
      method: 'POST',
      body: JSON.stringify({ orderId: 'o1' }),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' },
    })

    const res = await POST(req as never)
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body).toEqual({ error: 'Missing required fields' })
  })

  it('returns duplicate response when voucher already exists for order', async () => {
    const payloadClient = {
      find: vi.fn().mockResolvedValue({ docs: [{ id: 'v1', code: 'SANJIS2025ABC123' }] }),
      create: vi.fn(),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new Request('http://localhost/api/create-voucher', {
      method: 'POST',
      body: JSON.stringify({
        orderId: 'order-1',
        value: 25,
        currency: 'EUR',
      }),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' },
    })

    const res = await POST(req as never)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toMatchObject({
      success: true,
      isDuplicate: true,
      voucherId: 'v1',
      voucherCode: 'SANJIS2025ABC123',
    })
    expect(payloadClient.create).not.toHaveBeenCalled()
  })

  it('creates voucher when order has no voucher and code is unique', async () => {
    const payloadClient = {
      find: vi
        .fn()
        .mockResolvedValueOnce({ docs: [] }) // existing voucher by orderId
        .mockResolvedValueOnce({ docs: [] }), // voucher code uniqueness check
      create: vi.fn().mockResolvedValue({ id: 'v-new', code: 'SANJIS2025NEW999' }),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.123456)

    const req = new Request('http://localhost/api/create-voucher', {
      method: 'POST',
      body: JSON.stringify({
        orderId: 'order-2',
        value: 80,
        currency: 'EUR',
        customerEmail: 'buyer@example.com',
      }),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' },
    })

    const res = await POST(req as never)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toMatchObject({
      success: true,
      isDuplicate: false,
      voucherId: 'v-new',
      voucherCode: 'SANJIS2025NEW999',
    })
    expect(payloadClient.find).toHaveBeenCalledTimes(2)
    expect(payloadClient.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'vouchers',
        data: expect.objectContaining({
          orderId: 'order-2',
          currency: 'EUR',
          value: 80,
        }),
      }),
    )

    randomSpy.mockRestore()
  })
})
