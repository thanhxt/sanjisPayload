import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      sessionId, 
      amount, 
      currency, 
      customerEmail, 
      customerName, 
      customerPhone,
      orderItems,
      notes 
    } = body

    if (!sessionId || !amount || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log(`[ORDER:CREATE] 🛒 Incoming request | Customer: ${customerEmail} | Amount: ${amount}`)

    const payload = await getPayload({ config })

    // Check if order already exists for this session
    const existingOrder = await payload.find({
      collection: 'orders',
      where: {
        stripePaymentIntentId: {
          equals: sessionId
        }
      },
      limit: 1
    })

    if (existingOrder.docs.length > 0) {
      console.log(`[ORDER:CREATE] 🔄 Duplicate detected | Session: ${sessionId} | Existing Order: ${existingOrder.docs[0].id}`)
      return NextResponse.json({ 
        success: true, 
        orderId: existingOrder.docs[0].id,
        message: 'Order already exists',
        isDuplicate: true
      })
    }

    // Create the order in the database
    const order = await payload.create({
      collection: 'orders',
      data: {
        amount: amount,
        currency: currency || 'EUR',
        paymentStatus: 'paid',
        customerEmail: customerEmail,
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        stripePaymentIntentId: sessionId,
        orderItems: orderItems || [],
        orderDate: new Date().toISOString(),
        paymentDate: new Date().toISOString(),
        notes: notes || undefined,
      },
    })
    
    console.log(`
[ORDER:CREATE] ✅ Success
  Order ID: ${order.id}
  Customer: ${customerEmail}
  Amount:   ${amount} ${currency || 'EUR'}
  Items:    ${orderItems?.length || 0}
  Session:  ${sessionId}
    `.trim())

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      message: 'Order created successfully',
      isDuplicate: false
    })

  } catch (error) {
    console.error(`[ORDER:CREATE] ❌ Error:`, error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 