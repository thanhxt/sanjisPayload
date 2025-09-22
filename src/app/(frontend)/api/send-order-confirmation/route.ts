import { NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer')
import { getPayload } from 'payload'
import config from '@/payload.config'

// Define types for better type safety
interface OrderItem {
  itemName: string
  quantity: number
  totalPrice: number
}

interface EmailError extends Error {
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerEmail, 
      customerName, 
      orderId, 
      orderAmount, 
      currency, 
      voucherCode, 
      voucherValue,
      expiresAt,
      orderItems 
    } = body

    if (!customerEmail || !orderId || !voucherCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Check if email was already sent for this order
    const existingOrder = await payload.findByID({
      collection: 'orders',
      id: orderId,
    })

    if (existingOrder.emailSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email already sent for this order',
        isDuplicate: true
      })
    }

    // Debug: Check if environment variables are set
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM ? 'SET' : 'NOT SET')
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'SET' : 'NOT SET')
    
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email environment variables')
      return NextResponse.json(
        { error: 'Email configuration missing' },
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
      },
      // Additional Gmail-specific settings
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
      rateDelta: 20000,
      rateLimit: 5
    })

    // Format the expiration date
    const expirationDate = new Date(expiresAt).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Format the order amount
    const formattedAmount = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency || 'EUR'
    }).format(orderAmount)

    // Format the voucher value
    const formattedVoucherValue = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency || 'EUR'
    }).format(voucherValue)

    const message = {
      from: `Sanjis Kitchen <${process.env.EMAIL_FROM}>`,
      to: customerEmail,
      subject: 'Ihre Bestellbestätigung - Sanjis Kitchen',
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bestellbestätigung - Sanjis Kitchen</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #1a1a1a; 
              background-color: #f8f9fa;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { 
              font-size: 28px; 
              font-weight: 300; 
              margin-bottom: 8px;
              letter-spacing: 1px;
            }
            .header p { 
              font-size: 16px; 
              opacity: 0.9; 
              font-weight: 300;
            }
            .content { 
              padding: 40px 30px; 
              background: #ffffff;
            }
            .greeting {
              font-size: 18px;
              color: #1a1a1a;
              margin-bottom: 30px;
              font-weight: 400;
            }
            .section {
              margin-bottom: 35px;
            }
            .section-title {
              font-size: 20px;
              font-weight: 600;
              color: #1a1a1a;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #f0f0f0;
            }
            .order-info {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 12px;
              margin-bottom: 25px;
            }
            .order-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #e9ecef;
            }
            .order-row:last-child {
              border-bottom: none;
            }
            .order-label {
              font-weight: 500;
              color: #6c757d;
            }
            .order-value {
              font-weight: 600;
              color: #1a1a1a;
            }
            .voucher-section {
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
              color: white;
              padding: 30px;
              border-radius: 12px;
              text-align: center;
              margin: 30px 0;
            }
            .voucher-code {
              font-size: 32px;
              font-weight: 700;
              color: #ffd700;
              letter-spacing: 3px;
              margin: 20px 0;
              font-family: 'Courier New', monospace;
              background: rgba(255, 255, 255, 0.1);
              padding: 15px 20px;
              border-radius: 8px;
              display: inline-block;
            }
            .voucher-details {
              display: flex;
              justify-content: space-around;
              margin-top: 25px;
              flex-wrap: wrap;
            }
            .voucher-detail {
              text-align: center;
              margin: 10px;
            }
            .voucher-detail strong {
              display: block;
              font-size: 14px;
              opacity: 0.8;
              margin-bottom: 5px;
            }
            .voucher-detail span {
              font-size: 18px;
              font-weight: 600;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .items-table th {
              background: #1a1a1a;
              color: white;
              padding: 15px;
              text-align: left;
              font-weight: 500;
            }
            .items-table td {
              padding: 15px;
              border-bottom: 1px solid #e9ecef;
            }
            .items-table tr:last-child td {
              border-bottom: none;
            }
            .items-table .quantity {
              text-align: center;
            }
            .items-table .price {
              text-align: right;
              font-weight: 600;
            }
            .contact-section {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 12px;
              margin-top: 30px;
            }
            .contact-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
              margin-top: 20px;
            }
            .contact-item {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .contact-icon {
              width: 20px;
              height: 20px;
              background: #1a1a1a;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 12px;
            }
            .contact-text {
              color: #1a1a1a;
              text-decoration: none;
            }
            .contact-text:hover {
              color: #ffd700;
            }
            .footer {
              background: #1a1a1a;
              color: #ffffff;
              padding: 30px;
              text-align: center;
              font-size: 14px;
              opacity: 0.8;
            }
            .footer p {
              margin-bottom: 8px;
            }
            .highlight {
              color: #ffd700;
              font-weight: 600;
            }
            .warning-box {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 20px;
              border-radius: 0 8px 8px 0;
              margin: 25px 0;
            }
            .warning-box h4 {
              color: #856404;
              margin-bottom: 10px;
              font-size: 16px;
            }
            .warning-box ul {
              color: #856404;
              padding-left: 20px;
            }
            .warning-box li {
              margin-bottom: 5px;
            }
            @media (max-width: 600px) {
              .header, .content { padding: 20px; }
              .voucher-code { font-size: 24px; letter-spacing: 2px; }
              .contact-grid { grid-template-columns: 1fr; }
              .order-row { flex-direction: column; align-items: flex-start; gap: 5px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Sanjis </h1>
              <p>Steak, Grill & Bar in München</p>
            </div>
            
            <div class="content">
              <div class="greeting">
                Hallo ${customerName || 'lieber Gast'},
              </div>
              
              <p style="margin-bottom: 30px; font-size: 16px; color: #6c757d;">
                vielen Dank für Ihren Gutschein-Kauf bei Sanjis! Wir freuen uns darauf, Sie mit unseren exquisiten Steaks und handgefertigten Cocktails zu verwöhnen. Von zartem Wagyu bis hin zu erstklassigem Black Angus – bei uns erwartet Sie eine kulinarische Reise der Extraklasse.
              </p>
              
              <div class="section">
                <h2 class="section-title">📋 Ihre Bestelldetails</h2>
                <div class="order-info">
                  <div class="order-row">
                    <span class="order-label">Bestellnummer</span>
                    <span class="order-value">#${orderId.slice(-8)}</span>
                  </div>
                  <div class="order-row">
                    <span class="order-label">Bestellbetrag</span>
                    <span class="order-value highlight">${formattedAmount}</span>
                  </div>
                  <div class="order-row">
                    <span class="order-label">Bestelldatum</span>
                    <span class="order-value">${new Date().toLocaleDateString('de-DE', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
                
                ${orderItems && orderItems.length > 0 ? `
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Artikel</th>
                      <th class="quantity">Menge</th>
                      <th class="price">Preis</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orderItems.map((item: OrderItem) => `
                      <tr>
                        <td>${item.itemName}</td>
                        <td class="quantity">${item.quantity}</td>
                        <td class="price">${new Intl.NumberFormat('de-DE', {
                          style: 'currency',
                          currency: currency || 'EUR'
                        }).format(item.totalPrice)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
                ` : ''}
              </div>
              
              <div class="voucher-section">
                <h3 style="font-size: 22px; margin-bottom: 15px; font-weight: 600;"> Ihr exklusiver Gutschein</h3>
                <p style="margin-bottom: 20px; opacity: 0.9;">
                  Als Dankeschön für Ihre Bestellung erhalten Sie einen exklusiven Gutschein für Ihren nächsten Besuch!
                </p>
                <div class="voucher-code">${voucherCode}</div>
                <div class="voucher-details">
                  <div class="voucher-detail">
                    <strong>Gutscheinwert</strong>
                    <span class="highlight">${formattedVoucherValue}</span>
                  </div>
                  <div class="voucher-detail">
                    <strong>Gültig bis</strong>
                    <span>${expirationDate}</span>
                  </div>
                </div>
              </div>
              
              <div class="warning-box">
                <h4>⚠️ Wichtige Hinweise</h4>
                <ul>
                  <li>Bewahren Sie diesen Gutscheincode sicher auf</li>
                  <li>Geben Sie den Code bei Ihrer nächsten Bestellung an</li>
                </ul>
              </div>
              
              <div class="contact-section">
                <h3 style="font-size: 20px; margin-bottom: 20px; color: #1a1a1a;">📍 Besuchen Sie uns</h3>
                <p style="margin-bottom: 20px; color: #6c757d;">
                  Wir freuen uns darauf, Sie bald wieder bei uns begrüßen zu dürfen!
                </p>
                <div class="contact-grid">
                  <div class="contact-item">
                    <div class="contact-icon">📍</div>
                    <span class="contact-text">Kellerstraße 32, 81667 München</span>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <a href="tel:+498937505678" class="contact-text">+49 89 37505678</a>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">✉️</div>
                    <a href="mailto:info@sanjiskitchen.de" class="contact-text">info@sanjiskitchen.de</a>
                  </div>
                </div>
              </div>
              
              <p style="margin-top: 30px; color: #6c757d; font-size: 14px;">
                Bei Fragen zu Ihrer Bestellung stehen wir Ihnen gerne zur Verfügung.
              </p>
              
              <p style="margin-top: 20px; font-weight: 500; color: #1a1a1a;">
                Mit freundlichen Grüßen,<br>
                <strong>Ihr Sanjis Kitchen Team</strong>
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Sanjis Kitchen. Alle Rechte vorbehalten.</p>
              <p>Kellerstraße 32, 81667 München</p>
              <p>Diese E-Mail wurde automatisch generiert.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      headers: {
        "X-Entity-Ref-ID": "order-confirmation",
      }
    }

    console.log('Sending order confirmation email to:', customerEmail)

    // Test the connection first
    try {
      await transporter.verify()
      console.log('Email server connection verified')
    } catch (verifyError: unknown) {
      console.error('Email server connection failed:', verifyError)
      return NextResponse.json(
        { error: 'Email server connection failed', details: verifyError instanceof Error ? verifyError.message : 'Unknown error' },
        { status: 500 }
      )
    }

    // Send the email
    const info = await transporter.sendMail(message)
    console.log('Email sent successfully:', info.messageId)
    
    // Mark the order as having received an email
    await payload.update({
      collection: 'orders',
      id: orderId,
      data: {
        emailSent: true,
        emailSentAt: new Date().toISOString(),
      },
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order confirmation email sent successfully',
      isDuplicate: false
    })

  } catch (error: unknown) {
    const emailError = error as EmailError
    console.error('Error sending order confirmation email:', emailError)
    return NextResponse.json(
      { error: 'Failed to send order confirmation email', details: emailError.message },
      { status: 500 }
    )
  }
} 