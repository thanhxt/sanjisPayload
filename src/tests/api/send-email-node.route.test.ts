import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockSendMail } = vi.hoisted(() => ({
  mockSendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' }),
}))

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: mockSendMail,
    }),
  },
}))

import { POST } from '@/app/(frontend)/api/send-email-node/route'

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/send-email-node', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })

describe('POST /api/send-email-node', () => {
  const validBody = {
    email: 'guest@example.com',
    subject: 'Reservierung',
    msg: 'Hallo, ich habe eine Frage.',
    name: 'Max Mustermann',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.EMAIL_FROM = 'test@gmail.com'
    process.env.EMAIL_PASSWORD = 'password123'
    mockSendMail.mockResolvedValue({ messageId: 'test-id' })
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ ...validBody, email: '' }))
    expect(res.status).toBe(400)
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('returns 400 when the message is missing', async () => {
    const res = await POST(makeRequest({ ...validBody, msg: '   ' }))
    expect(res.status).toBe(400)
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('returns 500 when email env vars are not configured', async () => {
    delete process.env.EMAIL_FROM

    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(500)
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('sends the contact email on valid input', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test@gmail.com',
        cc: 'guest@example.com',
      }),
    )
  })

  it('returns 500 when sending fails', async () => {
    mockSendMail.mockRejectedValue(new Error('smtp down'))

    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(500)
  })
})
