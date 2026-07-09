/**
 * Single source for the restaurant's static contact data and the
 * opening-hours fallback. Display components prefer the live values
 * from the Oeffnungzeiten collection and fall back to these; the
 * JSON-LD schema in the layout is built from the structured values.
 */
export const SITE_INFO = {
  name: "Sanji's – Steak, Grill & Bar",
  url: 'https://sanjiskitchen.de',
  telephone: '+49 89 37505678',
  email: 'info@sanjiskitchen.de',
  address: {
    street: 'Kellerstraße 32',
    postalCode: '81667',
    city: 'München',
    country: 'DE',
  },
} as const

export const OPENING_HOURS_FALLBACK = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as string[] | string,
    label: { de: 'Montag - Freitag', en: 'Monday - Friday' },
    opens: '17:00',
    closes: '00:00',
    display: '17:00 – 00:00',
  },
  {
    days: 'Saturday',
    label: { de: 'Samstag', en: 'Saturday' },
    opens: '12:00',
    closes: '00:00',
    display: '12:00 – 14:30 | 17:00 - 00:00',
  },
  {
    days: 'Sunday',
    label: { de: 'Sonntag', en: 'Sunday' },
    opens: '12:00',
    closes: '23:00',
    display: '12:00 - 14:30 | 17:00 – 23:00',
  },
] as const

export const openingHoursJsonLd = () =>
  OPENING_HOURS_FALLBACK.map((entry) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: entry.days,
    opens: entry.opens,
    closes: entry.closes,
  }))
