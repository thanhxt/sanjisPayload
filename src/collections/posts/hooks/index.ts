import type {
    CollectionAfterChangeHook,
} from 'payload'

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
    if (!doc.Bild) return doc;

    const pathToRevalidate = [
        `/about`
    ]

    await Promise.all([
        pathToRevalidate.map(path =>
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path }),
            })
          )
    ])

    return doc;
  }