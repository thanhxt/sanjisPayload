import Image from "next/image";

export default function Steaks() {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                <Image
                    src="/Sanjis_Julio-18.jpg"
                    alt="Background"
                    width={1000}
                    height={1000}
                    className="absolute w-full h-full object-cover blur-lg brightness-50 z-10"
                />
                <h1 className="relative text-white z-20 text-4xl text-center">
                    STEAKS
                </h1>
            </div>
            {/* STEAKS Section Wireframe */}
            <div id="steaks" className="bg-zinc-900 text-white py-16 min-h-screen">
                <div className="max-w-[1200px] text-lg mx-auto px-4">
                    {/* Top Row */}
                    <div className="flex justify-between mb-10">
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Hanging Tender -</div>
                            <div>saftig, zart &amp; aromatisch<br />
                                <div className="text-[0.95em] text-gray-500">
                                    juicy, tender &amp; aromatic
                                </div>
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Prime Beef GOP USA</div>
                            <div>250g | 48<br />400g | 75</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Filet -</div>
                            <div>zart &amp; mager<br />
                                <div className="text-[0.95em] text-gray-500">
                                    tender &amp; lean
                                </div>
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>180g | 42<br />250g | 64</div>
                        </div>
                    </div>
                    {/* Middle Row */}
                    <div className="flex justify-between mb-10">
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Flanksteak</div>
                            <div>mager, langfaserig &amp; mussig<br />
                                <div className="text-[0.95em] text-gray-500">
                                    lean, long-fibrous &amp; rustic
                                </div>
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>250g | 44<br />400g | 69</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Entrecôte / Rib-Eye -</div>
                            <div>saftig, marmoriert mit Fettauge<br />
                                <div className="text-[0.95em] text-gray-500">
                                    juicy, marbled, fat eye
                                </div>
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>300g | 58<br />500g | 82</div>
                        </div>
                    </div>
                    {/* Center SANJI&apos;S CHOICE */}
                    <div className="border-2 border-gray-600 p-8 my-10 text-center bg-zinc-800">
                        <div className="font-bold text-3xl mb-3">SANJI&apos;S CHOICE</div>
                        <div className="font-bold text-xl mb-2">Wagyu A5</div>
                        <div className="text-base mb-2">Zarte und saftige Wagyu Cuts in höchster Qualität aus der<br />Provinz Miyazaki in Japan</div>
                        <div className="text-base mb-4 text-gray-500">Tender and juicy Wagyu cuts of the highest quality from the<br />Miyazaki province in Japan</div>
                        <div className="flex justify-center gap-10 text-base font-medium">
                            <span>Entrecôte 45 | p. 100G</span>
                            <span>Filet 60€ | p. 100G</span>
                        </div>
                    </div>
                    {/* SHARING STEAKS */}
                    <div className="text-center my-10">
                        <div className="font-bold text-lg mb-2">SHARING STEAKS</div>
                        <div className="text-[0.95em] mb-1">(Ca. 45–60min Zubereitungszeit)<br />
                            <div className="text-[0.95em] text-gray-500">
                                Approx. 45–60min preparation time
                            </div>
                        </div>
                        <div className="text-[0.95em] mb-2">Am Tisch flambiert &amp; tranchiert.<br />
                            <div className="text-[0.95em] text-gray-500">
                                Flambéed &amp; carved at the table.
                            </div>
                        </div>
                    </div>
                    {/* Bottom Row */}
                    <div className="flex justify-between mb-10">
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Porterhouse -</div>
                            <div>Kombination aus Filetsteak &amp;<br />Striploin, getrennt durch ein T-förmigen Knochen<br />
                                <div className="text-[0.95em] text-gray-500">
                                    combination of tenderloin &amp; striploin, separated by a T-shaped bone
                                </div>
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>ca. 1000g | 179</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Chateaubriand -</div>
                            <div>Mittelstück vom Filet<br /> besonders zart &amp; saftig<br />
                                <div className="text-[0.95em] text-gray-500">
                                    center piece of filet<br />particularly tender &amp; juicy
                                </div>
                            </div>
                            <div className="text-[0.95em] my-2">Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>500g | 129<br />750g | 189</div>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-b-2 border-gray-600 mx-4 py-6">
                            <div className="font-bold">- Tomahawk -</div>
                            <div>Rib-Eye am Knochen<br />
                                <span className="text-[0.95em] text-gray-500">
                                    rib-eye on the bone
                                </span>
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
        </div>
    )
}
