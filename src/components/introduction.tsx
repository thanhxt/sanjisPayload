"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from './contexts/language-context'

export default function Introduction() {
    const { language } = useLanguage();
    return (
        <div className="relative bg-black text-white min-h-screen overflow-hidden flex items-center justify-center">
            <div className="relative z-10 flex flex-col md:flex-row items-stretch w-full max-w-[1600px] h-[80vh] md:h-[80vh] mx-auto">
                {/* Left: Text */}
                <div className="flex-1 flex flex-col justify-center max-w-xl pl-6 pr-6 md:pl-24 md:pr-16">
                    <h1 className="text-5xl lg:text-6xl font-light tracking-wide mb-8">{language === "de" ? "WILLKOMMEN IM" : "WELCOME TO"} <br />SANJI&apos;S</h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-md">
                    {language === "de" ? "Entdecken Sie die perfekte Fusion aus Qualität, Geschmack und südostasiatischem Ambiente bei Sanjis. Wir laden Sie ein, sich zurückzulehnen, zu entspannen und das Beste zu genießen, was die Welt der kulinarischen Köstlichkeiten zu bieten hat." : "Discover the perfect fusion of quality, taste, and Southeast Asian ambiance at Sanjis. We invite you to relax, unwind, and enjoy the best that the world of culinary delights has to offer."}
                    </p>
                    <button className="border border-gray-400 px-8 py-4 text-gray-200 hover:bg-gray-800 transition rounded mt-4 w-max tracking-widest min-h-[44px] min-w-[44px] text-lg">
                        <Link href="/about" className="block px-2 py-1">
                            {language === "de" ? "Lerne uns kennen" : "Learn about us"}
                        </Link>
                    </button>
                </div>
                {/* Right: Image */}
                <div className="flex-1 relative flex items-center justify-end min-h-0 h-auto md:pl-16 pr-6 md:pr-0 md:pr-16">
                    <div className="w-full h-[250px] sm:w-[400px] sm:h-[300px] md:w-[700px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                        <Image src="/LandingPageImage1.jpg" alt="Restaurant Interior" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}