import type  { FieldHook } from 'payload'
import type { User } from '../../../../payload-types'

export const protectRoles: FieldHook<{id: string} & User> = async ({req, data}) => {
    const isAdmin = req.user?.roles?.includes('admin')

    // If the current user is an admin, allow them to set any roles
    if (isAdmin) {
        const userRoles = new Set(data?.roles || [])
        
        // Only add 'user' role if it's not already present and if we're not setting admin roles
        if (!userRoles.has('user') && !userRoles.has('admin')) {
            userRoles.add('user')
        }
        
        return [...userRoles.values()]
    }

    // Check if there are any existing admin users
    try {
        const adminUsers = await req.payload.find({
            collection: 'users',
            where: {
                roles: {
                    contains: 'admin'
                }
            },
            limit: 1
        })

        // If no admin users exist, allow creating the first admin
        if (adminUsers.docs.length === 0) {
            console.log('No admin users found, allowing first admin creation')
            const userRoles = new Set(data?.roles || [])
            if (!userRoles.has('user')) {
                userRoles.add('user')
            }
            return [...userRoles.values()]
        }
    } catch (error) {
        console.log('Error checking for admin users:', error)
    }

    // If not admin and admin users exist, only allow 'user' role
    return [ 'user' ]
}