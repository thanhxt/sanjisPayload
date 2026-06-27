import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock dependencies that don't change
vi.mock('payload', () => ({
  getPayload: vi.fn(),
}))

vi.mock('@/payload.config', () => ({
  default: {},
}))

vi.mock('@/lib/pdf-generator', () => ({
  generateVoucherPdf: vi.fn().mockResolvedValue(Buffer.from('mock-pdf-content')),
}))

// Create mocks for nodemailer using vi.hoisted to avoid reference errors during hoisting
const { mockSendMail, mockVerify } = vi.hoisted(() => ({
  mockSendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' }),
  mockVerify: vi.fn().mockResolvedValue(true),
}))

// Mock nodemailer before importing the route
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: mockSendMail,
      verify: mockVerify,
    }),
  },
}))

import { getPayload } from 'payload'
import { POST } from '@/app/(frontend)/api/send-order-confirmation/route'

describe('POST /api/send-order-confirmation', () => {
  const validBody = {
    customerEmail: 'test@example.com',
    customerName: 'Test User',
    orderId: 'order-123',
    orderAmount: 50,
    currency: 'EUR',
    voucherCode: 'VOUCHER123',
    voucherValue: 50,
    expiresAt: new Date().toISOString(),
    orderItems: [{ itemName: 'Steak', quantity: 1, totalPrice: 50 }]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.INTERNAL_API_SECRET = 'test-secret'
    process.env.EMAIL_FROM = 'test@gmail.com'
    process.env.EMAIL_PASSWORD = 'password123'
    
    // Ensure mocks return what we expect (since clearAllMocks might affect them)
    mockSendMail.mockResolvedValue({ messageId: 'test-id' })
    mockVerify.mockResolvedValue(true)
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

  it('returns 400 for missing fields', async () => {
    const req = new Request('http://localhost/api/send-order-confirmation', {
      method: 'POST',
      body: JSON.stringify({ orderId: '123' }),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' }
    })

    const res = await POST(req as never)
    expect(res.status).toBe(400)
  })

  it('returns duplicate if email already sent', async () => {
    const payloadClient = {
      findByID: vi.fn().mockResolvedValue({ emailSent: true }),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new Request('http://localhost/api/send-order-confirmation', {
      method: 'POST',
      body: JSON.stringify(validBody),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' }
    })

    const res = await POST(req as never)
    const body = await res.json()

    expect(body.isDuplicate).toBe(true)
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('sends email and updates order status on success', async () => {
    const payloadClient = {
      findByID: vi.fn().mockResolvedValue({ emailSent: false }),
      update: vi.fn().mockResolvedValue({}),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new Request('http://localhost/api/send-order-confirmation', {
      method: 'POST',
      body: JSON.stringify(validBody),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' }
    })

    const res = await POST(req as never)
    const body = await res.json()

    if (res.status === 500) {
      console.log('Body on error:', body)
    }

    expect(res.status).toBe(200)
    expect(body.success).toBe(true)
    expect(mockSendMail).toHaveBeenCalled()
    expect(payloadClient.update).toHaveBeenCalledWith(expect.objectContaining({
      collection: 'orders',
      id: 'order-123',
      data: expect.objectContaining({ emailSent: true })
    }))
  })

  it('returns 500 if email config is missing', async () => {
    delete process.env.EMAIL_FROM
    
    const payloadClient = {
      findByID: vi.fn().mockResolvedValue({ emailSent: false }),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const req = new Request('http://localhost/api/send-order-confirmation', {
      method: 'POST',
      body: JSON.stringify(validBody),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-secret' }
    })

    const res = await POST(req as never)
    expect(res.status).toBe(500)
    expect(mockSendMail).not.toHaveBeenCalled()
  })
})
