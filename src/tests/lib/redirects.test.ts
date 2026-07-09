import { describe, expect, it, vi } from 'vitest'
import { findRedirectTarget, normalizeRedirectPath } from '@/lib/redirects'
import type { Payload } from 'payload'

const payloadWith = (docs: unknown[]) =>
  ({ find: vi.fn().mockResolvedValue({ docs }) }) as unknown as Pick<Payload, 'find'>

describe('normalizeRedirectPath', () => {
  it('strips slashes and lowercases', () => {
    expect(normalizeRedirectPath('/Ueber-Uns/')).toBe('ueber-uns')
    expect(normalizeRedirectPath('  about ')).toBe('about')
  })

  it('replaces inner whitespace with dashes', () => {
    expect(normalizeRedirectPath('alte seite')).toBe('alte-seite')
  })

  it('returns undefined for non-strings', () => {
    expect(normalizeRedirectPath(undefined)).toBeUndefined()
    expect(normalizeRedirectPath(42)).toBeUndefined()
  })
})

describe('findRedirectTarget', () => {
  it('returns the target path with a leading slash', async () => {
    const target = await findRedirectTarget(payloadWith([{ to: 'about' }]), 'ueber-uns')
    expect(target).toBe('/about')
  })

  it("maps 'home' to the root path", async () => {
    const target = await findRedirectTarget(payloadWith([{ to: 'home' }]), 'startseite')
    expect(target).toBe('/')
  })

  it('returns null when no redirect exists', async () => {
    const target = await findRedirectTarget(payloadWith([]), 'unknown')
    expect(target).toBeNull()
  })

  it('ignores self-referencing redirects', async () => {
    const target = await findRedirectTarget(payloadWith([{ to: 'loop' }]), 'loop')
    expect(target).toBeNull()
  })

  it('returns null when the lookup fails', async () => {
    const failing = { find: vi.fn().mockRejectedValue(new Error('db down')) } as unknown as Pick<Payload, 'find'>
    const target = await findRedirectTarget(failing, 'about')
    expect(target).toBeNull()
  })
})
