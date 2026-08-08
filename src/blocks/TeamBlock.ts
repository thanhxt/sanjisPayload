import type { Block } from 'payload'
import { anchorIdField } from './fields'

/**
 * Team grid fed by the Team collection.
 */
export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlockType',
  labels: { singular: 'Team', plural: 'Teams' },
  imageURL: '/block-previews/team.svg',
  fields: [anchorIdField],
}
