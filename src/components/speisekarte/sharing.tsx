"use client"
import { useLanguage } from "../contexts/language-context";

export default function Sharing() {
    const { language } = useLanguage();
    return (
        <div className="bg-black text-white py-16 min-h-screen">
            <div className="max-w-[900px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-6 font-bold">SHARING</h1>
                <div className="text-center mb-4 text-lg">
                    {language === "de" ? 
                        <>
                            Ab 3 Personen<br />
                        </> : 
                        <>
                            Starts at 3 persons<br />
                        </>
                    }
                </div>
                <div className="text-center mb-8 text-lg">
                    {language === "de" ? 
                        <>
                            Am Tisch flambiert &amp; tranchiert<br />
                        </> : 
                        <>
                            Flambéed &amp; carved at the table<br />
                        </>
                    }
                </div>
                {/* Juicy Menu */}
                <div className="bg-zinc-800 text-white border-2 border-gray-500 rounded-md mb-8 py-8 text-center">
                    <div className="text-3xl font-bold mb-2">JUICY MENU</div>
                    <div className="text-xl font-medium mb-4">p.p. 250G / 46</div>
                    <div className="text-lg text-white">
                        Hanging Tender<br />
                        Entrecôte<br />
                        Flanksteak
                    </div>
                </div>
                {/* Tender Menu */}
                <div className="bg-zinc-800 text-white border-2 border-gray-500 rounded-md mb-8 py-8 text-center">
                    <div className="text-3xl font-bold mb-2">TENDER MENU</div>
                    <div className="text-xl font-medium mb-4">p.p. 200G / 47</div>
                    <div className="text-lg text-white">
                        Filet<br />
                        Hanging Tender
                    </div>
                </div>
                {/* rum & flames section */}
                <div className="text-center mt-10">
                    <div className="font-bold text-xl mb-3">rum &amp; flames</div>
                    <div className="text-base mb-4 text-white">
                        {language === "de" ? 
                            <>
                                &quot;rum &amp; flames&quot; bietet ein außergewöhnliches Steak-Erlebnis, bei denen die Steak-Cuts auf einem Holzbrett serviert werden und eine besondere Zubereitung erfahren. Zuerst wird das Steak mit overproof rum übergossen und dann flambiert. Dabei karamellisiert der Zucker im Rum und hinterlässt einen intensiven, aromatischen Geschmack und eine knusprige Kruste. Im nächsten Schritt werden die Steak-Cuts mit Rosmarin und Thymian bedeckt und flambiert bis es von einem rauchigen Aroma durchzogen wird. Der Duft allein ist bereits ein wahres Geschmackserlebnis.
                            </> : 
                            <>
                                &quot;rum &amp; flames&quot; offers an exceptional steak experience, where the steak cuts are served on a wooden board and prepared in a special way. First, the steak is doused with overproof rum and then flambéed. As the rum caramelizes, it creates an intense, aromatic flavor and a crispy crust. In the next step, the steak cuts are covered with rosemary and thyme, then flambéed again until infused with a smoky aroma. The scent alone is already a true taste experience.
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

