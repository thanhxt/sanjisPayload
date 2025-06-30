import { useLanguage } from "../contexts/language-context";

export default function Steaks() {
    const { language } = useLanguage();

    return (
        <div id="steaks" className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[1200px] text-lg mx-auto px-4">
                    {/* Top Row */}
                    <div className="flex flex-col md:flex-row justify-between mb-10">
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Hanging Tender -</div>
                            <div>{language === "de" ? "saftig, zart, aromatisch" : "juicy, tender, aromatic"}<br />
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Prime Beef GOP USA</div>
                            <div>250g | 48<br />400g | 75</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Filet -</div>
                            <div>{language === "de" ? "zart, mager" : "tender, lean"}<br />
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, {language === "de" ? "Australien" : "Australia"}</div>
                            <div>180g | 42<br />250g | 64</div>
                        </div>
                    </div>
                    {/* Middle Row */}
                    <div className="flex flex-col md:flex-row justify-between mb-10">
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Flanksteak -</div>
                            <div>{language === "de" ? "mager, langfaserig &amp; mussig" : "lean, long-fibrous &amp; rustic"}<br />
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, {language === "de" ? "Australien" : "Australia"}</div> 
                            <div>250g | 44<br />400g | 69</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Entrecôte / Rib-Eye -</div>
                            <div>{language === "de" ? "saftig, marmoriert mit Fettauge" : "juicy, marbled, fat eye"}<br />
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, {language === "de" ? "Australien" : "Australia"}</div>
                            <div>300g | 58<br />500g | 82</div>
                        </div>
                    </div>
                    {/* Center SANJI&apos;S CHOICE */}
                    <div className="border-2 border-gray-600 p-8 my-10 text-center bg-zinc-800">
                        <div className="font-bold text-3xl mb-3">SANJI&apos;S CHOICE</div>
                        <div className="font-bold text-xl mb-2">Wagyu A5</div>
                        <div className="text-base mb-2">{language === "de" ? "Zarte und saftige Wagyu Cuts in höchster Qualität aus der<br />Provinz Miyazaki in Japan" : "Tender and juicy Wagyu cuts of the highest quality from the<br />Miyazaki province in Japan"}</div>
                        <div className="flex justify-center gap-10 text-base font-medium">
                            <span>Entrecôte 45 | p. 100G</span>
                            <span>Filet 60€ | p. 100G</span>
                        </div>
                    </div>
                    {/* SHARING STEAKS */}
                    <div className="text-center my-10">
                        <div className="font-bold text-lg mb-2">SHARING STEAKS</div>
                        <div className="text-[0.95em] mb-1">{language === "de" ? "(Ca. 45 - 60min Zubereitungszeit)" : "(Approx. 45 - 60min preparation time)"}<br />
                        </div>
                        <div className="text-[0.95em] mb-2">Am Tisch flambiert &amp; tranchiert.<br />
                        </div>
                    </div>
                    {/* Bottom Row */}
                    <div className="flex flex-col md:flex-row justify-between mb-10">
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Porterhouse -</div>
                            <div> {language === "de" ? 
                                <>
                                    Kombination aus Filetsteak<br />
                                    Striploin, getrennt durch ein T-förmigen Knochen
                                </> : 
                                <>
                                    combination of tenderloin<br />
                                    striploin, separated by a T-shaped bone
                                </>
                            }<br />
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>ca. 1000g | 179</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Chateaubriand -</div>
                            <div>{language === "de" ? 
                                <>
                                    Mittelstück vom Filet<br />
                                    besonders zart &amp; saftig
                                </> : 
                                <>
                                    center piece of filet<br />
                                    particularly tender &amp; juicy
                                </>
                            }<br />
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>500g | 129<br />750g | 189</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Tomahawk -</div>
                            <div>{language === "de" ? 
                                <>
                                    Rib-Eye am Knochen
                                </> : 
                                <>
                                    rib-eye on the bone
                                </>
                            }<br />
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>900g - 1400g | 15 pro 100G</div>
                        </div>
                    </div>
                    {/* Upgrade Note */}
                    <div className="text-center text-base mt-6">
                        Upgrade! Surf &amp; Turf + Black Tiger Prawns 17,9
                    </div>
            </div>
        </div>
    )
}
