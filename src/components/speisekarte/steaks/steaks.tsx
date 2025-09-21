import Image from "next/image";
import HeroText from "../../hero-text";
import SteaksClient from "./steaksClient";
import getSteaksDish from "../getData/get-steaksdish";

export const revalidate = 60;

export default async function Steaks() {
    const steaks = await getSteaksDish();

    return (
        <div className="bg-black text-white">
            <div>
                {/* Hero Section */}
                <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                    <Image
                        src="/Sanjis_Julio-14.jpg"
                        alt="Background"
                        width={1920}
                        height={1080}
                        quality={75}
                        priority
                        className="absolute w-full h-full object-cover blur-md brightness-30 z-10"
                    />
                    <HeroText title="Steaks" titleEn="Steaks" />
                </div>
            </div>
            <SteaksClient menuItems={steaks} />
        </div>
    );
}
