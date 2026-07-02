import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { verifyCaptcha } from '@/lib/verify-captcha';

export async function POST(request: Request) {

    const { email, subject, msg, name, captchaToken } = await request.json();

    // Authoritative, server-side captcha check before sending any mail.
    const captchaOk = await verifyCaptcha(captchaToken);
    if (!captchaOk) {
        return NextResponse.json({ error: 'Captcha verification failed' }, { status: 403 });
    }

    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
        console.error('[EMAIL:NODE] ❌ Missing email environment variables');
        return NextResponse.json({ error: 'Email configuration missing' }, { status: 500 });
    }

    const message = {
        from: `Sanjis <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_FROM,
        subject: `KONTAKTFORMULAR Betreff: ${subject}`,
        cc: email,
        html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Betreff: ${subject}</p>
        <p>Nachricht: ${msg}</p>
        `,
        replyTo: email || undefined,
        headers: {
            "X-Entity-Ref-ID": "newmail",
        }
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        console.log(`[EMAIL:NODE] 📧 Sending email | From: ${email} | Subject: ${subject}`)
        await transporter.sendMail(message);
        console.log(`[EMAIL:NODE] ✅ Success`)
        return NextResponse.json({message: 'Email Sent Successfully'}, {status: 200});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('[EMAIL:NODE] ❌ Error:', error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
