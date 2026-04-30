import type {
    CollectionAfterChangeHook,
} from 'payload'
import { revalidatePaths } from '@/lib/revalidate-paths'

/**
 * This is the afterChangeHook for the hero collection.
 * It is used to revalidate the about page when the hero collection is changed.
 */
export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req }) => {
    if (!doc.image) return doc;

    const pathToRevalidate = [
        `/about`,
        `/`,
        `/speisekarte`,
        `/kontakt`,
    ]

    await revalidatePaths({ paths: pathToRevalidate, req })

    return doc;
}
