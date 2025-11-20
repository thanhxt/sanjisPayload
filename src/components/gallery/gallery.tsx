import { getPayload } from "payload";
import config from "@payload-config";
import type { Gallery } from "@/type/galleryType";
import GalleryContent from "./gallery-content";

export default async function Gallery() {
    const payload = await getPayload({ config });

    // Get the gallery
    const result = await payload.find({
        collection: 'gallery',
    });

    const gallery: Gallery[] = result.docs as Gallery[];
    

    return (
        <GalleryContent gallery={gallery} />
    )
}
