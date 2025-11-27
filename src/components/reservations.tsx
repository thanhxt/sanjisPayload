"use client"

import * as React from 'react';
import Image from 'next/image';
import { useLanguage } from './contexts/language-context';
import { useCookieConsent, showConsentPreferences } from '@/hooks/useCookieConsent';
import { Button } from './ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Reservations() {
    const { language } = useLanguage();
    const hasConsent = useCookieConsent('functionality');

    React.useEffect(() => {
        if (!hasConsent) return;

        const scriptDE = document.createElement('script');
        scriptDE.src = "//www.opentable.de/widget/reservation/loader?rid=347604&type=standard&theme=tall&color=1&dark=false&iframe=true&domain=de&lang=de-DE&newtab=false&ot_source=Restaurant%20website&cfe=true";
        scriptDE.async = true;

        const scriptEN = document.createElement('script');
        scriptEN.src = "//www.opentable.de/widget/reservation/loader?rid=347604&type=standard&theme=tall&color=1&dark=false&iframe=true&domain=de&lang=en-US&newtab=false&ot_source=Restaurant%20website&cfe=true";
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
        <div className="relative bg-[#020002] text-white py-12 min-h-[50vh] flex items-center justify-center overflow-hidden">
            {/* Blurred Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Sanjis_Julio-34.jpg"
                    alt="Background"
                    width={1920}
                    height={1080}
                    quality={75}
                    priority
                    className="object-cover blur-sm opacity-40 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
            </div>
            {/* Content */}
            <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-fit px-4">
                <div className="max-w-4xl w-full text-center mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl lg:text-5xl font-light tracking-widest mb-4 mt-20 drop-shadow-lg uppercase">
                        {language === "de" ? "Reservierung" : "Reservation"}
                    </h1>
                    <p className="text-base md:text-lg mb-4 text-gray-200 font-light tracking-wide drop-shadow-md max-w-xl mx-auto leading-relaxed">
                        {language === "de" ? "Reservieren Sie jetzt und genießen Sie kulinarische Exzellenz." : "Reserve now and enjoy culinary excellence."}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    {/* Reservation Widget */}
                    <div className="w-full flex justify-center">
                        {hasConsent ? (
                            <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                <div id="ot-res-widget" className="w-full flex justify-center"></div>
                            </div>
                        ) : (
                            <div className="text-center p-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl w-full transition-all duration-300 hover:bg-white/10 flex flex-col items-center justify-center h-full">
                                <p className="mb-8 text-gray-200 text-lg font-light leading-relaxed">
                                    {language === "de"
                                        ? "Um eine Reservierung vorzunehmen, stimmen Sie bitte den funktionalen Cookies zu."
                                        : "To make a reservation, please accept functional cookies."}
                                </p>
                                <Button
                                    onClick={showConsentPreferences}
                                    variant="outline"
                                    className="text-white border-white/30 bg-white/5 hover:bg-white/20 hover:border-white/50 transition-all duration-300 px-8 py-6 text-lg font-light tracking-wide rounded-full"
                                >
                                    {language === "de" ? "Cookie-Einstellungen öffnen" : "Open Cookie Settings"}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col justify-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                        <h2 className="text-2xl lg:text-3xl font-light mb-8 tracking-wide border-b border-white/10 pb-4">
                            {language === "de" ? "Besuchen Sie uns" : "Visit Us"}
                        </h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-yellow-400 mt-1 shrink-0" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-200 mb-1">{language === "de" ? "Adresse" : "Address"}</h3>
                                    <p className="text-gray-300 font-light">Kellerstraße 32<br />81667 München</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-yellow-400 mt-1 shrink-0" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-200 mb-1">{language === "de" ? "Telefon" : "Phone"}</h3>
                                    <a href="tel:+498937505678" className="text-gray-300 font-light hover:text-yellow-400 transition-colors">+49 89 37505678</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-yellow-400 mt-1 shrink-0" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-200 mb-1">Email</h3>
                                    <a href="mailto:info@sanjiskitchen.de" className="text-gray-300 font-light hover:text-yellow-400 transition-colors">info@sanjiskitchen.de</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-yellow-400 mt-1 shrink-0" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-200 mb-1">{language === "de" ? "Öffnungszeiten" : "Opening Hours"}</h3>
                                    <div className="text-gray-300 font-light text-sm space-y-1">
                                        <p><span className="w-24 inline-block">{language === "de" ? "Mo - Fr:" : "Mon - Fri:"}</span> 17:00 – 00:00</p>
                                        <p><span className="w-24 inline-block">{language === "de" ? "Samstag:" : "Saturday:"}</span> 12:00 – 14:30 | 17:00 - 00:00</p>
                                        <p><span className="w-24 inline-block">{language === "de" ? "Sonntag:" : "Sunday:"}</span> 12:00 - 14:30 | 17:00 – 23:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}