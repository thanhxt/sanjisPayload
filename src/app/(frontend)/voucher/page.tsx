import Head from "next/head";
import { metadata } from "../layout";
import Checkout from "@/components/checkout/checkout";

export default function VoucherPage() {
    metadata.title = "Gutschein | Sanji's";
    metadata.description = "Gutschein von Sanji's – Jetzt online bestellen und verschenken!";
    return (
        <>  
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="canonical" href="https://sanjiskitchen.de/voucher" />
            </Head>
            
            <div id="checkout">
                <Checkout />
            </div>
        </>
    )
}