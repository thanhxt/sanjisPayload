"use client"

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function Introduction() {
    const [parallax, setParallax] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef(0);
    const animationFrame = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !imageContainerRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Progress from 0 (top of viewport) to 1 (bottom of viewport)
            const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height)));
            // Dynamically calculate the max slide distance (main image height - overlapping image height)
            const mainImageHeight = imageContainerRef.current.offsetHeight;
            const overlapImageHeight = 256; // w-64/h-64 = 256px
            const maxSlide = mainImageHeight - overlapImageHeight;
            const target = progress * maxSlide;
            parallaxRef.current = target;
            if (animationFrame.current === null) {
                animate();
            }
        };
        const animate = () => {
            setParallax(prev => {
                const diff = parallaxRef.current - prev;
                if (Math.abs(diff) < 0.5) {
                    animationFrame.current = null;
                    return parallaxRef.current;
                }
                animationFrame.current = requestAnimationFrame(animate);
                return prev + diff * 0.08; // Smooth interpolation
            });
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    return (
        <div ref={sectionRef} className="relative bg-black text-white min-h-screen overflow-hidden flex items-center justify-center">
            <div className="relative z-10 flex flex-col md:flex-row items-stretch w-full max-w-[1600px] h-[80vh] md:h-[80vh] mx-auto">
                {/* Left: Text */}
                <div className="flex-1 flex flex-col justify-center max-w-xl pl-8 md:pl-24 pr-0 md:pr-16">
                    <h1 className="text-5xl lg:text-6xl font-light tracking-wide mb-8">WILLKOMMEN IM<br />SANJI&apos;S</h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-md">
                    Entdecken Sie die perfekte Fusion aus Qualität, Geschmack und südostasiatischem Ambiente bei Sanjis. Wir laden Sie ein, sich zurückzulehnen, zu entspannen und das Beste zu genießen, was die Welt der kulinarischen Köstlichkeiten zu bieten hat.
                    </p>
                    <button className="border border-gray-400 px-8 py-3 text-gray-200 hover:bg-gray-800 transition rounded mt-2 w-max tracking-widest"><Link href="/about">Lerne uns kennen</Link></button>
                </div>
                {/* Right: Images */}
                <div className="flex-1 relative flex items-center justify-center min-h-[500px] md:pl-16 overflow-visible">
                    {/* Main Restaurant Image */}
                    <div ref={imageContainerRef} className="w-[600px] h-[500px] md:w-[700px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative z-10 -mr-32 md:-mr-40">
                        <Image src="/LandingPageImage1.jpg" alt="Restaurant Interior" fill className="object-cover" />
                    </div>
                    {/* Overlapping Food Image - parallax from top to bottom */}
                    <div
                        className="absolute left-24 md:left-12"
                        style={{ top: 0, transform: `translateY(${parallax}px)`, transition: 'box-shadow 0.2s' }}
                    >
                        <div className="w-64 h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-[#181b1b] z-20">
                            <Image src="/LandingPageImage2.jpg" alt="Food Dish" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}