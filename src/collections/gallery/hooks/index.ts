import type {
    CollectionAfterChangeHook,
} from 'payload'
import { revalidatePaths } from '@/lib/revalidate-paths'

/**
 * This is the afterChangeHook for the gallery collection.
 * It is used to revalidate the about page when the gallery collection is changed.
 */
export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req }) => {
    if (!doc.images) return doc;

    const pathToRevalidate = [
        `/`
    ]

    await revalidatePaths({ paths: pathToRevalidate, req })

    return doc;
  }
