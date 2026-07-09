import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockDisable, mockRedirect } = vi.hoisted(() => ({
  mockDisable: vi.fn(),
  mockRedirect: vi.fn((path: string) => {
    throw new Error(`NEXT_REDIRECT:${path}`)
  }),
}))

vi.mock('next/headers', () => ({
  draftMode: vi.fn().mockResolvedValue({ disable: mockDisable }),
}))

vi.mock('next/navigation', () => ({
  redirect: mockRedirect,
}))

import { GET } from '@/app/(frontend)/next/exit-preview/route'

describe('GET /next/exit-preview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('disables draft mode', async () => {
    const res = await GET(new Request('http://localhost/next/exit-preview'))
    expect(mockDisable).toHaveBeenCalled()
    expect(await res.text()).toContain('disabled')
  })

  it('redirects back to the given path', async () => {
    await expect(GET(new Request('http://localhost/next/exit-preview?path=/about'))).rejects.toThrow(
      'NEXT_REDIRECT:/about',
    )
    expect(mockDisable).toHaveBeenCalled()
  })

  it('ignores absolute/external redirect targets', async () => {
    const res = await GET(
      new Request('http://localhost/next/exit-preview?path=//evil.example.com'),
    )
    expect(mockRedirect).not.toHaveBeenCalled()
    expect(await res.text()).toContain('disabled')
  })
})
