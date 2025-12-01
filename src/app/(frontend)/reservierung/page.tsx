import Reservations from "@/components/reservations";

export const metadata = {
    title: "Reservierung | Sanji's",
    description: "Reservierung von Sanji's – Online-Reservierung, Reservierungstermin, Reservierungsanfrage, Reservierungsanfrage stellen",
    openGraph: {
        url: "https://sanjiskitchen.de/reservierung",
        title: "Reservierung | Sanji's",
        description: "Reservierung von Sanji's – Online-Reservierung, Reservierungstermin, Reservierungsanfrage, Reservierungsanfrage stellen",
    },
    alternates: {
        canonical: "https://sanjiskitchen.de/reservierung",
    },
};

export default function Reservierung() {
    return (
        <>
            <Reservations />
        </>
    )
}   