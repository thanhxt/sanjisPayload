import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/revalidate-paths', () => ({
  revalidatePaths: vi.fn(),
}))

import { createRedirectOnSlugChange } from '@/collections/pages/hooks'

const makeArgs = ({
  slug,
  previousSlug,
  status = 'published',
  existingRedirects = [] as { id: string }[],
  chainedRedirects = [] as { id: string }[],
}: {
  slug: string
  previousSlug?: string
  status?: string
  existingRedirects?: { id: string }[]
  chainedRedirects?: { id: string }[]
}) => {
  const find = vi.fn(async ({ where }: { where: Record<string, { equals: string }> }) => {
    if (where.from) return { docs: existingRedirects }
    return { docs: chainedRedirects }
  })
  const create = vi.fn()
  const update = vi.fn()

  return {
    args: {
      doc: { slug, _status: status },
      previousDoc: previousSlug ? { slug: previousSlug } : undefined,
      req: { payload: { find, create, update } },
    } as never,
    create,
    update,
    find,
  }
}

describe('createRedirectOnSlugChange', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a redirect when a published page is renamed', async () => {
    const { args, create } = makeArgs({ slug: 'about', previousSlug: 'ueber-uns' })
    await createRedirectOnSlugChange(args)

    expect(create).toHaveBeenCalledWith({
      collection: 'redirects',
      data: { from: 'ueber-uns', to: 'about' },
    })
  })

  it('retargets an existing redirect for the same old slug', async () => {
    const { args, create, update } = makeArgs({
      slug: 'about',
      previousSlug: 'ueber-uns',
      existingRedirects: [{ id: 'r1' }],
    })
    await createRedirectOnSlugChange(args)

    expect(create).not.toHaveBeenCalled()
    expect(update).toHaveBeenCalledWith({
      collection: 'redirects',
      id: 'r1',
      data: { to: 'about' },
    })
  })

  it('retargets chained redirects pointing at the old slug', async () => {
    const { args, update } = makeArgs({
      slug: 'about',
      previousSlug: 'ueber-uns',
      chainedRedirects: [{ id: 'r2' }],
    })
    await createRedirectOnSlugChange(args)

    expect(update).toHaveBeenCalledWith({
      collection: 'redirects',
      id: 'r2',
      data: { to: 'about' },
    })
  })

  it('does nothing when the slug did not change', async () => {
    const { args, create, update } = makeArgs({ slug: 'about', previousSlug: 'about' })
    await createRedirectOnSlugChange(args)

    expect(create).not.toHaveBeenCalled()
    expect(update).not.toHaveBeenCalled()
  })

  it('does nothing for drafts', async () => {
    const { args, create } = makeArgs({ slug: 'about', previousSlug: 'ueber-uns', status: 'draft' })
    await createRedirectOnSlugChange(args)
    expect(create).not.toHaveBeenCalled()
  })

  it("never redirects away from 'home'", async () => {
    const { args, create } = makeArgs({ slug: 'startseite', previousSlug: 'home' })
    await createRedirectOnSlugChange(args)
    expect(create).not.toHaveBeenCalled()
  })
})
