import Speisekarte from "@/components/speisekarte/speisekarte"
import Image from "next/image"
import Head from "next/head";
import { metadata } from "../layout";

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
            <div style={{
                position: 'relative',
                width: '100%',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '0',
                background: '#000',
            }}>
                <Image
                    src="/Sanjis_Julio-36.jpg"
                    alt="Background"
                    width={1000}
                    height={1000}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(8px) brightness(0.5)',
                        zIndex: 1,
                    }}
                />
                <h1 style={{
                    position: 'relative',
                    color: '#fff',
                    zIndex: 2,
                    fontSize: '2.5rem',
                    textAlign: 'center',
                }}>
                    Speisekarte
                </h1>
            </div>
            <Speisekarte />
            </div>
        </>
    )
}
