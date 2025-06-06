import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer');

export async function POST(request: Request) {

    const { email, subject, msg, name } =  await request.json();

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

    console.log(JSON.stringify(message));

    try {

        await transporter.sendMail(message);
        return NextResponse.json({message: 'Email Sent Successfully'}, {status: 200});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
