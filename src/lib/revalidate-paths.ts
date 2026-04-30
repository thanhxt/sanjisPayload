import type { PayloadRequest } from 'payload'

const LOCAL_BASE_URL = 'http://localhost:3000'

const getRequestOrigin = (req?: PayloadRequest): string | null => {
  const host = req?.headers?.get?.('host')
  if (!host) return null

  const forwardedProto = req?.headers?.get?.('x-forwarded-proto')
  const protocol = forwardedProto || (host.includes('localhost') ? 'http' : 'https')
  return `${protocol}://${host}`
}

export const revalidatePaths = async ({
  paths,
  req,
}: {
  paths: string[]
  req?: PayloadRequest
}): Promise<void> => {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    console.warn('[REVALIDATE] Missing REVALIDATE_SECRET; skipping revalidation.')
    return
  }

  const baseUrl = getRequestOrigin(req) || process.env.NEXT_PUBLIC_SITE_URL || LOCAL_BASE_URL

  await Promise.allSettled(
    paths.map(async (path) => {
      try {
        const response = await fetch(`${baseUrl}/api/revalidate?secret=${secret}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
        })

        if (!response.ok) {
          const body = await response.text()
          console.warn(
            `[REVALIDATE] Failed for path "${path}" (${response.status}). Response: ${body}`,
          )
        }
      } catch (error) {
        console.warn(`[REVALIDATE] Request failed for path "${path}"`, error)
      }
    }),
  )
}
