"use client"
import Image from "next/image";
import { useLanguage } from "../../contexts/language-context";
import { MenuAppetizerDish } from "@/type/appetizerDishType";

export default function AppetizerClient({ menuItems }: { menuItems: MenuAppetizerDish[] }) {
    const { language } = useLanguage();
        
    const starterSharing = [
        { title: "spicy salmon tatare" },
        { title: "flamed yellowfin tuna tataki" },
        { title: "wagyu beef la lot" },
        { title: "green mango duck salad" },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row bg-black text-white p-4 md:p-10 items-center justify-center">
                <Image 
                src="/vorspeiseSchrift.png" 
                alt="Appetizer" 
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
                                <p className="text-gray-400 mt-1 text-sm md:text-base">{language === "de" ? item.descriptionDE : item.descriptionEN}</p>
                            </div>
                        </div>
                    ))}
                    <span className="text-xl md:text-2xl font-medium mb-6">Plediade Poget No 3 Oyster 3p./18 6p. 3</span>
                </div>
            </div>

             {/* Starter Sharing Section */}
             <div className="flex flex-col md:flex-row bg-black text-white p-4 md:p-10 items-center justify-center gap-6 md:gap-30">
                <Image 
                src="/Sanjis_Julio-27.jpg" 
                alt="Appetizer" 
                width={150} 
                height={150}
                className="rounded-full mb-6 md:mb-0"
                />
                <div className=" text-white border-2 border-black rounded-md mt-4 md:mt-10 p-6 md:p-8 w-full md:max-w-[350px]">
                    <div className="font-bold text-2xl md:text-3xl mb-4">
                        STARTER SHARING <br /> 
                        <span className="text-base md:text-lg text-gray-500">
                            {language === "de" ? "ab 2 Personen - 25 p.p." : "starts at 2 persons - 25 p.p."}
                        </span>
                    </div>
                    {/* Starter Sharing */}
                    <div className="flex flex-col">
                    {starterSharing.map((item, idx) => (
                        <div key={idx} className="mb-2">
                            <div className="flex flex-row">
                                <span className="text-base md:text-lg font-semibold">{item.title}</span>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}