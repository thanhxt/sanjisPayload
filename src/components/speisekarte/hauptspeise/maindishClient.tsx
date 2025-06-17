"use client"
import Image from "next/image";
import { useLanguage } from "../../contexts/language-context";
import { MainDish } from "@/type/mainDishType";

export default function MainDishClient({ menuItems }: { menuItems: MainDish[] }) {
    const { language } = useLanguage();

    return (
        <div className="bg-black text-white py-16 min-h-screen">
                <div className="flex flex-col md:flex-row bg-black text-white p-4 md:p-10 items-center justify-center">
                    <Image 
                    src="/HauptspeiseSchrift.png" 
                    alt="Main Dish" 
                    width={170} 
                    height={120}
                    className="mb-6 md:mb-0 hidden md:block"
                    />

                    <div className="flex flex-col md:ml-10 w-full md:w-auto px-4 md:px-0">
                        {menuItems.map((item: MainDish, idx: number) => (
                            <div key={idx} className="mb-6">
                                <div className="flex flex-row items-center">
                                    <span className="text-xl md:text-2xl font-medium">{item.titleDE}</span>
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
    )
}