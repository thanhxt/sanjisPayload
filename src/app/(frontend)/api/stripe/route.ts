/* eslint-disable @typescript-eslint/no-unused-vars */

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'

async function fetchClientSecret() {
    const origin = (await headers()).get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      mode: 'payment',
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    })
  
    return session.client_secret
}

// HTTP handler for the API route
export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_PRICE_ID || !process.env.STRIPE_SECRET_KEY) {
    console.error('[STRIPE:SESSION] ❌ STRIPE_PRICE_ID and/or STRIPE_SECRET_KEY are not configured')
    return NextResponse.json(
      { error: 'Payment is not configured' },
      { status: 500 }
    )
  }

  try {
    const clientSecret = await fetchClientSecret()
    return NextResponse.json({ clientSecret })
  } catch (error) {
    console.error('[STRIPE:SESSION] ❌ Error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}