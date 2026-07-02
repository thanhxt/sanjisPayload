import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Enables Next.js draft mode for the Payload Live Preview panel and the
 * admin preview button. Only authenticated admin panel users may enter
 * draft mode; the target path is passed as ?path=/some-page.
 */
export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')

  if (!path || !path.startsWith('/')) {
    return new Response('Missing or invalid path', { status: 400 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })

  if (!user) {
    return new Response('You must be logged in to preview pages.', { status: 403 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
