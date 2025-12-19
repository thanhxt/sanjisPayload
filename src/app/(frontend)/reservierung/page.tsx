import Reservations from "@/components/reservations";

export const metadata = {
    title: "Reservierung | Sanji's – Steak, Grill & Bar München",
    description: "Reservieren Sie Ihren Tisch online bei Sanji's Kitchen. Genießen Sie erstklassige Steaks und eine stilvolle Atmosphäre in München.",
    openGraph: {
        url: "https://sanjiskitchen.de/reservierung",
        title: "Reservierung | Sanji's – Steak, Grill & Bar München",
        description: "Reservieren Sie Ihren Tisch online bei Sanji's Kitchen. Genießen Sie erstklassige Steaks und eine stilvolle Atmosphäre in München.",
        type: "website",
    },
    alternates: {
        canonical: "https://sanjiskitchen.de/reservierung",
    },
    twitter: {
        card: "summary_large_image",
        title: "Reservierung | Sanji's – Steak, Grill & Bar München",
        description: "Reservieren Sie Ihren Tisch online bei Sanji's Kitchen.",
    },
};

export default function Reservierung() {
    return (
        <>
            <Reservations />
        </>
    )
}   