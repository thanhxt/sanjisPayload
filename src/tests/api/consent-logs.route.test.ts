import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('payload', () => ({
  getPayload: vi.fn(),
}))

vi.mock('@payload-config', () => ({
  default: {},
}))

vi.mock('@/lib/ip-utils', () => ({
  hashIPAddress: vi.fn().mockReturnValue('hashed-ip'),
}))

import { getPayload } from 'payload'
import { POST } from '@/app/api/consent-logs/route'

describe('POST /api/consent-logs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 for missing required fields', async () => {
    const req = new NextRequest('http://localhost/api/consent-logs', {
      method: 'POST',
      body: JSON.stringify({ consentId: 'abc' }),
      headers: { 'content-type': 'application/json' },
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body).toEqual({ error: 'Missing required fields' })
  })

  it('creates consent log successfully', async () => {
    const payloadClient = {
      create: vi.fn().mockResolvedValue({ id: 'consent-1' }),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new NextRequest('http://localhost/api/consent-logs', {
      method: 'POST',
      body: JSON.stringify({
        consentId: 'consent-abc',
        preferences: { necessary: true },
        userAgent: 'test-agent',
        policyVersion: '1.0.0',
      }),
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual({ message: 'Consent logged successfully' })
    expect(payloadClient.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'consent-logs',
        data: expect.objectContaining({
          consentId: 'consent-abc',
          ipHash: 'hashed-ip',
        }),
      }),
    )
  })
})
