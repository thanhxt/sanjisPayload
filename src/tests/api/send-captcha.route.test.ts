import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/(frontend)/api/send-captcha/route'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/send-captcha', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })

describe('POST /api/send-captcha', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.CAPTCHA_VERIFY_URL = 'https://captcha.example.com/verify'
    process.env.CAPTCHA_SECRET_PRODUCTION = 'secret'
  })

  it('returns 400 when the token is missing', async () => {
    const res = await POST(makeRequest({}) as never)
    expect(res.status).toBe(400)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('returns 500 when CAPTCHA_VERIFY_URL is not configured', async () => {
    delete process.env.CAPTCHA_VERIFY_URL

    const res = await POST(makeRequest({ token: 'abc' }) as never)
    expect(res.status).toBe(500)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('returns success when the verify service confirms the token', async () => {
    mockFetch.mockResolvedValue({ json: async () => ({ success: true }) })

    const res = await POST(makeRequest({ token: 'abc' }) as never)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.success).toBe(true)
  })

  it('returns 403 with success=false when verification fails', async () => {
    mockFetch.mockResolvedValue({ json: async () => ({ success: false, 'error-codes': ['invalid-input'] }) })

    const res = await POST(makeRequest({ token: 'bad-token' }) as never)
    const body = await res.json()

    expect(res.status).toBe(403)
    expect(body.success).toBe(false)
  })

  it('returns 500 when the verify service is unreachable', async () => {
    mockFetch.mockRejectedValue(new Error('network down'))

    const res = await POST(makeRequest({ token: 'abc' }) as never)
    const body = await res.json()

    expect(res.status).toBe(500)
    expect(body.success).toBe(false)
  })
})
