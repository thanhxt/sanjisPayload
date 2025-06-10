import Speisekarte from "@/components/speisekarte/speisekarte"
import Head from "next/head";
import { metadata } from "../layout";
import HeroImage from "@/components/hero";

export default function SpeisekartePage() {
    metadata.title = "Speisekarte | Sanji's";
    metadata.description = "Speisekarte von Sanji's – Spezialitäten, Vorspeisen, Hauptgerichte, Desserts, Getränke";

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/speisekarte" />
            </Head>
            <div>
                {/* Hero Section */}
                <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                    <HeroImage slug="speisekarteHero" />
                    <h1 className="relative text-white z-20 text-4xl text-center">
                        Speisekarte
                    </h1>
                </div>
                <Speisekarte />
            </div>
        </>
    )
}
