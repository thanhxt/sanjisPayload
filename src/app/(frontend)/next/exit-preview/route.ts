import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Leaves draft mode so the public (published) content is served again.
 * Pass ?path=/some-page to be redirected back to that page.
 */
export async function GET(req: Request): Promise<Response> {
  const draft = await draftMode()
  draft.disable()

  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')

  if (path && path.startsWith('/') && !path.startsWith('//')) {
    redirect(path)
  }

  return new Response('Draft mode is disabled')
}
