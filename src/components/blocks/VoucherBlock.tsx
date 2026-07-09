import Checkout from "../checkout/checkout";
import type { VoucherBlockType } from "../../../payload-types";

export function VoucherBlock({ anchorId }: VoucherBlockType) {
    return (
        <section id={anchorId || 'checkout'}>
            <Checkout />
        </section>
    );
}
