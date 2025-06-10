import type {
    CollectionAfterChangeHook,
} from 'payload'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
    if (doc.Bild) {
        const payload = await getPayload({ config })
        const image = await payload.find({
            collection: 'media',
            where: {
                id: {
                    equals: doc.Bild
                }
            }
        })
        doc.Bild = image.docs[0].id
    }
    return doc
  }