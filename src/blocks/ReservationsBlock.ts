import type { Block } from 'payload'
import { anchorIdField } from './fields'

/**
 * OpenTable reservation widget + contact info card
 * (opening times come from the Oeffnungzeiten collection).
 */
export const ReservationsBlock: Block = {
  slug: 'reservations',
  interfaceName: 'ReservationsBlockType',
  labels: { singular: 'Reservations', plural: 'Reservations' },
  fields: [anchorIdField],
}
