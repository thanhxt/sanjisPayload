import type { CollectionBeforeChangeHook } from 'payload'
import { hashIPAddress } from '@/lib/ip-utils'

export const hashIP: CollectionBeforeChangeHook = async ({ data, req }) => {
    // If ipHash is already present (e.g. from API route), return data
    if (data.ipHash) return data

    // Only run on create
    if (req.method !== 'POST') return data

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const hash = hashIPAddress(ip)

    return {
        ...data,
        ipHash: hash,
        timestamp: new Date().toISOString(),
    }
}
