import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('payload', () => ({
  getPayload: vi.fn(),
}))

vi.mock('@/payload.config', () => ({
  default: {},
}))

import { getPayload } from 'payload'
import { POST } from '@/app/api/cleanup-consent-logs/route'

describe('POST /api/cleanup-consent-logs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.CLEANUP_SECRET = 'cleanup-secret'
  })

  it('returns 401 when authorization header is invalid', async () => {
    const req = new NextRequest('http://localhost/api/cleanup-consent-logs', {
      method: 'POST',
      headers: { authorization: 'Bearer wrong' },
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
  })

  it('deletes old consent logs when authorized', async () => {
    const payloadClient = {
      find: vi.fn().mockResolvedValue({
        docs: [{ id: 'a' }, { id: 'b' }],
      }),
      delete: vi.fn().mockResolvedValue({}),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new NextRequest('http://localhost/api/cleanup-consent-logs', {
      method: 'POST',
      headers: { authorization: 'Bearer cleanup-secret' },
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toMatchObject({
      success: true,
      deletedCount: 2,
    })
    expect(payloadClient.delete).toHaveBeenCalledTimes(2)
    expect(payloadClient.delete).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ collection: 'consent-logs', id: 'a' }),
    )
  })
})
