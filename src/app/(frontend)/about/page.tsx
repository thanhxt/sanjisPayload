import Head from 'next/head';
import { metadata } from '../layout';
import AboutComponent from '@/components/about';

export default function About() {
    metadata.title = "Über uns | Sanji's";
    metadata.description = "Über uns von Sanji's – Geschichte, Team, Mission, Werte, Kontakt";
    metadata.openGraph.url = "https://sanjiskitchen.de/about";
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
            <AboutComponent />
        </>
    );
}
