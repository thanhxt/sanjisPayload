import BackMenuButton from "@/components/speisekarte/backMenuButton";
import { metadata } from "../../layout";
import Head from "next/head";

export default function Desserts() {
    metadata.title = "Desserts | Sanji's";
    metadata.description = "Desserts von Sanji's";

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/speisekarte/desserts" />
            </Head>
            <div>
                <BackMenuButton />
                <h1>Desserts</h1>
            </div>
        </>
    )
}
