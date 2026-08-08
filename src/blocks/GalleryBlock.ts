import type { Block } from 'payload'
import { anchorIdField } from './fields'

/**
 * Renders the image gallery managed in the Gallery collection.
 */
export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlockType',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  imageURL: '/block-previews/gallery.svg',
  fields: [anchorIdField],
}
