'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useLanguage } from '../contexts/language-context';
import type { CallToActionBlockType } from '../../../payload-types';

export function CallToActionBlock({ heading, text, buttons }: CallToActionBlockType) {
    const { language } = useLanguage();

    const pick = (value?: { de?: string | null; en?: string | null } | null) =>
        (language === 'de' ? value?.de || value?.en : value?.en || value?.de) || '';

    return (
        <section className="bg-black text-white py-24 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl lg:text-5xl font-light tracking-widest mb-6 uppercase">{pick(heading)}</h2>
                {pick(text) && (
                    <p className="text-lg text-gray-300 font-light leading-relaxed mb-10 whitespace-pre-line">{pick(text)}</p>
                )}
                {buttons && buttons.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {buttons.map((button) => (
                            <Button
                                key={button.id}
                                variant="outline"
                                asChild
                                className="text-base py-6 px-8 border-white/30 bg-white/5 hover:bg-white/20 hover:border-white/50 text-white transition-all duration-300 rounded-xl"
                            >
                                <Link href={button.url} target={button.newTab ? '_blank' : undefined}>
                                    {pick(button.label)}
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
