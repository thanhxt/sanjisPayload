import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { token } = await request.json();

    if (!token) {
        return NextResponse.json({ message: "Missing token", success: false }, { status: 400 });
    }

    const verifyUrl = process.env.CAPTCHA_VERIFY_URL;
    if (!verifyUrl) {
        console.error('[CAPTCHA:VERIFY] ❌ CAPTCHA_VERIFY_URL is not configured');
        return NextResponse.json({ message: "Captcha not configured", success: false }, { status: 500 });
    }

    try {
        console.log('[CAPTCHA:VERIFY] 🛡️ Verifying token...')
        const response = await fetch(
            verifyUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    secret: process.env.CAPTCHA_SECRET_PRODUCTION,
                    response: `${token}`,
                }),
            }
        );
        const data = await response.json();

        if (data.success) {
            console.log('[CAPTCHA:VERIFY] ✅ Success')
            return NextResponse.json({ message: "Token verified", success: true }, { status: 200 });
        }

        console.warn('[CAPTCHA:VERIFY] ⚠️ Failed:', data['error-codes'] || 'Unknown error')
        return NextResponse.json({ message: "Token verification failed", success: false }, { status: 403 });
    } catch (error) {
        console.error('[CAPTCHA:VERIFY] ❌ Error:', error);
        return NextResponse.json({ message: "Error verifying token", success: false }, { status: 500 });
    }
}
