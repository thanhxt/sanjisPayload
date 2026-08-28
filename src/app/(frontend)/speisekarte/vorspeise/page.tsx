import Appetizer from "@/components/speisekarte/vorspeise/appetizer";
import BackMenuButton from "@/components/speisekarte/backMenuButton";
import { metadata } from "../../layout";
import Head from "next/head";

// This page server-renders menu data via Payload, so it is prerendered at build
// time. Route segment config is only honoured in page/layout/route files, so the
// revalidate window has to live here rather than in the component.
export const revalidate = 60;

export default function Vorspeise() {
    metadata.title = "Vorspeise | Sanji's";
    metadata.description = "Vorspeise von Sanji's – Vorspeisen, Vorspeisen-Spezialitäten, Vorspeisen-Vorspeisen, Vorspeisen-Hauptgerichte, Vorspeisen-Desserts";

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/speisekarte/vorspeise" />
            </Head>
            <div>
                <BackMenuButton />
                <Appetizer />
            </div>
        </>
    )
}
