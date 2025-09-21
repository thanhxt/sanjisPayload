import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_INVOICE!, {
  apiVersion: '2025-05-28.basil',
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_INVOICE!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Create an invoice item for this payment
    if (session.customer) {
      await stripe.invoiceItems.create({
        customer: session.customer as string,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? 'eur',
        description: 'Restaurant Voucher',
      })

      // Generate & finalize invoice
      await stripe.invoices.create({
        customer: session.customer as string,
        auto_advance: true,
      })
    }
  }

  return NextResponse.json({ received: true })
}
