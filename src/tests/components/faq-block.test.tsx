// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { LanguageProvider } from '@/components/contexts/language-context'
import { FaqBlock } from '@/components/blocks/FaqBlock'
import type { FaqBlockType } from '../../../payload-types'

// Vitest runs without globals, so testing-library cannot auto-cleanup.
afterEach(cleanup)

const items: NonNullable<FaqBlockType['items']> = [
  {
    id: '1',
    question: { de: 'Gibt es Parkplätze?', en: 'Is there parking?' },
    answer: { de: 'Ja, im Parkhaus Ostbahnhof.', en: 'Yes, at the Ostbahnhof garage.' },
  },
  {
    id: '2',
    // Empty English values must fall back to the German text.
    question: { de: 'Kann ich reservieren?', en: '' },
    answer: { de: 'Ja, über OpenTable.', en: '' },
  },
]

const renderFaq = (props: Partial<FaqBlockType> = {}) =>
  render(
    <LanguageProvider>
      <FaqBlock blockType="faq" heading={{ de: 'Häufige Fragen', en: 'FAQ' }} items={items} {...props} />
    </LanguageProvider>,
  )

describe('FaqBlock', () => {
  it('renders the heading and all questions with answers collapsed', () => {
    const { getByText, queryByText } = renderFaq()

    expect(getByText('Häufige Fragen')).toBeTruthy()
    expect(getByText('Gibt es Parkplätze?')).toBeTruthy()
    expect(queryByText('Ja, im Parkhaus Ostbahnhof.')).toBeNull()
  })

  it('toggles an answer open and closed', () => {
    const { getByText, queryByText } = renderFaq()

    fireEvent.click(getByText('Gibt es Parkplätze?'))
    expect(getByText('Ja, im Parkhaus Ostbahnhof.')).toBeTruthy()

    fireEvent.click(getByText('Gibt es Parkplätze?'))
    expect(queryByText('Ja, im Parkhaus Ostbahnhof.')).toBeNull()
  })

  it('only keeps one answer open at a time', () => {
    const { getByText, queryByText } = renderFaq()

    fireEvent.click(getByText('Gibt es Parkplätze?'))
    fireEvent.click(getByText('Kann ich reservieren?'))

    expect(getByText('Ja, über OpenTable.')).toBeTruthy()
    expect(queryByText('Ja, im Parkhaus Ostbahnhof.')).toBeNull()
  })

  it('falls back to German when the English text is empty', () => {
    const { getByText } = renderFaq()
    fireEvent.click(getByText('Kann ich reservieren?'))
    expect(getByText('Ja, über OpenTable.')).toBeTruthy()
  })

  it('renders nothing without items', () => {
    const { container } = renderFaq({ items: [] })
    expect(container.querySelector('section')).toBeNull()
  })
})
