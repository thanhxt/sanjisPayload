import { CollectionAfterChangeHook } from "payload";

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
    if (!doc.Feld1) return doc;

    const pathToRevalidate = [
        `/`,
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