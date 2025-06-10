"use client"

import Image from 'next/image'
import Link from 'next/link'

export default function Introduction() {
    return (
        <div className="relative bg-black text-white min-h-screen overflow-hidden flex items-center justify-center">
            <div className="relative z-10 flex flex-col md:flex-row items-stretch w-full max-w-[1600px] h-[80vh] md:h-[80vh] mx-auto">
                {/* Left: Text */}
                <div className="flex-1 flex flex-col justify-center max-w-xl pl-8 md:pl-24 pr-0 md:pr-16">
                    <h1 className="text-5xl lg:text-6xl font-light tracking-wide mb-8">WILLKOMMEN IM<br />SANJI&apos;S</h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-md">
                    Entdecken Sie die perfekte Fusion aus Qualität, Geschmack und südostasiatischem Ambiente bei Sanjis. Wir laden Sie ein, sich zurückzulehnen, zu entspannen und das Beste zu genießen, was die Welt der kulinarischen Köstlichkeiten zu bieten hat.
                    </p>
                    <button className="border border-gray-400 px-8 py-3 text-gray-200 hover:bg-gray-800 transition rounded mt-2 w-max tracking-widest"><Link href="/about">Lerne uns kennen</Link></button>
                </div>
                {/* Right: Image */}
                <div className="flex-1 relative flex items-center justify-end min-h-[500px] md:pl-16 pr-8 md:pr-0 md:pr-16">
                    <div className="w-[600px] h-[500px] md:w-[700px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                        <Image src="/LandingPageImage1.jpg" alt="Restaurant Interior" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}