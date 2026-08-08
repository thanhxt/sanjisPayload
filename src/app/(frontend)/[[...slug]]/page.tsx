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

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url },
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

    return (
        <main className={needsNavOffset ? 'bg-black pt-20 md:pt-24' : ''}>
            {draft && <LivePreviewListener />}
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
