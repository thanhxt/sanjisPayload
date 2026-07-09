import { redirect } from 'next/navigation'
import { CheckCircle2, XCircle, Clock, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { stripe } from '@/lib/stripe'

export const metadata = {
  title: "Bestellstatus | Sanji's – Steak, Grill & Bar München",
  description: "Status Ihrer Bestellung und Zahlung bei Sanji's Kitchen.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Return({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-light mb-4">Fehler</h1>
            <p className="text-gray-300 mb-6">
              Keine gültige Session-ID gefunden. Bitte versuchen Sie es erneut.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/">Zurück zur Startseite</Link>
          </Button>
        </div>
      </div>
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    })

    const { status, customer_details, amount_total, currency, line_items } = session

    if (status === 'open') {
      return redirect('/')
    }

    if (status === 'complete') {
      const customerEmail = customer_details?.email || 'Ihre E-Mail-Adresse'
      const customerName = customer_details?.name || undefined
      const customerPhone = customer_details?.phone || undefined

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const internalHeaders = {
        'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}`,
        'Content-Type': 'application/json',
      }

      const orderItems = line_items?.data?.map(item => ({
        itemName: item.description || 'Unknown Item',
        quantity: item.quantity || 1,
        unitPrice: (item.amount_total || 0) / (item.quantity || 1) / 100, // Calculate unit price from total
        totalPrice: (item.amount_total || 0) / 100, // Convert from cents
      })) || []

      // The payment already succeeded at this point; the steps below are
      // fulfillment. Each step is tracked so the page can tell the customer
      // when something needs manual follow-up instead of pretending success.
      let orderOk = false
      let voucherOk = false
      let emailOk = false

      let orderId: string | undefined
      try {
        const response = await fetch(`${baseUrl}/api/create-order`, {
          method: 'POST',
          headers: internalHeaders,
          body: JSON.stringify({
            sessionId: session_id,
            amount: (amount_total || 0) / 100, // Convert from cents
            currency: currency?.toUpperCase() || 'EUR',
            customerEmail: customerEmail,
            customerName: customerName,
            customerPhone: customerPhone,
            orderItems: orderItems,
            notes: `Stripe Session: ${session_id}`,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          orderId = result.orderId
          orderOk = true
          console.log(result.isDuplicate ? `Order already exists in database: ${result.orderId}` : `Order created successfully: ${result.orderId}`)
        } else {
          console.error('Failed to create order in database')
        }
      } catch (dbError) {
        console.error('Error creating order in database:', dbError)
      }

      let voucherCode: string | undefined
      if (orderOk) {
        try {
          const voucherResponse = await fetch(`${baseUrl}/api/create-voucher`, {
            method: 'POST',
            headers: internalHeaders,
            body: JSON.stringify({
              orderId: orderId,
              value: (amount_total || 0) / 100, // Same value as order amount
              currency: currency?.toUpperCase() || 'EUR',
              customerEmail: customerEmail,
              description: `Voucher for successful payment - Session: ${session_id}`,
            }),
          })

          if (voucherResponse.ok) {
            const voucherResult = await voucherResponse.json()
            voucherCode = voucherResult.voucherCode
            voucherOk = true
            console.log(voucherResult.isDuplicate ? `Voucher already exists in database: ${voucherResult.voucherCode}` : `Voucher created successfully: ${voucherResult.voucherCode}`)
          } else {
            console.error('Failed to create voucher in database')
          }
        } catch (voucherError) {
          console.error('Error creating voucher in database:', voucherError)
        }
      }

      if (voucherOk) {
        try {
          const emailResponse = await fetch(`${baseUrl}/api/send-order-confirmation`, {
            method: 'POST',
            headers: internalHeaders,
            body: JSON.stringify({
              customerEmail: customerEmail,
              customerName: customerName,
              orderId: orderId,
              orderAmount: (amount_total || 0) / 100,
              currency: currency?.toUpperCase() || 'EUR',
              voucherCode: voucherCode,
              voucherValue: (amount_total || 0) / 100,
              expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
              orderItems: orderItems,
            }),
          })

          if (emailResponse.ok) {
            const emailResult = await emailResponse.json()
            emailOk = true
            console.log(emailResult.isDuplicate ? 'Order confirmation email already sent for this order' : 'Order confirmation email sent successfully')
          } else {
            console.error('Failed to send order confirmation email')
          }
        } catch (emailError) {
          console.error('Error sending order confirmation email:', emailError)
        }
      }

      const fulfillmentOk = orderOk && voucherOk && emailOk

      return (
        <div className="min-h-screen bg-black text-white py-20">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
          
          {/* Main Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full">
              {/* Success Card */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
                {/* Success Icon */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
                    Vielen Dank!
                  </h1>
                  <p className="text-xl text-gray-300 font-light">
                    Ihre Bestellung wurde erfolgreich verarbeitet
                  </p>
                </div>

                {/* Order Details */}
                <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
                  <h2 className="text-xl font-medium mb-4 text-center">Bestellbestätigung</h2>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Bestellstatus:</span>
                      <span className="text-green-400 font-medium">Bestätigt</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">E-Mail:</span>
                      <span className="font-medium">{customerEmail}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Bestellnummer:</span>
                      <span className="font-mono text-sm">{session_id.slice(-8)}</span>
                    </div>
                    {amount_total && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Betrag:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat('de-DE', {
                            style: 'currency',
                            currency: currency?.toUpperCase() || 'EUR'
                          }).format((amount_total / 100))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Next Steps / Fulfillment warning */}
                {fulfillmentOk ? (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4 text-center">Was passiert als nächstes?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Bestätigungs-E-Mail</p>
                          <p className="text-sm text-gray-400">
                            Eine detaillierte Bestellbestätigung wird an {customerEmail} gesendet.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Verarbeitung</p>
                          <p className="text-sm text-gray-400">
                            Ihre Bestellung wird schnellstmöglich bearbeitet und vorbereitet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 border border-yellow-500/40 bg-yellow-500/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-2 text-yellow-300">Wichtiger Hinweis zu Ihrer Bestellung</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      Ihre Zahlung war erfolgreich, aber bei der automatischen Verarbeitung Ihrer
                      Bestellung ist leider ein Fehler aufgetreten
                      {!emailOk && voucherOk ? ' (die Bestätigungs-E-Mail konnte nicht gesendet werden)' : ''}.
                      Bitte kontaktieren Sie uns unter{' '}
                      <a href="mailto:info@sanjiskitchen.de" className="text-yellow-300 underline">info@sanjiskitchen.de</a>{' '}
                      und geben Sie Ihre Bestellnummer <span className="font-mono">{session_id.slice(-8)}</span> an —
                      wir kümmern uns umgehend darum.
                    </p>
                    <p className="text-xs text-gray-400">
                      Your payment was successful, but we could not finish processing your order automatically.
                      Please contact us at info@sanjiskitchen.de and include your order number {session_id.slice(-8)}.
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-medium mb-4 text-center">Haben Sie Fragen?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href="mailto:info@sanjiskitchen.de" className="text-blue-400 hover:text-blue-300 transition-colors">
                        info@sanjiskitchen.de
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href="tel:+498937505678" className="text-blue-400 hover:text-blue-300 transition-colors">
                        +49 89 37505678
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Kellerstrasse 32, 81667 München, Deutschland</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="flex-1 text-black" variant="outline">
                    <Link href="/">
                      Zurück zur Startseite
                    </Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href="/kontakt">
                      Kontakt aufnehmen
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Handle other statuses
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-light mb-4">Bestellung in Bearbeitung</h1>
            <p className="text-gray-300 mb-6">
              Ihre Bestellung wird derzeit verarbeitet. Bitte haben Sie etwas Geduld.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/">Zurück zur Startseite</Link>
          </Button>
        </div>
      </div>
    )

  } catch (error) {
    console.error('Error retrieving session:', error)
    
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-light mb-4">Fehler aufgetreten</h1>
            <p className="text-gray-300 mb-6">
              Es gab ein Problem beim Abrufen Ihrer Bestellung. Bitte kontaktieren Sie uns.
            </p>
          </div>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}