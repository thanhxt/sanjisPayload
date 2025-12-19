import Datenschutz from "@/components/datenschutz";

export const metadata = {
  title: "Datenschutz | Sanji's – Steak, Grill & Bar München",
  description: "Datenschutzerklärung von Sanji's – Informationen zu Cookies, Hosting, OpenTable, Google Maps & Co.",
  alternates: {
    canonical: "https://sanjiskitchen.de/datenschutz",
  },
  openGraph: {
    title: "Datenschutz | Sanji's – Steak, Grill & Bar München",
    description: "Datenschutzerklärung von Sanji's – Informationen zu Cookies, Hosting, OpenTable, Google Maps & Co.",
    url: "https://sanjiskitchen.de/datenschutz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Datenschutz | Sanji's – Steak, Grill & Bar München",
    description: "Datenschutzerklärung von Sanji's – Informationen zu Cookies, Hosting, OpenTable, Google Maps & Co.",
  },
};

export default function DatenschutzPage() {
    return (   
        <Datenschutz />    
    );
}