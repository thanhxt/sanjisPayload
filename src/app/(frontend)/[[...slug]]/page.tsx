import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Page as PageType } from "../../../../payload-types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { LivePreviewListener } from "@/components/blocks/LivePreviewListener";
import LandingPage from "@/components/landing-page";
import Introduction from "@/components/introduction";
import Reservations from "@/components/reservations";
import Maps from "@/components/maps";
import Gallery from "@/components/gallery/gallery";

export const revalidate = 60;

const SITE_URL = "https://sanjiskitchen.de";

type Args = { params: Promise<{ slug?: string[] }> };

const queryPageBySlug = cache(async (slug: string, draft: boolean): Promise<PageType | null> => {
    const payload = await getPayload({ config });

    const result = await payload.find({
        collection: 'pages',
        draft,
        limit: 1,
        depth: 2,
        overrideAccess: draft,
        where: { slug: { equals: slug } },
    });

    return result.docs[0] || null;
});

export async function generateStaticParams() {
    try {
        const payload = await getPayload({ config });
        const pages = await payload.find({
            collection: 'pages',
            draft: false,
            overrideAccess: false,
            limit: 100,
            select: { slug: true },
        });

        return pages.docs.map(({ slug }) => ({
            slug: slug === 'home' ? [] : slug.split('/'),
        }));
    } catch {
        // Without a database (e.g. CI builds) pages are rendered on demand.
        return [];
    }
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug: segments } = await params;
    const slug = segments?.join('/') || 'home';
    const { isEnabled: draft } = await draftMode();

    const page = await queryPageBySlug(slug, draft);
    if (!page) return {};

    const url = slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${slug}`;
    const title = page.meta?.title || page.title;
    const description = page.meta?.description || undefined;
    const metaImage = typeof page.meta?.image === 'object' ? page.meta.image : null;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            ...(metaImage?.url ? { images: [{ url: metaImage.url, alt: metaImage.alt || title }] } : {}),
        },
    };
}

export default async function Page({ params }: Args) {
    const { slug: segments } = await params;
    const slug = segments?.join('/') || 'home';
    const { isEnabled: draft } = await draftMode();

    const page = await queryPageBySlug(slug, draft);

    if (!page) {
        // Keeps the start page alive until the 'home' page document
        // has been created (see npm run seed:pages).
        if (slug === 'home') return <HomeFallback />;
        notFound();
    }

    // Hero and page header are designed to sit behind the transparent
    // fixed navbar; every other first block needs to clear it.
    const fullBleedBlocks = ['hero', 'pageHeader'];
    const firstBlockType = page.layout?.[0]?.blockType;
    const needsNavOffset = !firstBlockType || !fullBleedBlocks.includes(firstBlockType);

    const path = slug === 'home' ? '/' : `/${slug}`;

    return (
        <main className={needsNavOffset ? 'bg-black pt-20 md:pt-24' : ''}>
            {draft && <LivePreviewListener />}
            {draft && (
                <div className="fixed bottom-0 inset-x-0 z-[220] bg-yellow-400 text-black text-sm font-medium flex items-center justify-center gap-4 py-2 px-4">
                    <span>Entwurfsvorschau — Änderungen sind noch nicht veröffentlicht.</span>
                    <a
                        href={`/next/exit-preview?path=${encodeURIComponent(path)}`}
                        className="underline underline-offset-2 hover:no-underline"
                    >
                        Vorschau beenden
                    </a>
                </div>
            )}
            <BlockRenderer blocks={page.layout ?? []} />
        </main>
    );
}

function HomeFallback() {
    return (
        <main>
            <LandingPage />
            <Introduction />
            <Reservations />
            <Maps />
            <Gallery />
        </main>
    );
}
