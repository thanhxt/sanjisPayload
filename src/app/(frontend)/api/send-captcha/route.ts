import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { token } = await request.json();
    console.log(token);
    console.log(process.env.CAPTCHA_SECRET_PRODUCTION);

    try {
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
        console.log(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error verifying token", success: false }, { status: 500 });
    }


    return NextResponse.json( { message: "Token received", success: true }, { status: 200 } );
}
