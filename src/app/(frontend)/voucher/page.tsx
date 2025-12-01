import Checkout from "@/components/checkout/checkout";

export const metadata = {
    title: "Gutschein | Sanji's",
    description: "Gutschein von Sanji's – Jetzt online bestellen und verschenken!",
    alternates: {
        canonical: "https://sanjiskitchen.de/voucher",
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