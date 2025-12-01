import crypto from 'crypto'

export const hashIPAddress = (ip: string): string => {
    // Use a salt from env or a fallback (should be in env for production security)
    const salt = process.env.IP_SALT || 'sanjis-kitchen-secret-salt'

    return crypto
        .createHash('sha256')
        .update(ip + salt)
        .digest('hex')
}
