'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from './contexts/language-context';
import type { Announcement } from '../../payload-types';

/**
 * Site-wide speech bubble at the bottom right, fed by the
 * Announcement global. Dismissing it collapses it to a small
 * button for the rest of the session; a new message reappears.
 */
export default function AnnouncementBubble({ announcement }: { announcement: Announcement | null }) {
    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(true);

    const message =
        (language === 'de'
            ? announcement?.message?.de || announcement?.message?.en
            : announcement?.message?.en || announcement?.message?.de) || '';

    // Session storage key changes with the message, so editing the
    // announcement shows the bubble again even after a dismissal.
    const storageKey = `announcement-dismissed:${announcement?.message?.de || ''}`;

    useEffect(() => {
        setMounted(true);
        try {
            setOpen(sessionStorage.getItem(storageKey) !== '1');
        } catch {
            // Ignore unavailable sessionStorage (private mode).
        }
    }, [storageKey]);

    if (!announcement?.enabled || !message || !mounted) return null;

    const dismiss = () => {
        setOpen(false);
        try {
            sessionStorage.setItem(storageKey, '1');
        } catch {
            // Ignore unavailable sessionStorage.
        }
    };

    const reopen = () => {
        setOpen(true);
        try {
            sessionStorage.removeItem(storageKey);
        } catch {
            // Ignore unavailable sessionStorage.
        }
    };

    const linkLabel =
        (language === 'de'
            ? announcement.link?.label?.de || announcement.link?.label?.en
            : announcement.link?.label?.en || announcement.link?.label?.de) || '';

    if (!open) {
        return (
            <button
                onClick={reopen}
                aria-label="Show announcement"
                className="fixed bottom-24 right-6 z-[210] w-12 h-12 rounded-full bg-yellow-400 text-black shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-24 right-6 z-[210] max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative bg-zinc-900/95 backdrop-blur-md border border-white/15 text-white rounded-2xl rounded-br-sm shadow-2xl p-4 pr-10">
                <button
                    onClick={dismiss}
                    aria-label="Dismiss announcement"
                    className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
                <p className="text-sm font-light leading-relaxed whitespace-pre-line">{message}</p>
                {announcement.link?.url && linkLabel && (
                    <Link
                        href={announcement.link.url}
                        target={announcement.link.newTab ? '_blank' : undefined}
                        className="inline-block mt-3 text-sm text-yellow-400 hover:text-yellow-300 underline underline-offset-4"
                    >
                        {linkLabel}
                    </Link>
                )}
                {/* Speech bubble tail */}
                <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-zinc-900/95 border-r border-b border-white/15 rotate-45" />
            </div>
        </div>
    );
}
