import Datenschutz from "@/components/datenschutz";
import Head from "next/head";
import { metadata } from "../layout";

export default function DatenschutzPage() {
    metadata.title = "Datenschutz | Sanji's";
    metadata.description =
      "Datenschutzerklärung von Sanji's – Informationen zu Cookies, Hosting, OpenTable, Google Maps & Co.";
    const pageUrl = "https://sanjiskitchen.de/datenschutz";

    return (   
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="canonical" href={pageUrl} />
      
            <meta property="og:type" content="website" />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            {/* <meta property="og:image" content="https://sanjiskitchen.de/images/og-default.jpg" /> */}
      
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            {/* <meta name="twitter:image" content="https://sanjiskitchen.de/images/twitter-default.jpg" /> */}
        </Head>
        <Datenschutz />    
    </>
    );
}