import { describe, expect, it } from 'vitest'
import { hashIPAddress } from '@/lib/ip-utils'

describe('ip-utils', () => {
  it('should hash IP addresses consistently', () => {
    const ip = '127.0.0.1'
    const hash1 = hashIPAddress(ip)
    const hash2 = hashIPAddress(ip)
    
    expect(hash1).toBe(hash2)
    expect(hash1).toHaveLength(64) // SHA-256 hex length
  })

  it('should produce different hashes for different IPs', () => {
    const hash1 = hashIPAddress('127.0.0.1')
    const hash2 = hashIPAddress('192.168.1.1')
    
    expect(hash1).not.toBe(hash2)
  })

  it('should use the provided salt from environment', () => {
    const ip = '1.1.1.1'
    const originalSalt = process.env.IP_SALT
    
    process.env.IP_SALT = 'test-salt-1'
    const hashWithSalt1 = hashIPAddress(ip)
    
    process.env.IP_SALT = 'test-salt-2'
    const hashWithSalt2 = hashIPAddress(ip)
    
    expect(hashWithSalt1).not.toBe(hashWithSalt2)
    
    // Cleanup
    process.env.IP_SALT = originalSalt
  })
})
