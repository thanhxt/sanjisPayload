'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/language-context';
import type { HeroBlockType } from '../../../payload-types';

export function HeroBlock(props: HeroBlockType) {
    const { backgroundType, backgroundImage, backgroundSrc, showLogo, heading, showScrollIndicator } = props;
    const { language } = useLanguage();

    const media = typeof backgroundImage === 'object' ? backgroundImage : null;
    const imageUrl = media?.url || backgroundSrc || '/Sanjis_Julio-34.jpg';
    const headingText = (language === 'de' ? heading?.de || heading?.en : heading?.en || heading?.de) || '';

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {backgroundType === 'video' ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={media?.url || '/LandingPageImage2.jpg'}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={backgroundSrc || ''} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <Image
                    src={imageUrl}
                    alt={media?.alt || "Sanji's Kitchen"}
                    fill
                    priority
                    className="object-cover"
                />
            )}

            {/* Dark Border Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {showLogo !== false && (
                    <div className="w-48 h-48 mb-8">
                        <Image
                            src="/sanjislogo.svg"
                            alt="Sanji's Kitchen Logo"
                            width={192}
                            height={192}
                            priority
                            className="w-full h-full invert"
                        />
                    </div>
                )}
                {headingText && (
                    <h1 className="text-white text-4xl lg:text-5xl font-light tracking-widest text-center px-4 mb-8">
                        {headingText}
                    </h1>
                )}
                {showScrollIndicator !== false && (
                    <ChevronDown
                        className="w-12 h-12 text-white animate-bounce cursor-pointer"
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.scrollTo({
                                    top: window.innerHeight,
                                    behavior: 'smooth'
                                });
                            }
                        }} />
                )}
            </div>
        </div>
    );
}
