import Impressum from "@/components/impressum";

export const metadata = {
  title: "Impressum | Sanji's – Steak, Grill & Bar München",
  description: "Impressum von Sanji's – Angaben gemäß § 5 TMG, Kontakt, Umsatzsteuer-ID, EU-Streitschlichtung, Verbraucherstreitbeilegung.",
  alternates: {
    canonical: "https://sanjiskitchen.de/impressum",
  },
  openGraph: {
    title: "Impressum | Sanji's – Steak, Grill & Bar München",
    description: "Impressum von Sanji's – Angaben gemäß § 5 TMG, Kontakt, Umsatzsteuer-ID, EU-Streitschlichtung, Verbraucherstreitbeilegung.",
    url: "https://sanjiskitchen.de/impressum",
  },
};

export default function ImpressumPage() {
    return (
        <Impressum />
    );
}