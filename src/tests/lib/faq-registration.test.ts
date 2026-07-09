import { describe, expect, it } from 'vitest'
import { allBlocks } from '@/blocks'
import { ColumnsBlock } from '@/blocks/ColumnsBlock'
import { FaqBlock } from '@/blocks/FaqBlock'

describe('FAQ block registration', () => {
  it('is available in the Pages layout blocks', () => {
    expect(allBlocks.some((block) => block.slug === 'faq')).toBe(true)
  })

  it('is available inside columns', () => {
    const columnsField = ColumnsBlock.fields.find(
      (field) => 'name' in field && field.name === 'columns',
    )
    const contentField =
      columnsField && 'fields' in columnsField
        ? columnsField.fields.find((field) => 'name' in field && field.name === 'content')
        : undefined
    const nestedBlocks =
      contentField && 'blocks' in contentField ? contentField.blocks : []

    expect(nestedBlocks.some((block) => typeof block !== 'string' && block.slug === 'faq')).toBe(true)
  })

  it('requires question and answer on every item', () => {
    const itemsField = FaqBlock.fields.find((field) => 'name' in field && field.name === 'items')
    expect(itemsField).toBeDefined()
  })
})
