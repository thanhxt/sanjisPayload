import type { Block } from 'payload'
import { anchorIdField } from './fields'

/**
 * Google Maps embed with parking information.
 */
export const MapsBlock: Block = {
  slug: 'maps',
  interfaceName: 'MapsBlockType',
  labels: { singular: 'Maps / Parking', plural: 'Maps / Parking' },
  fields: [anchorIdField],
}
