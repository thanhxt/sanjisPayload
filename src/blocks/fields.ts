import type { Field } from 'payload'

/**
 * The frontend switches between German and English on the client
 * (see components/contexts/language-context.tsx), so every editable
 * text is stored as a de/en pair instead of using Payload localization.
 */
export const bilingualText = (
  name: string,
  options?: { label?: string; required?: boolean; textarea?: boolean },
): Field => {
  const languageField = (fieldName: 'de' | 'en', label: string): Field =>
    options?.textarea
      ? { name: fieldName, label, type: 'textarea', required: options?.required }
      : { name: fieldName, label, type: 'text', required: options?.required }

  return {
    name,
    type: 'group',
    label: options?.label,
    fields: [languageField('de', 'Deutsch'), languageField('en', 'English')],
  }
}

/** Optional HTML id so navigation links can scroll to the section. */
export const anchorIdField: Field = {
  name: 'anchorId',
  type: 'text',
  admin: {
    description: 'Optional HTML id for this section (used for anchor links).',
  },
}
