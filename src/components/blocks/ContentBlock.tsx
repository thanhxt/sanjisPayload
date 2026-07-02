import { getPayload } from "payload";
import config from "@payload-config";
import type { ContentBlockType } from "../../../payload-types";
import type { Hero } from "@/type/heroType";
import { ContentBlockClient } from "./ContentBlockClient";

async function resolveImage(props: ContentBlockType): Promise<{ url: string; alt: string }> {
    const media = typeof props.image === 'object' ? props.image : null;
    if (media?.url) return { url: media.url, alt: media.alt || '' };

    if (props.heroSlug) {
        const payload = await getPayload({ config });
        const result = await payload.find({
            collection: 'hero',
            where: { title: { equals: props.heroSlug } },
            limit: 1,
        });
        const hero = result.docs[0] as Hero | undefined;
        if (hero?.image?.url) return { url: hero.image.url, alt: hero.title };
    }

    if (props.staticSrc) return { url: props.staticSrc, alt: '' };

    return { url: '/notFound.jpg', alt: '' };
}

export async function ContentBlock(props: ContentBlockType) {
    const { url, alt } = await resolveImage(props);

    return (
        <ContentBlockClient
            heading={props.heading}
            body={props.body}
            cta={props.cta}
            imagePosition={props.imagePosition}
            imageUrl={url}
            imageAlt={alt}
        />
    );
}
