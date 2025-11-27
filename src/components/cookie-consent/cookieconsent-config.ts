import { CookieConsentConfig } from 'vanilla-cookieconsent';

export const POLICY_VERSION = 'v1.0';

export const cookieConsentConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom left',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
  },
  language: {
    default: 'de',
    autoDetect: 'browser',
    translations: {
      de: {
        consentModal: {
          title: 'Wir verwenden Cookies',
          description: 'Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Alle ablehnen',
          showPreferencesBtn: 'Einstellungen verwalten',
          footer: '<a href="/datenschutz">Datenschutzerklärung</a>\n<a href="/impressum">Impressum</a>',
        },
        preferencesModal: {
          title: 'Cookie-Einstellungen',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Alle ablehnen',
          savePreferencesBtn: 'Einstellungen speichern',
          closeIconLabel: 'Modal schließen',
          serviceCounterLabel: 'Dienst|Dienste',
          sections: [
            {
              title: 'Notwendige Cookies',
              description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Funktionale Cookies',
              description: 'Diese Cookies ermöglichen es der Website, erweiterte Funktionen und Personalisierung bereitzustellen (z.B. Karten, Reservierungen).',
              linkedCategory: 'functionality',
            },
          ],
        },
      },
      en: {
        consentModal: {
          title: 'We use cookies',
          description: 'This website uses cookies to improve your experience.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer: '<a href="/datenschutz">Privacy Policy</a>\n<a href="/impressum">Imprint</a>',
        },
        preferencesModal: {
          title: 'Cookie Preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Necessary Cookies',
              description: 'These cookies are essential for the proper functioning of the website.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Functional Cookies',
              description: 'These cookies allow the website to provide enhanced functionality and personalization (e.g. Maps, Reservations).',
              linkedCategory: 'functionality',
            },
          ],
        },
      },
    },
  },
};
