import Reservations from "@/components/reservations";
import { metadata } from "../layout";
import Head from "next/head";

export default function Reservierung() {
    metadata.title = "Reservierung | Sanji's";
    metadata.description = "Reservierung von Sanji's – Online-Reservierung, Reservierungstermin, Reservierungsanfrage, Reservierungsanfrage stellen";
    metadata.openGraph.url = "https://sanjiskitchen.de/reservierung";

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
            <Reservations />
        </>
    )
}   