"use client";

import { useLanguage } from "../contexts/language-context";

export default function Lunch() {
    const { language } = useLanguage();
    return (
        <>
        <div className="bg-black text-white py-16 min-h-screen">
            <div className="max-w-[900px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-2 font-bold">LUNCH</h1>
                <div className="text-center text-gray-300 text-lg mb-8">
                    {language === "de" ? "GÄNGE MENU" : "COURSE MENU"}
                    <br />
                    <span className="text-gray-500 text-sm">{language === "de" ? "COURSE MENU" : "COURSE MENU"}</span>
                </div>
                {/* Menu Courses */}
                <div className="text-center mb-10">
                    <div className="mb-8">
                        <div className="font-medium text-lg mb-1">1.</div>
                        <div className="font-medium">{language === "de" ? "Chicorée" : "Chicory"}</div>
                        <div className="my-2">{language === "de" ? "Radicchio | Kerbel | Haselnuss | Sesam-Hollandaise" : "Radicchio | Chervil | Hazelnut | Sesam-Hollandaise"}</div>
                    </div>
                    <div className="mb-8">
                        <div className="font-medium text-lg mb-1">2.</div>
                        <div className="font-medium">{language === "de" ? "Onsen-Ei" : "Onsen Egg"}</div>
                        <div className="my-2">{language === "de" ? "Spitzkohl | Paprika | Koriander" : "pointed white cabbage | peppers | coriander"}</div>
                    </div>
                    <div className="flex flex-col items-center mb-8 max-w-[500px] mx-auto">
                        <div className="font-medium text-lg mb-1">3</div>
                        <div className="flex w-full justify-center items-center gap-0">
                            <div className="flex-1 min-w-[180px] text-right pr-5">
                                <div className="font-medium">{language === "de" ? "Onglet" : "Onglet"}</div>
                                <div className="font-medium">{language === "de" ? "Sellerie Creme | Kürbis | Jus" : "celery cream | pumpkin | jus"}</div>
                            </div>
                            <div className="w-0.5 h-[60px] bg-gray-500 rounded-sm" />
                            <div className="flex-1 min-w-[180px] text-left pl-5">
                                <div className="font-medium">{language === "de" ? "Kräuterwickerl (vegetarisch)" : "cabbage rolls (vegetarian)"}</div>
                                <div className="font-medium">{language === "de" ? "Sellerie Creme | Topinambur | Röstzwiebeln | Beurre Blanc" : "celery cream | jerusalem artichoke | roasted onions | beurre blanc"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="font-medium text-lg mb-1">4</div>
                        <div>{language === "de" ? "Birne" : "Pear"}</div>
                        <div className="my-2">{language === "de" ? "Joghurt | Zitrus | Honig | Crumble" : "yogurt | citrus | honey | crumble"}</div>
                    </div>
                </div>
                {/* Course Prices */}
                <div className="bg-zinc-800 text-white border-2 border-gray-500 rounded-md text-center py-6 max-w-[400px] mx-auto text-lg font-medium">
                    {language === "de" ? "4 Gänge / courses | 60" : "4 courses | 60"}
                    <br />
                    {language === "de" ? "3 Gänge / courses (1,2,4) | 55" : "3 courses (1,2,4) | 55"}
                    <br />
                    {language === "de" ? "2 Gänge / courses (1,4) | 39" : "2 courses (1,4) | 39"}
                </div>
            </div>
        </div>
        </>
    )
}
