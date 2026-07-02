import Reservations from "../reservations";
import type { ReservationsBlockType } from "../../../payload-types";

export function ReservationsBlock({ anchorId }: ReservationsBlockType) {
    return (
        <section id={anchorId || undefined}>
            <Reservations />
        </section>
    );
}
