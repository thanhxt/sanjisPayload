import { describe, expect, it } from 'vitest'
import { buildS3Config, shouldUseS3 } from '@/lib/s3-storage'

const fullEnv = {
  S3_BUCKET: 'sanjis-media',
  S3_ACCESS_KEY_ID: 'key',
  S3_SECRET_ACCESS_KEY: 'secret',
}

describe('shouldUseS3', () => {
  it('is enabled when bucket and credentials are set', () => {
    expect(shouldUseS3(fullEnv)).toBe(true)
  })

  it('stays disabled when any required variable is missing', () => {
    expect(shouldUseS3({})).toBe(false)
    expect(shouldUseS3({ ...fullEnv, S3_BUCKET: undefined })).toBe(false)
    expect(shouldUseS3({ ...fullEnv, S3_ACCESS_KEY_ID: '' })).toBe(false)
    expect(shouldUseS3({ ...fullEnv, S3_SECRET_ACCESS_KEY: undefined })).toBe(false)
  })
})

describe('buildS3Config', () => {
  it('uses path-style addressing for custom endpoints (R2/MinIO)', () => {
    const config = buildS3Config({ ...fullEnv, S3_ENDPOINT: 'https://minio.example.com' })

    expect(config.endpoint).toBe('https://minio.example.com')
    expect(config.forcePathStyle).toBe(true)
  })

  it('omits the endpoint and path-style for AWS S3', () => {
    const config = buildS3Config({ ...fullEnv, S3_REGION: 'eu-central-1' })

    expect('endpoint' in config).toBe(false)
    expect(config.forcePathStyle).toBe(false)
    expect(config.region).toBe('eu-central-1')
  })

  it('defaults the region to auto and passes credentials through', () => {
    const config = buildS3Config(fullEnv)

    expect(config.region).toBe('auto')
    expect(config.credentials).toEqual({ accessKeyId: 'key', secretAccessKey: 'secret' })
  })
})
