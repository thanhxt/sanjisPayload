import Gallery from "../gallery/gallery";
import type { GalleryBlockType } from "../../../payload-types";

export function GalleryBlock({ anchorId }: GalleryBlockType) {
    return (
        <section id={anchorId || undefined}>
            <Gallery />
        </section>
    );
}
