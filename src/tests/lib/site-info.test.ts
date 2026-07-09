import { describe, expect, it } from 'vitest'
import { OPENING_HOURS_FALLBACK, openingHoursJsonLd, SITE_INFO } from '@/lib/site-info'

describe('site-info', () => {
  it('builds one JSON-LD specification per opening-hours entry', () => {
    const jsonLd = openingHoursJsonLd()

    expect(jsonLd).toHaveLength(OPENING_HOURS_FALLBACK.length)
    for (const entry of jsonLd) {
      expect(entry['@type']).toBe('OpeningHoursSpecification')
      expect(entry.opens).toMatch(/^\d{2}:\d{2}$/)
      expect(entry.closes).toMatch(/^\d{2}:\d{2}$/)
    }
  })

  it('provides German and English labels for every entry', () => {
    for (const entry of OPENING_HOURS_FALLBACK) {
      expect(entry.label.de.length).toBeGreaterThan(0)
      expect(entry.label.en.length).toBeGreaterThan(0)
      expect(entry.display.length).toBeGreaterThan(0)
    }
  })

  it('exposes the shared contact data', () => {
    expect(SITE_INFO.url).toBe('https://sanjiskitchen.de')
    expect(SITE_INFO.email).toContain('@')
  })
})
