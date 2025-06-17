"use client"
import Image from "next/image";
import HeroText from "../hero-text";
import { useLanguage } from "../contexts/language-context";

export default function MainDish() {
    const menuItems = [
        {
            title: "surf & turf",
            price: "39.9",
            descriptionDE: "100g Black Angus Roastbeef | Black Tiger Prawns | Saisongemüse | Jasminreis",
            descriptionEN: "100g black angus striploin | black tiger prawns | seasonal vegetables | jasmine rice"
        },
        {
            title: "lamb chops",
            price: "44.9",
            descriptionDE: "Lammkottlets (Neuseeland) | Wilder Brokkoli | getrüffeltes Kartoffelpüree",
            descriptionEN: "lamb chops (New Zealand) | wild broccoli | truffled mashed potatoes"
        },
        {
            title: "french duck red sin",
            price: "34.9",
            descriptionDE: "medium gegrillte Barbarieentenbrust | Saisongemüse | Rotwein-Hoisin Soße | Jasminreis",
            descriptionEN: "medium grilled barbary duck breast | seasonal vegetables | red wine hoisin sauce | jasmine rice"
        },
        {
            title: "salmon teriyaki",
            price: "31.9",
            descriptionDE: "Lachs | Saisongemüse | Teriyakisoße | Jasminreis",
            descriptionEN: "salmon | seasonal vegetables | teriyaki sauce | jasmine rice"
        },
        {
            title: "crispy angus tamarind",
            price: "38.9",
            descriptionDE: "panierte Black Angus Filetstreifen | grüner Spargel | Zuckerschoten | Zwiebeln | Tamarindensoße | Jasminreis",
            descriptionEN: "crispy black angus filet strips | green asparagus | sugar snap peas | onions | tamarind sauce | jasmine rice"
        },
        {
            title: "tiger prawns thai basil",
            price: "39.9",
            descriptionDE: "gegrillte Tiger Prawns | Saisongemüse | Thai-Basilikum | Jasminreis",
            descriptionEN: "grilled tiger prawns | seasonal vegetables | thai-basil | jasmine rice"
        },
        {
            title: "crispy tofu curry",
            price: "23.9",
            descriptionDE: "Tofu | Saisongemüse | rote Kokos-Curry Soße | Jasminreis",
            descriptionEN: "tofu | seasonal vegetables | red coconut-curry sauce | jasmine rice"
        }
    ]
    const { language } = useLanguage();
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
            <div className="bg-black text-white py-16 min-h-screen">
                <div className="flex flex-col md:flex-row bg-black text-white p-4 md:p-10 items-center justify-center">
                    <Image 
                    src="/hauptspeiseSchrift.png" 
                    alt="Main Dish" 
                    width={170} 
                    height={120}
                    className="mb-6 md:mb-0 hidden md:block"
                    />

                    <div className="flex flex-col md:ml-10 w-full md:w-auto px-4 md:px-0">
                        {menuItems.map((item, idx) => (
                            <div key={idx} className="mb-6">
                                <div className="flex flex-row items-center">
                                    <span className="text-xl md:text-2xl font-medium">{item.title}</span>
                                    <span className="text-base md:text-lg font-semibold ml-2">{item.price}</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-400 mt-1 text-sm md:text-base"> {language === "de" ? item.descriptionDE : item.descriptionEN}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
