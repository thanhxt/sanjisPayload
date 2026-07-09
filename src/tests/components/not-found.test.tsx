// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import NotFound from '@/app/(frontend)/not-found'

describe('404 page', () => {
  it('renders the branded not-found page with a link home', () => {
    const { getByText, container } = render(<NotFound />)

    expect(getByText('404')).toBeTruthy()
    expect(getByText('Diese Seite wurde leider nicht gefunden.')).toBeTruthy()

    const homeLink = container.querySelector('a[href="/"]')
    expect(homeLink).not.toBeNull()
  })
})
