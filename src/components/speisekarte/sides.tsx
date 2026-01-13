"use client"
import { useLanguage } from "../contexts/language-context";

export default function Sides() {
    const { language } = useLanguage();
    return (
        <div className="bg-black text-white py-16 min-h-screen">
            <div className="max-w-[1100px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-6 font-bold">SIDES</h1>
                <div className="flex gap-12 flex-wrap justify-between">
                    {/* Left Column */}
                    <div className="flex-1 min-w-[320px]">
                        <div className="mb-6">french fries 6,9</div>
                        <div className="mb-6">truffled french fries with parmesan 9,9</div>
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                Bratkartoffeln mit Schalotten 9,9
                            </> : 
                            <>
                                fried potatoes with shallots 9,9
                            </>
                            }
                        </div>
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                wildes Brokkoli mit Knoblauch, Zwiebeln und Sesam 9,9
                            </> : 
                            <>
                                wild broccoli with garlic, onions and sesame 9,9
                            </>
                            }
                        </div>
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                getrüffeltes Kartoffelpüree 9,9
                            </> : 
                            <>
                                truffled mashed potato 9,9
                            </>
                            }
                        </div>
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                Babyspinat Salat mit Zwiebeln &amp; Sesamdressing 8,9
                            </> : 
                            <>
                                baby spinach salad with onions &amp; sesame dressing 8,9
                            </>
                            }
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="flex-1 min-w-[320px]">
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                Beilagensalat klein / groß 6,9 / 8,9
                            </> : 
                            <>
                                side salad small / large 6,9 / 8,9
                            </>
                            }
                        </div>
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                Jasmin Reis 3
                            </> : 
                            <>
                                Jasmine rice 3
                            </>
                            }
                        </div>
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                hausgemachter Kimchi 5
                            </> : 
                            <>
                                homemade kimchi 5
                            </>
                            }
                        </div>
                        <div className="mb-6">
                            {language === "de" ? 
                            <>
                                Bio Sauerteigbrot von Julius Brantner Brothandwerk 4,5
                            </> : 
                            <>
                                organic sourdough bread from Julius Brantner Brothandwerk 4,5
                            </>
                            }</div>
                        {/* Sauces Box */}
                        <div className="bg-zinc-800 text-white border-2 border-gray-600 rounded-lg mt-10 p-8 max-w-[350px]">
                            <div className="font-bold text-xl mb-4">Homemade Sauces</div>
                            <div className="flex justify-between mb-2"><span>ssamjang</span><span>2</span></div>
                            <div className="flex justify-between mb-2"><span>Sanji&apos;s chimichurri</span><span>4</span></div>
                            <div className="flex justify-between mb-2"><span>truffle mayo</span><span>5</span></div>
                            <div className="flex justify-between mb-2"><span>wasabi mayo</span><span>3</span></div>
                            <div className="flex justify-between mb-2"><span>chilli mayo</span><span>3</span></div>
                            <div className="flex justify-between"><span>sesame</span><span>3</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
