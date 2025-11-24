import type { CollectionConfig } from 'payload'
import { hashIP } from './hooks/hashIP'

export const ConsentLogs: CollectionConfig = {
    slug: 'consent-logs',
    admin: {
        group: 'System',
        useAsTitle: 'consentId',
    },
    access: {
        create: () => true, // Anyone can create a log
        read: ({ req: { user } }) => !!user, // Only logged in users (admins/editors) can read
        update: () => false, // Logs are immutable
        delete: ({ req: { user } }) => !!user && (user?.roles?.includes('admin') || false), // Only admins can delete
    },
    hooks: {
        beforeChange: [hashIP],
    },
    fields: [
        {
            name: 'consentId',
            type: 'text',
            required: true,
            index: true,
            label: 'Consent ID (UUID)',
        },
        {
            name: 'timestamp',
            type: 'date',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'ipHash',
            type: 'text',
            admin: {
                readOnly: true,
                description: 'Anonymized IP Address (SHA-256)',
            },
        },
        {
            name: 'preferences',
            type: 'json',
            required: true,
            label: 'Preferences (JSON)',
        },
        {
            name: 'userAgent',
            type: 'text',
            label: 'User Agent',
        },
        {
            name: 'policyVersion',
            type: 'text',
            label: 'Policy Version',
        },
    ],
}
