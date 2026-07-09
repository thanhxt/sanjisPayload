'use client';

import { useState } from 'react';
import { useLanguage } from '../contexts/language-context';
import type { MenuSectionBlockType } from '../../../payload-types';

type Bilingual = { de?: string | null; en?: string | null } | null | undefined;
type Group = NonNullable<MenuSectionBlockType['groups']>[number];
type Item = NonNullable<Group['items']>[number];

const usePick = () => {
    const { language } = useLanguage();
    return (value: Bilingual) =>
        (language === 'de' ? value?.de || value?.en : value?.en || value?.de) || '';
};

function PriceLines({ prices, inline }: { prices: Item['prices']; inline?: boolean }) {
    if (!prices || prices.length === 0) return null;

    if (inline) {
        return (
            <span className="text-base md:text-lg font-semibold tabular-nums whitespace-nowrap">
                {prices.map((p) => [p.label, p.price].filter(Boolean).join(' ')).join(' | ')}
            </span>
        );
    }

    return (
        <div>
            {prices.map((p) => (
                <div key={p.id}>{[p.label, p.price].filter(Boolean).join(' | ')}</div>
            ))}
        </div>
    );
}

function ListItem({ item }: { item: Item }) {
    const pick = usePick();

    return (
        <div className="group mb-6 border-b border-white/5 pb-4">
            <div className="flex items-baseline gap-3">
                <span className="text-xl md:text-2xl font-medium transition-colors group-hover:text-yellow-300">{item.name}</span>
                <span className="flex-1 -translate-y-1 border-b border-dotted border-white/20" />
                <PriceLines prices={item.prices} inline />
            </div>
            {pick(item.subtitle) && <p className="mt-1 text-base text-gray-300">{pick(item.subtitle)}</p>}
            {pick(item.description) && (
                <p className="mt-1 max-w-prose text-sm md:text-base text-gray-400 whitespace-pre-line">{pick(item.description)}</p>
            )}
        </div>
    );
}

function CardItem({ item }: { item: Item }) {
    const pick = usePick();

    if (item.highlight) {
        return (
            <div className="w-full border-2 border-gray-600 p-8 my-6 text-center bg-zinc-800 rounded-sm">
                <div className="font-bold text-3xl mb-3">{item.name}</div>
                {pick(item.subtitle) && <div className="font-bold text-xl mb-2">{pick(item.subtitle)}</div>}
                {pick(item.description) && <div className="text-base mb-2 whitespace-pre-line">{pick(item.description)}</div>}
                <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-10 text-xl font-bold">
                    {(item.prices ?? []).map((p) => (
                        <span key={p.id}>{[p.label, p.price].filter(Boolean).join(' ')}</span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full md:w-[calc(33.333%-1rem)] text-center border-t-2 border-b-2 border-gray-600 py-6">
            <div className="font-bold">- {item.name} -</div>
            {pick(item.subtitle) && <div className="font-semibold">{pick(item.subtitle)}</div>}
            {pick(item.description) && <div className="whitespace-pre-line">{pick(item.description)}</div>}
            {pick(item.region) && <div className="text-[0.95em] my-2">{pick(item.region)}</div>}
            <PriceLines prices={item.prices} />
        </div>
    );
}

function MenuGroup({ group }: { group: Group }) {
    const pick = usePick();
    const items = group.items ?? [];

    return (
        <div className="mb-10">
            {(pick(group.title) || pick(group.intro)) && (
                <div className="text-center mb-6">
                    {pick(group.title) && <div className="font-bold text-lg mb-2 uppercase tracking-widest">{pick(group.title)}</div>}
                    {pick(group.intro) && <div className="text-[0.95em] text-gray-300 whitespace-pre-line">{pick(group.intro)}</div>}
                </div>
            )}
            {group.layout === 'cards' ? (
                <div className="flex flex-wrap justify-center gap-4">
                    {items.map((item) => (
                        <CardItem key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="max-w-3xl mx-auto">
                    {items.map((item) => (
                        <ListItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function MenuSectionBlock({ heading, groups, note, anchorId }: MenuSectionBlockType) {
    const pick = usePick();
    const [open, setOpen] = useState(false);

    return (
        <section id={anchorId || undefined} className="bg-[#111] text-white">
            {/* Accordion heading */}
            <button
                onClick={() => setOpen(!open)}
                className={`menu-section relative block w-full text-center border-b border-[#333] py-[60px] text-[clamp(2rem,5vw,4.5rem)] tracking-[0.06em] transition-all duration-300 cursor-pointer hover:tracking-[0.14em] ${
                    open ? 'bg-[#222] text-white opacity-100' : 'bg-[#111] text-[#888] opacity-60 hover:text-white hover:opacity-100'
                }`}
            >
                {pick(heading)}
            </button>

            {/* Accordion content */}
            {open && (
                <div className="bg-black py-12 px-4 md:px-10">
                    <div className="max-w-[1200px] mx-auto text-lg">
                        {(groups ?? []).map((group) => (
                            <MenuGroup key={group.id} group={group} />
                        ))}
                        {pick(note) && (
                            <div className="text-center text-sm md:text-base text-gray-300 whitespace-pre-line mt-8">{pick(note)}</div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
