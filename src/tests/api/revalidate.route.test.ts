import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

import { revalidatePath } from 'next/cache'
import { POST } from '@/app/(frontend)/api/revalidate/route'

describe('POST /api/revalidate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.REVALIDATE_SECRET = 'test-secret'
  })

  it('returns 401 for invalid secret', async () => {
    const req = new NextRequest('http://localhost/api/revalidate?secret=wrong', {
      method: 'POST',
      body: JSON.stringify({ path: '/speisekarte' }),
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(401)
    expect(body).toEqual({ message: 'Invalid token' })
  })

  it('returns 400 when path is missing', async () => {
    const req = new NextRequest('http://localhost/api/revalidate?secret=test-secret', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body).toEqual({ message: 'Missing path to revalidate' })
  })

  it('revalidates path for valid request', async () => {
    const req = new NextRequest('http://localhost/api/revalidate?secret=test-secret', {
      method: 'POST',
      body: JSON.stringify({ path: '/speisekarte/steaks' }),
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual({ revalidated: true, path: '/speisekarte/steaks' })
    expect(revalidatePath).toHaveBeenCalledWith('/speisekarte/steaks')
  })
})
