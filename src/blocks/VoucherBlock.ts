import type { Block } from 'payload'
import { anchorIdField } from './fields'

/**
 * The voucher checkout (Stripe) — same content as the static
 * /voucher route.
 */
export const VoucherBlock: Block = {
  slug: 'voucher',
  interfaceName: 'VoucherBlockType',
  labels: { singular: 'Voucher (Gutschein-Kauf)', plural: 'Vouchers (Gutschein-Kauf)' },
  imageURL: '/block-previews/voucher.svg',
  fields: [anchorIdField],
}
