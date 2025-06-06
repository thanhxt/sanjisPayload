import Lunch from "@/components/speisekarte/lunch";
import BackMenuButton from "@/components/speisekarte/backMenuButton";
import { metadata } from "../../layout";
import Head from "next/head";

export default function Mittagstisch() {
    metadata.title = "Mittagstisch | Sanji's";
    metadata.description = "Mittagstisch von Sanji's – Mittagstisch, Mittagstisch-Spezialitäten, Mittagstisch-Vorspeisen, Mittagstisch-Hauptgerichte, Mittagstisch-Desserts, Mittagstisch-Getränke";

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/speisekarte/lunch" />
            </Head>
            <div>
                <Lunch />
                <BackMenuButton />
            </div>
        </>
    )
}
