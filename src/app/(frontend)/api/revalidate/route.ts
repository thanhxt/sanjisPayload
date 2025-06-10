// pages/api/revalidate.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  // A simple shared secret to prevent abuse
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  const { path } = await request.json()
  if (!path) {
    return NextResponse.json({ message: 'Missing path to revalidate' }, { status: 400 })
  }

  try {
    // This tells Next.js to re-generate the given route
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path })
  } catch (err) {
    console.error('Failed to revalidate:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
