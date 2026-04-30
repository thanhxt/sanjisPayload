import { CollectionAfterChangeHook } from "payload";
import { revalidatePaths } from "@/lib/revalidate-paths";

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req }) => {
    if (!doc.titleDE) return doc;

    const pathToRevalidate = [
        `/speisekarte/hauptspeise`,
    ]

    await revalidatePaths({ paths: pathToRevalidate, req })
    return doc;
}
