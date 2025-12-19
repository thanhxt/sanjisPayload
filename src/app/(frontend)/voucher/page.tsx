import Checkout from "@/components/checkout/checkout";

export const metadata = {
    title: "Gutschein kaufen | Sanji's – Steak, Grill & Bar München",
    description: "Verschenken Sie Genuss mit einem Gutschein von Sanji's Kitchen. Einfach online bestellen, personalisieren und sofort ausdrucken oder versenden.",
    alternates: {
        canonical: "https://sanjiskitchen.de/voucher",
    },
    openGraph: {
        title: "Gutschein kaufen | Sanji's – Steak, Grill & Bar München",
        description: "Verschenken Sie Genuss mit einem Gutschein von Sanji's Kitchen. Einfach online bestellen, personalisieren und sofort ausdrucken oder versenden.",
        url: "https://sanjiskitchen.de/voucher",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gutschein kaufen | Sanji's – Steak, Grill & Bar München",
        description: "Verschenken Sie Genuss mit einem Gutschein von Sanji's Kitchen.",
    },
};

export default function VoucherPage() {
    return (
        <>
            <div id="checkout">
                <Checkout />
            </div>
        </>
    )
}