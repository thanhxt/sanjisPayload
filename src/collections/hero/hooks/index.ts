import type {
    CollectionAfterChangeHook,
} from 'payload'

/**
 * This is the afterChangeHook for the hero collection.
 * It is used to revalidate the about page when the hero collection is changed.
 */
export const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
    if (!doc.image) return doc;

    const pathToRevalidate = [
        `/about`,
        `/`,
        `/speisekarte`,
        `/kontakt`,
    ]

    await Promise.all(
        pathToRevalidate.map(path =>
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path }),
            })
        )
    )

    return doc;
}