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
        <section className="bg-black text-white py-16 md:py-24 px-6 md:px-12 overflow-hidden">
            <div className={`max-w-[1600px] mx-auto flex flex-col md:flex-row ${imageLeft ? 'md:flex-row-reverse' : ''} items-center gap-10 md:gap-16`}>
                {/* Text */}
                <div className="flex-1 flex flex-col justify-center max-w-xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide mb-8 whitespace-pre-line">{pick(heading)}</h1>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className={index === 0 ? 'text-lg text-gray-300 mb-8 max-w-md' : 'text-gray-400 leading-relaxed mb-8 max-w-md'}>
                            {paragraph}
                        </p>
                    ))}
                    {ctaLabel && cta?.url && (
                        <button className="border border-gray-400 text-gray-200 text-2xl hover:bg-gray-800 transition rounded mt-2 w-max tracking-widest min-h-[44px] min-w-[44px]">
                            <Link href={cta.url} className="block px-6 py-4">
                                {ctaLabel}
                            </Link>
                        </button>
                    )}
                </div>
                {/* Image */}
                <div className="flex-1 w-full min-w-0">
                    <div className="relative w-full aspect-[4/3] lg:aspect-[7/6] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
