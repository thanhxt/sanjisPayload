import Widerrufsbelehrung from "@/components/widerrufsbelehrung";

export const metadata = {
  title: "Widerrufsbelehrung | Sanji's – Steak, Grill & Bar München",
  description: "Widerrufsbelehrung für Bestellungen bei Sanji's Kitchen. Informationen zu Widerrufsrecht, Folgen und Muster-Widerrufsformular.",
  alternates: {
    canonical: "https://sanjiskitchen.de/widerrufsbelehrung",
  },
  openGraph: {
    title: "Widerrufsbelehrung | Sanji's – Steak, Grill & Bar München",
    description: "Widerrufsbelehrung für Bestellungen bei Sanji's Kitchen. Informationen zu Widerrufsrecht, Folgen und Muster-Widerrufsformular.",
    url: "https://sanjiskitchen.de/widerrufsbelehrung",
  },
};

export default function WiderrufsbelehrungPage() {
    return (
        <Widerrufsbelehrung />
    );
}