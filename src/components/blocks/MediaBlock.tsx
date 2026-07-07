'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/language-context';
import type { MediaBlockType } from '../../../payload-types';

const isVideo = (src: string) => /\.(mp4|mov|webm)$/i.test(src);

export function MediaBlock({ media, staticSrc, size, caption, link, anchorId }: MediaBlockType) {
    const { language } = useLanguage();

    const mediaDoc = typeof media === 'object' ? media : null;
    const src = mediaDoc?.url || staticSrc;
    if (!src) return null;

    const captionText =
        (language === 'de' ? caption?.de || caption?.en : caption?.en || caption?.de) || '';

    const content = (
        <div className={`relative w-full overflow-hidden ${size === 'full' ? '' : 'rounded-2xl shadow-2xl'}`}>
            {isVideo(src) ? (
                <video autoPlay loop muted playsInline className="w-full h-auto object-cover">
                    <source src={src} />
                </video>
            ) : mediaDoc?.width && mediaDoc?.height ? (
                <Image
                    src={src}
                    alt={mediaDoc?.alt || captionText || ''}
                    width={mediaDoc.width}
                    height={mediaDoc.height}
                    sizes={size === 'full' ? '100vw' : '(max-width: 1024px) 100vw, 1024px'}
                    className="w-full h-auto object-cover"
                />
            ) : (
                <div className="relative w-full aspect-video">
                    <Image
                        src={src}
                        alt={mediaDoc?.alt || captionText || ''}
                        fill
                        sizes={size === 'full' ? '100vw' : '(max-width: 1024px) 100vw, 1024px'}
                        className="object-cover"
                    />
                </div>
            )}
        </div>
    );

    return (
        <section id={anchorId || undefined} className={`bg-black text-white ${size === 'full' ? '' : 'py-12 px-6'}`}>
            <figure className={size === 'full' ? '' : 'max-w-5xl mx-auto'}>
                {link?.url ? (
                    <Link href={link.url} target={link.newTab ? '_blank' : undefined} className="block transition-opacity hover:opacity-90">
                        {content}
                    </Link>
                ) : (
                    content
                )}
                {captionText && (
                    <figcaption className="text-center text-gray-400 font-light mt-4">{captionText}</figcaption>
                )}
            </figure>
        </section>
    );
}
