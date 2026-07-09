import type { Block } from 'payload'
import { HeroBlock } from './HeroBlock'
import { PageHeaderBlock } from './PageHeaderBlock'
import { ContentBlock } from './ContentBlock'
import { RichTextBlock } from './RichTextBlock'
import { CallToActionBlock } from './CallToActionBlock'
import { GalleryBlock } from './GalleryBlock'
import { ReservationsBlock } from './ReservationsBlock'
import { MapsBlock } from './MapsBlock'
import { TeamBlock } from './TeamBlock'
import { ContactBlock } from './ContactBlock'
import { ColumnsBlock } from './ColumnsBlock'
import { MediaBlock } from './MediaBlock'
import { FaqBlock } from './FaqBlock'

export const allBlocks: Block[] = [
  HeroBlock,
  PageHeaderBlock,
  ContentBlock,
  MediaBlock,
  RichTextBlock,
  CallToActionBlock,
  GalleryBlock,
  ReservationsBlock,
  MapsBlock,
  TeamBlock,
  ContactBlock,
  ColumnsBlock,
  FaqBlock,
]
