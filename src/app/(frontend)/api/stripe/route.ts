/* eslint-disable @typescript-eslint/no-unused-vars */

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'

const LOCAL_BASE_URL = 'http://localhost:3000'

const toOrigin = (value: string | null | undefined): string | null => {
  if (!value) return null
  try {
    return new URL(value).origin
  } catch {
    return null
  }
}

// ALLOWED_ORIGINS lists the public origins customers check out from (first entry is the
// default). NEXT_PUBLIC_SITE_URL may be an internal URL (e.g. http://localhost:3005), so it
// is only used as a fallback when no allowlist is configured.
const getReturnOrigin = async (): Promise<string> => {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS?.split(',') ?? [])
    .map((entry) => toOrigin(entry.trim()))
    .filter((entry): entry is string => Boolean(entry))
  const siteOrigin = toOrigin(process.env.NEXT_PUBLIC_SITE_URL) || LOCAL_BASE_URL

  const requestHeaders = await headers()
  const candidate =
    toOrigin(requestHeaders.get('origin')) || toOrigin(requestHeaders.get('referer'))

  if (allowedOrigins.length === 0) {
    // No allowlist configured: keep trusting the request origin as before.
    return candidate || siteOrigin
  }

  return candidate && (allowedOrigins.includes(candidate) || candidate === siteOrigin)
    ? candidate
    : allowedOrigins[0]
}

async function fetchClientSecret() {
    const origin = await getReturnOrigin()

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
    console.error('[STRIPE:SESSION] ❌ Error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}