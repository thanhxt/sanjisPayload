import React from "react";
import type { Page } from "../../../payload-types";
import { HeroBlock } from "./HeroBlock";
import { PageHeaderBlock } from "./PageHeaderBlock";
import { ContentBlock } from "./ContentBlock";
import { RichTextBlock } from "./RichTextBlock";
import { CallToActionBlock } from "./CallToActionBlock";
import { GalleryBlock } from "./GalleryBlock";
import { ReservationsBlock } from "./ReservationsBlock";
import { MapsBlock } from "./MapsBlock";
import { TeamBlock } from "./TeamBlock";
import { ContactBlock } from "./ContactBlock";
import { LegalContentBlock } from "./LegalContentBlock";

type LayoutBlock = NonNullable<Page['layout']>[number];

/**
 * Maps each Payload block (by blockType) to its React component.
 * The switch keeps full type narrowing per block.
 */
export function BlockRenderer({ blocks }: { blocks: LayoutBlock[] }) {
    return (
        <>
            {blocks.map((block, index) => {
                const key = block.id || `${block.blockType}-${index}`;

                switch (block.blockType) {
                    case 'hero':
                        return <HeroBlock key={key} {...block} />;
                    case 'pageHeader':
                        return <PageHeaderBlock key={key} {...block} />;
                    case 'mediaText':
                        return <ContentBlock key={key} {...block} />;
                    case 'richText':
                        return <RichTextBlock key={key} {...block} />;
                    case 'cta':
                        return <CallToActionBlock key={key} {...block} />;
                    case 'gallery':
                        return <GalleryBlock key={key} {...block} />;
                    case 'reservations':
                        return <ReservationsBlock key={key} {...block} />;
                    case 'maps':
                        return <MapsBlock key={key} {...block} />;
                    case 'team':
                        return <TeamBlock key={key} {...block} />;
                    case 'contact':
                        return <ContactBlock key={key} {...block} />;
                    case 'legalContent':
                        return <LegalContentBlock key={key} {...block} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}
