import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST() {
  try {
    console.log('[EMAIL:TEST] 🛠️ Starting email test...')
    
    // Check environment variables
    console.log(`[EMAIL:TEST] 🔍 Config: FROM=${process.env.EMAIL_FROM ? 'SET' : 'NOT SET'} | PASS=${process.env.EMAIL_PASSWORD ? 'SET' : 'NOT SET'}`)
    
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
      console.error('[EMAIL:TEST] ❌ Missing environment variables')
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
    console.log('[EMAIL:TEST] 🔌 Testing server connection...')
    await transporter.verify()
    console.log('[EMAIL:TEST] ✅ Connection verified')

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

    console.log('[EMAIL:TEST] 📧 Sending test email...')
    const info = await transporter.sendMail(testMessage)
    console.log(`[EMAIL:TEST] ✅ Success | ID: ${info.messageId}`)

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: info.messageId
    })

  } catch (error: unknown) {
    console.error('[EMAIL:TEST] ❌ Failed:', error)
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
