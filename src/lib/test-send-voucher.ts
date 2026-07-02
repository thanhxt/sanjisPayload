import { generateVoucherPdf } from './pdf-generator'
import nodemailer from 'nodemailer'

async function main() {
  const targetEmail = process.argv[2]
  if (!targetEmail) {
    console.error('❌ Please provide an email address. Example: npx tsx --env-file=.env src/lib/test-send-voucher.ts your-email@gmail.com')
    process.exit(1)
  }

  console.log(`📧 Preparing test voucher email for: ${targetEmail}`)

  if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
    console.error('❌ Missing environment variables EMAIL_FROM or EMAIL_PASSWORD in .env file.')
    process.exit(1)
  }

  // Sample data
  const customerName = 'Gästetester Max'
  const voucherCode = 'SANJIS-ONLINE-TEST'
  const voucherValue = 50.00
  const currency = 'EUR'
  const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()

  try {
    console.log('📄 Generating PDF voucher...')
    const pdfBuffer = await generateVoucherPdf({
      customerName,
      voucherCode,
      voucherValue,
      currency,
      expiresAt
    })

    console.log('🔌 Connecting to email server...')
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

    await transporter.verify()
    console.log('✅ Connection verified successfully')

    const expirationDate = new Date(expiresAt).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const formattedVoucherValue = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency || 'EUR'
    }).format(voucherValue)

    const message = {
      from: `Sanjis Kitchen <${process.env.EMAIL_FROM}>`,
      to: targetEmail,
      subject: 'Ihre Bestellbestätigung - Sanjis Kitchen (Gutschein-Test)',
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: sans-serif; line-height: 1.6; color: #1a1a1a; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 6px 6px 0 0; }
            .content { padding: 20px; }
            .voucher-box { background: #f8f9fa; border: 2px dashed #1a1a1a; padding: 20px; text-align: center; margin: 20px 0; border-radius: 6px; }
            .code { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #b58900; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Sanjis Kitchen</h1>
              <p>Gutschein-Test E-Mail</p>
            </div>
            <div class="content">
              <p>Hallo ${customerName},</p>
              <p>vielen Dank für Ihren Gutschein-Kauf bei Sanjis! Im Anhang dieser E-Mail finden Sie Ihren Gutschein als druckfertiges PDF.</p>
              <div class="voucher-box">
                <h3>Ihr exklusiver Gutscheincode</h3>
                <div class="code">${voucherCode}</div>
                <p>Wert: <strong>${formattedVoucherValue}</strong> | Gültig bis: <strong>${expirationDate}</strong></p>
              </div>
              <p>Mit freundlichen Grüßen,<br><strong>Ihr Sanjis Kitchen Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: 'Sanjis_Gutschein.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    }

    console.log('📧 Sending email...')
    const info = await transporter.sendMail(message)
    console.log(`✅ Test email successfully sent! Message ID: ${info.messageId}`)
  } catch (err) {
    console.error('❌ Error sending test email:', err)
  }
}

main()
