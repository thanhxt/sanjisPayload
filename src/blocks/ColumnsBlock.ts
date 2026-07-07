import type { Block } from 'payload'
import { RichTextBlock } from './RichTextBlock'
import { CallToActionBlock } from './CallToActionBlock'
import { GalleryBlock } from './GalleryBlock'
import { ReservationsBlock } from './ReservationsBlock'
import { MapsBlock } from './MapsBlock'
import { TeamBlock } from './TeamBlock'
import { ContactBlock } from './ContactBlock'

/**
 * Places blocks side by side instead of stacking them vertically,
 * e.g. the map on the left and buttons on the right.
 * Columns stack again on small screens.
 */
export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlockType',
  labels: { singular: 'Columns (side by side)', plural: 'Columns (side by side)' },
  imageURL: '/block-previews/columns.svg',
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'half',
          required: true,
          options: [
            { label: '1/3', value: 'oneThird' },
            { label: '1/2', value: 'half' },
            { label: '2/3', value: 'twoThirds' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: [
            RichTextBlock,
            CallToActionBlock,
            GalleryBlock,
            ReservationsBlock,
            MapsBlock,
            TeamBlock,
            ContactBlock,
          ],
        },
      ],
    },
  ],
}
