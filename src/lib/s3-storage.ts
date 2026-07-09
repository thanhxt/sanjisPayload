/**
 * Media uploads normally live on the local filesystem (MEDIA_DIR, see
 * collections/media). When the S3 environment variables are present,
 * uploads go to an S3-compatible bucket (AWS S3, Cloudflare R2, MinIO)
 * instead, which makes them independent of the deployment container.
 */

// Compatible with process.env, which only guarantees a string index.
type S3Env = Record<string, string | undefined>

/** S3 storage is enabled only when all required variables are set. */
export const shouldUseS3 = (env: S3Env): boolean =>
  Boolean(env.S3_BUCKET && env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY)

/** Builds the client config for the storage plugin from the env. */
export const buildS3Config = (env: S3Env) => ({
  ...(env.S3_ENDPOINT ? { endpoint: env.S3_ENDPOINT } : {}),
  region: env.S3_REGION || 'auto',
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: env.S3_SECRET_ACCESS_KEY || '',
  },
  // Custom endpoints (R2, MinIO) expect path-style bucket addressing.
  forcePathStyle: Boolean(env.S3_ENDPOINT),
})
