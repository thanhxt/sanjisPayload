import Contact from "@/components/contact";
import { metadata } from "../layout";
import Head from "next/head";
import HeroImage from "@/components/hero";

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
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                <HeroImage slug="kontaktHero" />
                <h1 className="relative text-white z-20 text-4xl text-center">Kontakt</h1>
            </div>
            <Contact />
        </>
    )
}
