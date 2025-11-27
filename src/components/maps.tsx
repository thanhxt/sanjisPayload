'use client';
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useLanguage } from "./contexts/language-context";
import { useCookieConsent, showConsentPreferences } from "@/hooks/useCookieConsent";
import { MapPin } from "lucide-react";

export default function Maps() {
    const { language } = useLanguage();
    const showMap = useCookieConsent('functionality');

    return (
        <div className="relative bg-[#020002] text-white py-24 overflow-hidden min-h-[60vh] flex items-center">
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

            {/* Content Layout */}
            <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 px-4">
                {/* Left: Text */}
                <div className="flex-1 flex flex-col justify-center max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl lg:text-5xl font-light mb-8 uppercase drop-shadow-lg">
                        {language === "de" ? "Parkmöglichkeiten" : "Parking"}
                    </h1>
                    <div className="text-lg mb-8 text-gray-200 font-light leading-relaxed">
                        {language === "de" ? (
                            <>
                                Geparkt werden kann am Straßenrand mit <span className="font-medium text-white">Parkschein</span> oder im nächsten <span className="font-medium text-white">Parkhaus</span> 5 Minuten entfernt.
                            </>
                        ) : (
                            <>
                                Parking is possible on the street with a <span className="font-medium text-white">parking ticket</span> or in the nearest <span className="font-medium text-white">parking garage</span> 5 minutes away.
                            </>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <Button variant="outline" className="w-full sm:w-auto text-base py-6 px-6 border-white/30 bg-white/5 hover:bg-white/20 hover:border-white/50 text-white transition-all duration-300 rounded-xl group">
                            <Link href="https://maps.app.goo.gl/dq8grbU2DrHrB4gw7" target="_blank" className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                                <span>{language === "de" ? "Parkhaus Ostbahnhof (500m)" : "Ostbahnhof Parking (500m)"}</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto text-base py-6 px-6 border-white/30 bg-white/5 hover:bg-white/20 hover:border-white/50 text-white transition-all duration-300 rounded-xl group">
                            <Link href="https://maps.app.goo.gl/g7ZxdfDtyF71aUno9" target="_blank" className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                                <span>{language === "de" ? "Hilton Hotel (450m)" : "Hilton Hotel (450m)"}</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Main Restaurant Image / Map */}
                <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 bg-white/5 backdrop-blur-sm">
                    {showMap ? (
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.995380297236!2d11.593979212041823!3d48.12961247112273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ddfcbd59e3def%3A0xac6d87a717fc5cfb!2sSANJI&#39;S%20Steak%2C%20Grill%20%26%20Bar!5e0!3m2!1sde!2sde!4v1758555134926!5m2!1sde!2sde"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                        >
                        </iframe>
                    ) : (
                        <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
                            <div className="text-center text-gray-200 p-8 max-w-md">
                                <p className="mb-6 text-lg font-light">
                                    {language === "de" ? "Um die Karte zu laden, stimmen Sie bitte den funktionalen Cookies zu." : "To load the map, please accept functional cookies."}
                                </p>
                                <Button
                                    onClick={showConsentPreferences}
                                    variant="outline"
                                    className="text-white border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 rounded-full px-8 py-6"
                                >
                                    {language === "de" ? "Cookie-Einstellungen öffnen" : "Open Cookie Settings"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
