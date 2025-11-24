import type { CollectionBeforeChangeHook } from 'payload'
import crypto from 'crypto'

export const hashIP: CollectionBeforeChangeHook = async ({ data, req }) => {
    // Only run on create
    if (req.method !== 'POST') return data

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    // Use a salt from env or a fallback (should be in env for production security)
    const salt = process.env.IP_SALT || 'sanjis-kitchen-secret-salt'

    const hash = crypto
        .createHash('sha256')
        .update(ip + salt)
        .digest('hex')

    return {
        ...data,
        ipHash: hash,
        timestamp: new Date().toISOString(),
    }
}
