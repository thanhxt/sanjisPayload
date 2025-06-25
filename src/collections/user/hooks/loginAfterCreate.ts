import type { CollectionAfterChangeHook } from 'payload'

import type { User } from '../../../../payload-types'   

export const loginAfterCreate: CollectionAfterChangeHook<User> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'create' && req.body) {
    const body = req.body as any
    const { email, password } = body

    if (email && password) {
      const { token, user } = await req.payload.login({
        collection: 'users',
        data: { email, password },
        req,
      })

      return {
        ...doc,
        token,
        user,
      }
    }
  }

  return doc
}