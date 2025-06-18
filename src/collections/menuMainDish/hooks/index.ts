import { CollectionAfterChangeHook } from "payload";

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
    if (!doc.titleDE) return doc;

    const pathToRevalidate = [
        `/speisekarte/hauptspeise`,
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