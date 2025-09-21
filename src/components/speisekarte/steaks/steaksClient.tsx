"use client"
import Image from "next/image";
import { useLanguage } from "../../contexts/language-context";
import { SteaksDish } from "@/type/steaksdishType";

export default function SteaksClient({ menuItems }: { menuItems: SteaksDish[] }) {
    const { language } = useLanguage();
    console.log(menuItems);
    console.log("menuItems");

    return (
        <div id="steaks" className="bg-black text-white py-16 min-h-screen">
            <div className="max-w-[1200px] text-lg mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center mb-10">
                    {/* Image on the left */}
                    <div className="order-1 md:order-1 flex-shrink-0">
                        <Image 
                            src="/HauptspeiseSchrift.png" 
                            alt="Main Dish" 
                            width={170} 
                            height={120}
                            className="mb-6 md:mb-0"
                        />
                    </div>
                    
                    {/* Grid layout on the right */}
                    <div className="order-2 md:order-2 flex-1 w-full">
                        {/* Top Row */}
                        <div className="flex flex-col md:flex-row justify-between mb-10">
                            {menuItems.slice(0, 2).map((item: SteaksDish, idx: number) => (
                                <div key={idx} className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                                    <div className="font-bold">- {item.titleDE} -</div>
                                    <div>{language === "de" ? item.descriptionDE : item.descriptionEN}<br />
                                    </div>
                                    <div className="text-[0.95em] my-2">{language === "de" ? item.regionDE : item.regionEN}</div>
                                    <div>{item.weightSmall}g | {item.priceSmall}<br />{item.weightLarge}g | {item.priceLarge}</div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Middle Row */}
                        {menuItems.length > 2 && (
                            <div className="flex flex-col md:flex-row justify-between mb-10">
                                {menuItems.slice(2, 4).map((item: SteaksDish, idx: number) => (
                                    <div key={idx + 2} className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                                        <div className="font-bold">- {item.titleDE} -</div>
                                        <div>{language === "de" ? item.descriptionDE : item.descriptionEN}<br />
                                        </div>
                                        <div className="text-[0.95em] my-2">{language === "de" ? item.regionDE : item.regionEN}</div>
                                        <div>{item.weightSmall}g | {item.priceSmall}<br />{item.weightLarge}g | {item.priceLarge}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}