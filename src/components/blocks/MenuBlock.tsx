import Speisekarte from "../speisekarte/speisekarte";
import type { MenuBlockType } from "../../../payload-types";

export function MenuBlock({ anchorId }: MenuBlockType) {
    return (
        <section id={anchorId || undefined}>
            <Speisekarte />
        </section>
    );
}
