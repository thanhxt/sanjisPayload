import Speisekarte from "@/components/speisekarte/speisekarte"
import HeroImage from "@/components/hero";
import HeroText from "@/components/hero-text";

export const metadata = {
    title: "Speisekarte | Sanji's",
    description: "Speisekarte von Sanji's – Spezialitäten, Vorspeisen, Hauptgerichte, Desserts, Getränke",
    alternates: {
        canonical: "https://sanjiskitchen.de/speisekarte",
    },
};

export default function SpeisekartePage() {
    return (
        <>
            <div>
                {/* Hero Section */}
                <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                    <HeroImage slug="speisekarteHero" />
                    <HeroText title="Speisekarte" titleEn="Menu" />
                </div>
                <Speisekarte />
            </div>
        </>
    )
}
