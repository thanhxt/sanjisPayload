'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/language-context';
import type { FaqBlockType } from '../../../payload-types';

export function FaqBlock({ heading, items, anchorId }: FaqBlockType) {
    const { language } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const pick = (value?: { de?: string | null; en?: string | null } | null) =>
        (language === 'de' ? value?.de || value?.en : value?.en || value?.de) || '';

    if (!items || items.length === 0) return null;

    return (
        <section id={anchorId || undefined} className="bg-black text-white py-16 md:py-24 px-6">
            <div className="max-w-3xl mx-auto">
                {pick(heading) && (
                    <h2 className="text-4xl lg:text-5xl font-light tracking-widest mb-10 text-center uppercase">
                        {pick(heading)}
                    </h2>
                )}
                <div className="divide-y divide-white/10 border-y border-white/10">
                    {items.map((item, index) => {
                        const open = openIndex === index;
                        return (
                            <div key={item.id || index}>
                                <button
                                    onClick={() => setOpenIndex(open ? null : index)}
                                    aria-expanded={open}
                                    className="w-full flex items-center justify-between gap-4 py-5 text-left text-lg md:text-xl font-light hover:text-yellow-300 transition-colors"
                                >
                                    <span>{pick(item.question)}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-yellow-400' : 'text-gray-400'}`}
                                    />
                                </button>
                                {open && (
                                    <p className="pb-6 text-gray-300 font-light leading-relaxed whitespace-pre-line">
                                        {pick(item.answer)}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
