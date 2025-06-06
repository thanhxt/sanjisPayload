import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, subject, msg, name } = await req.json();
    
    // Create a transporter with your Mailpit settings
    const transporter = nodemailer.createTransport({
      host: "mail.sanjis.thanhxt.com",
      port: 1025,
      secure: false, // false for port 1025
      auth: {
        user: "sanjis",
        pass: "sanjis1234",
      },
    });
    
    // Send the email
    const info = await transporter.sendMail({
      from: '"Sanjis Kitchen" <sanjis@sanjis.thanhxt.com>',
      to: "thanhtran_xuan@icloud.com",
      subject: `Contact Form: ${subject || 'No Subject'}`,
      text: `
Name: ${name || 'Not provided'}
Email: ${email || 'Not provided'}
Subject: ${subject || 'Not provided'}
Message: ${msg || 'No message content'}
      `,
      replyTo: email || undefined,
    });
    
    console.log("Message sent:", info.messageId);
    
    return NextResponse.json({ 
      message: 'Email sent successfully', 
      id: info.messageId 
    });
    
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: 'Failed to send email' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'This endpoint accepts POST requests only' });
}