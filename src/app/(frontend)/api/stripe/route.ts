/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

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
          // Provide the exact Price ID (for example, price_1234) of
          // the product you want to sell
          price: process.env.STRIPE_PRICE_ID, // Replace with your actual Price ID
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
  try {
    const clientSecret = await fetchClientSecret()
    return NextResponse.json({ clientSecret })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}