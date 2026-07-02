import type { Block } from 'payload'
import { anchorIdField } from './fields'

/**
 * Contact form with captcha and contact/opening time info.
 */
export const ContactBlock: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlockType',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [anchorIdField],
}
