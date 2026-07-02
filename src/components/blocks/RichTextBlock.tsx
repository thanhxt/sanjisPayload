'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useLanguage } from '../contexts/language-context';
import type { RichTextBlockType } from '../../../payload-types';

export function RichTextBlock({ content }: RichTextBlockType) {
    const { language } = useLanguage();

    const data = language === 'de' ? content?.de ?? content?.en : content?.en ?? content?.de;
    if (!data) return null;

    return (
        <section className="bg-black text-white py-24 px-6">
            <div className="max-w-4xl mx-auto [&_h1]:text-4xl [&_h1]:font-light [&_h1]:mb-6 [&_h2]:text-3xl [&_h2]:font-light [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:mb-3 [&_p]:text-gray-300 [&_p]:mb-4 [&_p]:leading-relaxed [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1">
                <RichText data={data as unknown as SerializedEditorState} />
            </div>
        </section>
    );
}
