"use client"

import * as React from 'react';
import Image from 'next/image';
import { useLanguage } from './contexts/language-context';
import { useCookieConsent, showConsentPreferences } from '@/hooks/useCookieConsent';
import { Button } from './ui/button';

export default function Reservations() {
    const { language } = useLanguage();
    const hasConsent = useCookieConsent('functionality');

    React.useEffect(() => {
        if (!hasConsent) return;

        const scriptDE = document.createElement('script');
        scriptDE.src = "//www.opentable.de/widget/reservation/loader?rid=347604&type=standard&theme=wide&color=2&dark=false&iframe=true&domain=de&lang=de-DE&newtab=false&ot_source=Restaurant%20website&cfe=true";
        scriptDE.async = true;

        const scriptEN = document.createElement('script');
        scriptEN.src = "//www.opentable.de/widget/reservation/loader?rid=347604&type=standard&theme=wide&color=2&dark=false&iframe=true&domain=de&lang=en-US&newtab=false&ot_source=Restaurant%20website&cfe=true";
        scriptEN.async = true;


        const widgetContainer = document.getElementById('ot-res-widget');
        if (widgetContainer) {
            widgetContainer.innerHTML = '';
            if (language === "de") {
                widgetContainer.appendChild(scriptDE);
            } else {
                widgetContainer.appendChild(scriptEN);
            }
        }
    }, [language, hasConsent]);

    return (
        <div className="relative bg-[#020002] text-white py-16 min-h-screen flex items-center justify-center overflow-hidden">
            {/* Blurred Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Sanjis_Julio-34.jpg"
                    alt="Background"
                    width={1920}
                    height={1080}
                    quality={75}
                    priority
                    className="object-cover blur-sm opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
            </div>
            {/* Content */}
            <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="max-w-xl w-full text-center mb-10">
                    <h1 className="text-5xl lg:text-6xl font-light tracking-wide mb-8">{language === "de" ? "Reservierung" : "Reservation"}</h1>
                    <p className="text-lg md:text-xl mb-6 text-gray-200 font-light drop-shadow">
                        {language === "de" ? "Reservieren Sie jetzt und genießen Sie kulinarische Exzellenz." : "Reserve now and enjoy culinary excellence."}
                    </p>
                </div>
                <div className="w-full max-w-4xl flex justify-center">
                    {hasConsent ? (
                        <div id="ot-res-widget"></div>
                    ) : (
                        <div className="text-center p-8 bg-black/50 rounded-lg backdrop-blur-sm">
                            <p className="mb-4 text-gray-300">
                                {language === "de"
                                    ? "Um eine Reservierung vorzunehmen, stimmen Sie bitte den funktionalen Cookies zu."
                                    : "To make a reservation, please accept functional cookies."}
                            </p>
                            <Button onClick={showConsentPreferences} variant="outline" className="text-black border-white hover:bg-white/20">
                                {language === "de" ? "Cookie-Einstellungen öffnen" : "Open Cookie Settings"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}