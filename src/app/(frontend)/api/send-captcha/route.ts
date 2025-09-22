import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Missing captcha token" },
                { status: 400 }
            );
        }

        // ✅ Forward client IP (important for Elysia rate-limit in CapJS)
        const ip =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("cf-connecting-ip") ||
            "127.0.0.1"; // fallback in dev

        const response = await fetch(process.env.CAPTCHA_VERIFY_URL || "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-forwarded-for": ip, // 👈 This fixes the warning
            },
            body: JSON.stringify({
                secret: process.env.CAPTCHA_SECRET_PRODUCTION,
                response: token,
            }),
        });

        const data = await response.json();
        console.log("CAPTCHA verify result:", data);

        // You can return the captcha server's result directly
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Captcha verify error:", error);
        return NextResponse.json(
            { success: false, message: "Error verifying captcha" },
            { status: 500 }
        );
    }
}
