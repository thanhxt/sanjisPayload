import { CollectionAfterChangeHook } from "payload";
import { revalidatePaths } from "@/lib/revalidate-paths";

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req }) => {
    if (!doc.title) return doc;

    const pathToRevalidate = [
        `/speisekarte/vorspeise`
    ]

    await revalidatePaths({ paths: pathToRevalidate, req })

    return doc;
}
