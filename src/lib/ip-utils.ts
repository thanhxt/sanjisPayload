import crypto from 'crypto'

export const hashIPAddress = (ip: string): string => {
    // Fail closed: a hardcoded fallback salt makes the hash trivially reversible.
    const salt = process.env.IP_SALT
    if (!salt) {
        throw new Error('IP_SALT environment variable is not set')
    }

    return crypto
        .createHash('sha256')
        .update(ip + salt)
        .digest('hex')
}
