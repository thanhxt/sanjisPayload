import Impressum from "@/components/impressum";
import { metadata } from "../layout";
import Head from "next/head";

export default function ImpressumPage() {
    metadata.title = "Impressum | Sanji's";
    metadata.description = "Impressum von Sanji's – Angaben gemäß § 5 TMG, Kontakt, Umsatzsteuer-ID, EU-Streitschlichtung, Verbraucherstreitbeilegung/Universalschlichtungsstelle";
    metadata.openGraph.url = "https://sanjiskitchen.de/impressum";
    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href={metadata.openGraph.url} />
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta property="og:url" content={metadata.openGraph.url} />
            </Head>
            <Impressum />
        </>
    );
}