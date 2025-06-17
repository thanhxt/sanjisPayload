import MainDish from "@/components/speisekarte/hauptspeise/maindish";
import BackMenuButton from "@/components/speisekarte/backMenuButton";
import { metadata } from "../../layout";
import Head from "next/head";

export default function Hauptspeise() {
    metadata.title = "Hauptspeise | Sanji's";
    metadata.description = "Hauptspeise von Sanji's – Spezialitäten, Vorspeisen, Hauptgerichte, Desserts, Getränke";

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/speisekarte/hauptspeise" />
            </Head>
            <div>
                <MainDish />
                <BackMenuButton />
            </div>
        </>
    )
}
