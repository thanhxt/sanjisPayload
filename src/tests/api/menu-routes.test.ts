import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('payload', () => ({
  getPayload: vi.fn(),
}))

vi.mock('@payload-config', () => ({
  default: {},
}))

import { getPayload } from 'payload'
import { GET as getAppetizers } from '@/app/(frontend)/api/menu-appetizer/route'
import { GET as getMainDishes } from '@/app/(frontend)/api/menu-maindish/route'
import { GET as getSteaks } from '@/app/(frontend)/api/menu-steaksdish/route'

describe('Menu API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET /api/menu-appetizer returns sorted dishes', async () => {
    const mockDocs = [
      { id: '1', position: 2, name: 'Dish B' },
      { id: '2', position: 1, name: 'Dish A' },
    ]
    const payloadClient = {
      find: vi.fn().mockResolvedValue({ docs: mockDocs }),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const res = await getAppetizers()
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toHaveLength(2)
    expect(body[0].position).toBe(1)
    expect(body[1].position).toBe(2)
    expect(payloadClient.find).toHaveBeenCalledWith({ collection: 'menuAppetizerDish' })
  })

  it('GET /api/menu-maindish returns sorted dishes', async () => {
    const mockDocs = [
      { id: '1', position: 10, name: 'Main B' },
      { id: '2', position: 5, name: 'Main A' },
    ]
    const payloadClient = {
      find: vi.fn().mockResolvedValue({ docs: mockDocs }),
    }
    vi.mocked(getPayload).mockResolvedValue(payloadClient as never)

    const res = await getMainDishes()
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body[0].name).toBe('Main A')
    expect(payloadClient.find).toHaveBeenCalledWith({ collection: 'menuMainDish' })
  })

  it('GET /api/menu-steaksdish handles errors gracefully', async () => {
    vi.mocked(getPayload).mockRejectedValue(new Error('DB Error'))

    const res = await getSteaks()
    const body = await res.json()

    expect(res.status).toBe(500)
    expect(body).toEqual({ error: 'Failed to fetch steaks' })
  })
})
