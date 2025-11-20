export interface OrderItem {
  itemName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Order {
  id: string
  amount: number
  currency: 'EUR' | 'USD' | 'CHF'
  paymentStatus: 'pending' | 'paid' | 'failed'
  customerEmail: string
  stripePaymentIntentId?: string
  voucher?: string[] // Array of voucher IDs
  orderItems: OrderItem[]
  orderDate: string
  paymentDate?: string
  customerName?: string
  customerPhone?: string
  notes?: string
  createdAt: string
  updatedAt: string
} 