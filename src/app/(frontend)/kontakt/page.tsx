import Contact from "@/components/contact";
import { metadata } from "../layout";
import Head from "next/head";

export default function ContactPage() {
    metadata.title = "Kontakt | Sanji's";
    metadata.description = "Kontakt von Sanji's";

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/kontakt" />
            </Head>
            <Contact />
        </>
    )
}
