import Image from "next/image";
import HeroText from "../../hero-text";
import MainDishClient from "./maindishClient";
import getMainDish from "../getData/get-maindish";

export default async function MainDish() {
    const mainDish = await getMainDish();

    return (
        <div className="bg-black text-white">
            <div>
                {/* Hero Section */}
                <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                    <Image
                        src="/Sanjis_Julio-14.jpg"
                        alt="Background"
                        width={1000}
                        height={1000}
                        className="absolute w-full h-full object-cover blur-md brightness-30 z-10"
                    />
                    <HeroText title="Hauptspeise" titleEn="Main Dish" />
                </div>
            </div>
            <MainDishClient menuItems={mainDish} />
        </div>
    );
}
