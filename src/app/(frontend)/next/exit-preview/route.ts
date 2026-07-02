import { draftMode } from 'next/headers'

/**
 * Leaves draft mode so the public (published) content is served again.
 */
export async function GET(): Promise<Response> {
  const draft = await draftMode()
  draft.disable()

  return new Response('Draft mode is disabled')
}
