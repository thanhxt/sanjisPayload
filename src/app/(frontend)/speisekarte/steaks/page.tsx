import { metadata } from "../../layout";
import Steaks from "@/components/speisekarte/steaks";
import Head from "next/head";

export default function SteaksPage() {
    metadata.title = "Steaks | Sanji's";
    metadata.description = "Steaks von Sanji's – Steakcuts, Sharing, Sides";

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/speisekarte/steaks" />
            </Head>
            <Steaks />
        </>
    )
}
