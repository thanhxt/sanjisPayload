import Image from "next/image";
import HeroImage from "../hero";
import HeroText from "../hero-text";
import type { PageHeaderBlockType } from "../../../payload-types";

export function PageHeaderBlock(props: PageHeaderBlockType) {
    const media = typeof props.image === 'object' ? props.image : null;

    return (
        <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
            {media?.url ? (
                <div className="absolute w-full h-full object-cover blur-md brightness-50 z-10">
                    <Image
                        src={media.url}
                        alt={media.alt || ''}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            ) : props.heroSlug ? (
                <HeroImage slug={props.heroSlug} />
            ) : null}
            <HeroText
                title={props.heading?.de || props.heading?.en || ''}
                titleEn={props.heading?.en || props.heading?.de || ''}
            />
        </div>
    );
}
