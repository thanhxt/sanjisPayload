import type {
    CollectionAfterChangeHook,
} from 'payload'
import { revalidatePaths } from '@/lib/revalidate-paths'

/**
 * This is the afterChangeHook for the team collection.
 * It is used to revalidate the about page when the team collection is changed.
 */
export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req }) => {
    if (!doc.Bild) return doc;

    const pathToRevalidate = [
        `/about`
    ]

    await revalidatePaths({ paths: pathToRevalidate, req })

    return doc;
  }
