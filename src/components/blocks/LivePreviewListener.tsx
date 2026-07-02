'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';

/**
 * Re-renders the current route whenever the document is saved
 * (or autosaved) in the Payload admin panel — this is what makes
 * the Live Preview panel update in real time.
 */
export function LivePreviewListener() {
    const router = useRouter();
    const serverURL =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    return <PayloadLivePreview refresh={() => router.refresh()} serverURL={serverURL} />;
}
