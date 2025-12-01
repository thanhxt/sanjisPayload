import Contact from "@/components/contact";
import HeroImage from "@/components/hero";

export const metadata = {
    title: "Kontakt | Sanji's",
    description: "Kontakt von Sanji's",
    alternates: {
        canonical: "https://sanjiskitchen.de/kontakt",
    },
};

export default function ContactPage() {
    return (
        <>
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                <HeroImage slug="kontaktHero" />
                <h1 className="relative text-white z-20 text-4xl text-center">Kontakt</h1>
            </div>
            <Contact />
        </>
    )
}
