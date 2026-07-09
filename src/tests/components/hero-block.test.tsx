// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { LanguageProvider } from '@/components/contexts/language-context'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import type { HeroBlockType } from '../../../payload-types'

const renderHero = (props: Partial<HeroBlockType> = {}) =>
  render(
    <LanguageProvider>
      <HeroBlock
        blockType="hero"
        backgroundType="video"
        backgroundSrc="/LandingPageVideo2.MOV"
        showLogo={false}
        showScrollIndicator={false}
        {...props}
      />
    </LanguageProvider>,
  )

describe('HeroBlock video background', () => {
  it('defers video loading with preload=metadata and shows a poster', () => {
    const { container } = renderHero()
    const video = container.querySelector('video')

    expect(video).not.toBeNull()
    expect(video?.getAttribute('preload')).toBe('metadata')
    expect(video?.getAttribute('poster')).toBe('/LandingPageImage2.jpg')
  })

  it('plays the configured video source', () => {
    const { container } = renderHero()
    const source = container.querySelector('video source')

    expect(source?.getAttribute('src')).toBe('/LandingPageVideo2.MOV')
  })

  it('renders the heading in the selected language with fallback', () => {
    const { getByText } = renderHero({ heading: { de: 'Willkommen', en: null } })
    expect(getByText('Willkommen')).toBeTruthy()
  })
})
