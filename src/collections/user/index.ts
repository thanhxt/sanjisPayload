import type { CollectionConfig } from 'payload'

import { checkRole } from './access/checkRole'
import { admins } from './access/admins'
import { editor } from './access/editor' 
import { anyone } from './access/anyone'
import { protectRoles } from './hooks/protectRoles'
import { loginAfterCreate } from './hooks/loginAfterCreate'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 28800, // 8 hours
    cookies: {
      sameSite: 'None',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'User Management',
    description: 'Manage all users: admins, editors, and regular users',
  },
  access: {
    read: editor, // Editors and admins can read users
    create: anyone, // Anyone can create a user (registration)
    update: editor, // Editors and admins can update users
    delete: admins, // Only admins can delete users
    unlock: admins, // Only admins can unlock users
    admin: ({ req: { user } }) => checkRole(['admin', 'editor'], user), // Both admins and editors can access admin panel
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      admin: {
        description: 'User\'s first name',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        description: 'User\'s last name',
      },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      admin: {
        description: 'User roles - Admin: full access, Editor: content management, User: basic access',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this user account is active',
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Last login date',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}