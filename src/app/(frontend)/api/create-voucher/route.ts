import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Function to generate a unique voucher code
function generateVoucherCode(): string {
  const prefix = 'SANJIS'
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}${year}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      orderId, 
      value, 
      currency, 
      customerEmail,
      description 
    } = body

    if (!orderId || !value || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Check if voucher already exists for this order
    const existingVoucher = await payload.find({
      collection: 'vouchers',
      where: {
        orderId: {
          equals: orderId
        }
      },
      limit: 1
    })

    if (existingVoucher.docs.length > 0) {
      return NextResponse.json({ 
        success: true, 
        voucherId: existingVoucher.docs[0].id,
        voucherCode: existingVoucher.docs[0].code,
        message: 'Voucher already exists',
        isDuplicate: true
      })
    }

    // Generate a unique voucher code
    let voucherCode: string
    let isCodeUnique = false
    let attempts = 0
    const maxAttempts = 10

    while (!isCodeUnique && attempts < maxAttempts) {
      voucherCode = generateVoucherCode()
      
      // Check if code already exists
      const codeExists = await payload.find({
        collection: 'vouchers',
        where: {
          code: {
            equals: voucherCode
          }
        },
        limit: 1
      })

      if (codeExists.docs.length === 0) {
        isCodeUnique = true
      } else {
        attempts++
      }
    }

    if (!isCodeUnique) {
      return NextResponse.json(
        { error: 'Could not generate unique voucher code' },
        { status: 500 }
      )
    }

    // Set expiration date to 1 year from now
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    // Create the voucher in the database
    const voucher = await payload.create({
      collection: 'vouchers',
      data: {
        code: voucherCode!,
        value: value,
        currency: currency,
        expiresAt: expiresAt.toISOString(),
        isRedeemed: false,
        orderId: orderId,
        description: description || `Voucher for order ${orderId} - Customer: ${customerEmail}`,
      },
    })

    return NextResponse.json({ 
      success: true, 
      voucherId: voucher.id,
      voucherCode: voucher.code,
      message: 'Voucher created successfully',
      isDuplicate: false
    })

  } catch (error) {
    console.error('Error creating voucher:', error)
    return NextResponse.json(
      { error: 'Failed to create voucher' },
      { status: 500 }
    )
  }
} 