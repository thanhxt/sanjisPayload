import type { CollectionConfig } from 'payload'
import { checkRole } from '../user/access/checkRole'

export const Admin: CollectionConfig = {
  slug: 'admin',
  admin: {
    useAsTitle: 'title',
    group: 'Admin Settings',
    description: 'Manage admin panel settings and configurations',
  },
  access: {
    read: ({ req: { user } }) => checkRole(['admin'], user),
    create: ({ req: { user } }) => checkRole(['admin'], user),
    update: ({ req: { user } }) => checkRole(['admin'], user),
    delete: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'A descriptive title for this admin panel setting',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Site Configuration',
          value: 'site-config',
        },
        {
          label: 'Admin Panel Settings',
          value: 'admin-settings',
        },
        {
          label: 'System Configuration',
          value: 'system-config',
        },
        {
          label: 'Feature Flags',
          value: 'feature-flags',
        },
        {
          label: 'API Settings',
          value: 'api-settings',
        },
      ],
      admin: {
        description: 'Category of this admin setting',
      },
    },
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for this setting (e.g., "maintenance_mode", "max_upload_size")',
      },
    },
    {
      name: 'value',
      type: 'textarea',
      admin: {
        description: 'The configuration value (can be JSON, string, number, etc.)',
      },
    },
    {
      name: 'dataType',
      type: 'select',
      required: true,
      defaultValue: 'string',
      options: [
        {
          label: 'String',
          value: 'string',
        },
        {
          label: 'Number',
          value: 'number',
        },
        {
          label: 'Boolean',
          value: 'boolean',
        },
        {
          label: 'JSON Object',
          value: 'json',
        },
        {
          label: 'Array',
          value: 'array',
        },
      ],
      admin: {
        description: 'The data type of the value',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of what this setting controls and how to use it',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this setting is currently active/enabled',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this setting can be accessed by frontend/public API',
      },
    },
    {
      name: 'environment',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Development',
          value: 'development',
        },
        {
          label: 'Staging',
          value: 'staging',
        },
        {
          label: 'Production',
          value: 'production',
        },
      ],
      admin: {
        description: 'Which environments this setting applies to',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Add audit trail
        data.lastModifiedBy = req.user?.id
        data.lastModifiedAt = new Date().toISOString()
        return data
      },
    ],
  },
}
