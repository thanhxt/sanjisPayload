"use client"
import Image from "next/image";
import { useLanguage } from "../../contexts/language-context";
import { SteaksDish } from "@/type/steaksDishType";
import { SteaksDishChoice } from "@/type/steaksDishChoiceType";
import { SteaksDishSharing } from "@/type/steaksDishSharingType";
import Sharing from "../sharing";
import Sides from "../sides";

export default function SteaksClient({ steaksItems, steakChoiceItems, steakSharingItems }: { 
    steaksItems: SteaksDish[], 
    steakChoiceItems: SteaksDishChoice[], 
    steakSharingItems: SteaksDishSharing[] }) {
        const { language } = useLanguage();
    return (
        <div id="steaks" className="bg-black text-white py-16 min-h-screen">
            <div className="max-w-[1200px] text-lg mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center mb-10">
                    {/* Image on the left */}
                    <div className="order-1 md:order-1 flex-shrink-0">
                        <Image 
                            src="/STEAKCUTS.svg" 
                            alt="Main Dish" 
                            width={170} 
                            height={120}
                            className="mb-6 md:mb-0 hidden md:block"
                        />
                    </div>
                    
                    {/* STEAKS CUTS */}
                    {/* Flex layout on the right */}
                    <div className="order-2 md:order-2 flex-1 w-full">
                        <div className="flex flex-wrap justify-center gap-4">
                            {steaksItems.map((item: SteaksDish, idx: number) => (
                                <div key={idx} className="w-full md:w-[calc(33.333%-0.5rem)] text-center border-t-2 border-b-2 border-gray-600 mx-2 py-6">
                                    <div className="font-bold">- {item.titleDE} -</div>
                                    <div>{language === "de" ? item.descriptionDE : item.descriptionEN}<br />
                                    </div>
                                    <div className="text-[0.95em] my-2">{language === "de" ? item.regionDE : item.regionEN}</div>
                                    <div>{item.weightSmall}g | {item.priceSmall}<br />{item.weightLarge}g | {item.priceLarge}</div>
                                </div>
                            ))}
                        </div>
                        { /* SANJI'S CHOICE */ }
                        <div className="flex flex-wrap justify-center gap-4">
                            {steakChoiceItems.map((item: SteaksDishChoice, idx: number) => (
                            <div key={idx} className="border-2 border-gray-600 p-8 my-10 text-center bg-zinc-800">
                                <div className="font-bold text-3xl mb-3">{item.titleDE}</div>
                                <div className="font-bold text-xl mb-2">{item.steaktitle}</div>
                                <div className="text-base mb-2">{language === "de" ? item.descriptionDE : item.descriptionEN}</div>
                                <div className="flex justify-center gap-10 text-xl text-base font-bold">
                                    <span>{item.stake1} {item.price1}€ | p. {item.stakeWeight1}g</span>
                                    <span>{item.stake2} {item.price2}€ | p. {item.stakeWeight2}g</span>
                                </div>
                            </div>
                            ))}
                        </div>
                        { /* SHARING STEAKS */ }
                        <div className="text-center my-10">
                            <div className="font-bold text-lg mb-2">SHARING STEAKS</div>
                            <div className="text-[0.95em] mb-1">{language === "de" ? "(Ca. 45 - 60min Zubereitungszeit)" : "(Approx. 45 - 60min preparation time)"}<br />
                            </div>
                            <div className="text-[0.95em] mb-2">Am Tisch flambiert &amp; tranchiert.<br />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                            {/* Tomahawk */}
                            <div className="text-center border-t-2 border-b-2 border-gray-600 mx-2 py-6">
                                <div className="font-bold">- {steakSharingItems[2]?.titleDE} -</div>
                                <div>
                                    {language === "de" ? steakSharingItems[2]?.descriptionDE : steakSharingItems[2]?.descriptionEN}
                                    <br />
                                </div>
                                <div className="text-[0.95em] my-2">
                                    {language === "de" ? steakSharingItems[2]?.regionDE : steakSharingItems[2]?.regionEN}
                                </div>
                                <div>
                                    {steakSharingItems[2]?.weightSmall}g | {steakSharingItems[2]?.priceSmall}
                                </div>
                            </div>
                            {/* Chateaubriand */}
                            <div className="text-center border-t-2 border-b-2 border-gray-600 mx-2 py-6">
                                <div className="font-bold">- {steakSharingItems[1]?.titleDE} -</div>
                                <div>
                                    {language === "de" ? steakSharingItems[1]?.descriptionDE : steakSharingItems[1]?.descriptionEN}
                                    <br />
                                </div>
                                <div className="text-[0.95em] my-2">
                                    {language === "de" ? steakSharingItems[1]?.regionDE : steakSharingItems[1]?.regionEN}
                                </div>
                                <div>
                                    {steakSharingItems[1]?.weightSmall}g | {steakSharingItems[1]?.priceSmall}
                                    <br />
                                    {steakSharingItems[1]?.weightLarge}g | {steakSharingItems[1]?.priceLarge}
                                </div>
                            </div>
                            {/* Porterhouse */}
                            <div className="text-center border-t-2 border-b-2 border-gray-600 mx-2 py-6">
                                <div className="font-bold">- {steakSharingItems[0]?.titleDE} -</div>
                                <div>
                                    {language === "de" ? steakSharingItems[0]?.descriptionDE : steakSharingItems[0]?.descriptionEN}
                                    <br />
                                </div>
                                <div className="text-[0.95em] my-2">
                                    {language === "de" ? steakSharingItems[0]?.regionDE : steakSharingItems[0]?.regionEN}
                                </div>
                                <div>
                                    {steakSharingItems[0]?.weightSmall}g - {steakSharingItems[0]?.weightLarge}g | {steakSharingItems[0]?.priceSmall} pro 100g
                                </div>
                            </div>
                        </div>
                        {/* Upgrade Note */}
                        <div className="text-center text-2xl font-bold mt-6">
                            Upgrade! Surf &amp; Turf + Black Tiger Prawns 17,9
                        </div>
                    </div>
                </div>
                <div>
                    <Sharing />
                    <Sides />       
                </div>
            </div>
        </div>
    )
}