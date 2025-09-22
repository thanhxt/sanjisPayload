import { NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer')

export async function POST() {
  try {
    console.log('Testing email configuration...')
    
    // Check environment variables
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM ? 'SET' : 'NOT SET')
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'SET' : 'NOT SET')
    
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
      return NextResponse.json(
        { error: 'Missing email environment variables' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      }
    })

    // Test connection
    console.log('Testing email server connection...')
    await transporter.verify()
    console.log('Email server connection verified!')

    // Send test email
    const testMessage = {
      from: `Sanjis Kitchen Test <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM, // Send to yourself for testing
      subject: 'Test Email - Sanjis Kitchen',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the email configuration is working.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
    }

    console.log('Sending test email...')
    const info = await transporter.sendMail(testMessage)
    console.log('Test email sent successfully:', info.messageId)

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: info.messageId
    })

  } catch (error: unknown) {
    console.error('Email test failed:', error)
    return NextResponse.json(
      { 
        error: 'Email test failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error && 'code' in error ? error.code : undefined 
      },
      { status: 500 }
    )
  }
}
