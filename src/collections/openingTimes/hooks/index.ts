import { CollectionAfterChangeHook } from "payload";
import { revalidatePaths } from "@/lib/revalidate-paths";

export const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req }) => {
    if (!doc.Feld1) return doc;

    const pathToRevalidate = [
        `/`,
        `/kontakt`,
    ]

    await revalidatePaths({ paths: pathToRevalidate, req })
    return doc;
}
