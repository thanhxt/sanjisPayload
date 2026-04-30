import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { token } = await request.json();

    try {
        console.log('[CAPTCHA:VERIFY] 🛡️ Verifying token...')
        const response = await fetch(
            process.env.CAPTCHA_VERIFY_URL || '',
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
        } else {
            console.warn('[CAPTCHA:VERIFY] ⚠️ Failed:', data['error-codes'] || 'Unknown error')
        }
    } catch (error) {
        console.error('[CAPTCHA:VERIFY] ❌ Error:', error);
        return NextResponse.json({ message: "Error verifying token", success: false }, { status: 500 });
    }


    return NextResponse.json( { message: "Token received", success: true }, { status: 200 } );
}
