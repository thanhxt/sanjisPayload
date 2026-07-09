// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { LanguageProvider } from '@/components/contexts/language-context'
import { MenuContextProvider } from '@/components/contexts/menu-context'
import Navbar from '@/components/navbar'

const renderNavbar = () =>
  render(
    <LanguageProvider>
      <MenuContextProvider>
        <Navbar cmsLinks={[{ href: '/events', label: { de: 'Events', en: 'Events' } }]} />
      </MenuContextProvider>
    </LanguageProvider>,
  )

describe('Navbar', () => {
  it('does not load any stylesheet from a CDN', () => {
    const { container } = renderNavbar()
    expect(container.querySelector('link[rel="stylesheet"]')).toBeNull()
  })

  it('renders static and CMS links', () => {
    const { getAllByText } = renderNavbar()
    // Links appear in the desktop nav and the mobile overlay.
    expect(getAllByText('Startseite').length).toBeGreaterThan(0)
    expect(getAllByText('Events').length).toBeGreaterThan(0)
  })
})
