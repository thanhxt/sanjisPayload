import Impressum from "../impressum";
import Datenschutz from "../datenschutz";
import Widerrufsbelehrung from "../widerrufsbelehrung";
import type { LegalContentBlockType } from "../../../payload-types";

export function LegalContentBlock({ document }: LegalContentBlockType) {
    switch (document) {
        case 'impressum':
            return <Impressum />;
        case 'datenschutz':
            return <Datenschutz />;
        case 'widerrufsbelehrung':
            return <Widerrufsbelehrung />;
        default:
            return null;
    }
}
