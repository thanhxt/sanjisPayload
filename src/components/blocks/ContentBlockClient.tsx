'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/language-context';
import type { ContentBlockType } from '../../../payload-types';

type ContentBlockClientProps = Pick<ContentBlockType, 'heading' | 'body' | 'imagePosition' | 'cta'> & {
    imageUrl: string;
    imageAlt: string;
};

export function ContentBlockClient({ heading, body, cta, imagePosition, imageUrl, imageAlt }: ContentBlockClientProps) {
    const { language } = useLanguage();

    const pick = (value?: { de?: string | null; en?: string | null } | null) =>
        (language === 'de' ? value?.de || value?.en : value?.en || value?.de) || '';

    const paragraphs = pick(body).split(/\n\s*\n/).filter(Boolean);
    const ctaLabel = pick(cta?.label);
    const imageLeft = imagePosition === 'left';

    return (
        <div className="relative bg-black text-white min-h-screen overflow-hidden flex items-center justify-center">
            <div className={`relative z-10 flex flex-col md:flex-row ${imageLeft ? 'md:flex-row-reverse' : ''} items-stretch w-full max-w-[1600px] h-auto md:h-[80vh] mx-auto gap-12 md:gap-0`}>
                {/* Text */}
                <div className="order-1 md:order-none flex-1 flex flex-col justify-center max-w-xl pl-6 pr-6 md:pl-24 md:pr-16 z-20">
                    <h1 className="text-5xl lg:text-6xl font-light tracking-wide mb-8 mt-8 whitespace-pre-line">{pick(heading)}</h1>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className={index === 0 ? 'text-lg text-gray-300 mb-10 max-w-md' : 'text-gray-400 leading-relaxed mb-10 max-w-md'}>
                            {paragraph}
                        </p>
                    ))}
                    {ctaLabel && cta?.url && (
                        <button className="border border-gray-400 text-gray-200 text-2xl hover:bg-gray-800 transition rounded mt-4 mb-6 w-max tracking-widest min-h-[44px] min-w-[44px] relative z-20">
                            <Link href={cta.url} className="block px-6 py-4">
                                {ctaLabel}
                            </Link>
                        </button>
                    )}
                </div>
                {/* Image */}
                <div className="order-2 md:order-none flex-1 relative flex items-center justify-center md:justify-end min-h-0 h-auto md:pl-16 pr-6 md:pr-16 mt-8 md:mt-0 z-0">
                    <div className="w-full h-[360px] sm:w-[400px] sm:h-[380px] md:w-[700px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative z-10 mx-auto">
                        <Image src={imageUrl} alt={imageAlt} fill className="object-cover object-center" priority />
                    </div>
                </div>
            </div>
        </div>
    );
}
