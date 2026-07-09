import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {

    const { email, subject, msg, name } =  await request.json();

    if (typeof email !== 'string' || email.trim() === '' || typeof msg !== 'string' || msg.trim() === '') {
        return NextResponse.json({ error: 'Missing email or message' }, { status: 400 });
    }

    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
        console.error('[EMAIL:NODE] ❌ Missing email environment variables');
        return NextResponse.json({ error: 'Email is not configured' }, { status: 500 });
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
        tls: {
            rejectUnauthorized: false,
        }
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
