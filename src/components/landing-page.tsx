'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Main Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/LandingPageVideo2.MOV" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Border Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-48 h-48 mb-8">
                    <Image 
                        src="/sanjislogo.svg" 
                        alt="Sanji's Kitchen Logo" 
                        width={192}
                        height={192}
                        priority
                        className="w-full h-full invert" 
                    />
                </div>
                <ChevronDown 
                className="w-12 h-12 text-white animate-bounce cursor-pointer" 
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }} />
            </div>
        </div>
    );
}