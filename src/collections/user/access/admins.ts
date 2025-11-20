import type { Access } from 'payload'

import { checkRole } from './checkRole'

export const admins: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }
  return false
}

export default admins // export default admins