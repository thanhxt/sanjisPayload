import Maps from "../maps";
import type { MapsBlockType } from "../../../payload-types";

export function MapsBlock({ anchorId }: MapsBlockType) {
    return (
        <section id={anchorId || undefined}>
            <Maps />
        </section>
    );
}
