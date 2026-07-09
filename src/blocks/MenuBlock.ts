import type { Block } from 'payload'
import { anchorIdField } from './fields'

/**
 * The full menu (Speisekarte) with its accordion sections, fed by the
 * menu collections. Same content as the static /speisekarte route.
 */
export const MenuBlock: Block = {
  slug: 'menu',
  interfaceName: 'MenuBlockType',
  labels: { singular: 'Menu (Speisekarte)', plural: 'Menus (Speisekarte)' },
  imageURL: '/block-previews/menu.svg',
  fields: [anchorIdField],
}
