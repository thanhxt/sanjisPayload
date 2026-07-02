import { NextRequest, NextResponse } from 'next/server'
import { verifyCaptcha } from '@/lib/verify-captcha'

export async function POST(request: NextRequest) {
    const { token } = await request.json()

    const success = await verifyCaptcha(token)
    if (!success) {
        return NextResponse.json(
            { message: 'Captcha verification failed', success: false },
            { status: 403 },
        )
    }

    return NextResponse.json({ message: 'Token verified', success: true }, { status: 200 })
}
