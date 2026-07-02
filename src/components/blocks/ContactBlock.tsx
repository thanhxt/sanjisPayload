import Contact from "../contact";
import type { ContactBlockType } from "../../../payload-types";

export function ContactBlock({ anchorId }: ContactBlockType) {
    return (
        <section id={anchorId || undefined}>
            <Contact />
        </section>
    );
}
