import HeroText from "../../hero-text";
import Image from "next/image";
import AppetizerClient from "./appetizerClient";
import getAppetizerDish from "../getData/get-appetizer";

export const revalidate = 60;

export default async function Appetizer() {
    const appetizerDish = await getAppetizerDish();
    return (
        <div className="bg-black text-white">
            {/* Hero Image */}
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden mb-0 bg-black z-0">
                <Image
                src="/Sanjis_Julio-27.jpg" 
                alt="Appetizer" 
                width={1000} 
                height={1000}
                className="absolute w-full h-full object-cover blur-md brightness-50 z-0"
                />
                <HeroText title="Vorspeisen" titleEn="Appetizers" />
            </div>

            {/* Menu */}
            <AppetizerClient menuItems={appetizerDish} />
        </div>
    );
}
