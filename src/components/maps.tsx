'use client';
import Link from "next/link";
import { Button } from "./ui/button";
import { getCookie } from 'cookies-next';
import { useState, useEffect } from "react";
import { useLanguage } from "./contexts/language-context";


export default function Maps() {
    const [showMap, setShowMap] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        const consent = getCookie('cookie_consent');
        setShowMap(!!consent);
    }, []);

    return (
        <div className="relative bg-[#020002] text-white py-16 overflow-hidden">
        {/* Content Layout */}
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-8">
            {/* Left: Text */}
            <div className="flex-1 flex flex-col justify-center max-w-xl pl-8 md:pl-24 pr-0 md:pr-16">
                <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-8">{language === "de" ? "Parkmöglichkeiten" : "Parking"}</h1>
                <div className="text-lg mb-4 text-gray-300">
                    {language === "de" ? "Geparkt werden kann am Straßenrand mit" : "Parking is possible on the street edge with"}
                    <span className="font-bold"> {language === "de" ? "Parkschein" : "Parking Ticket"}</span> {language === "de" ? "oder im nächsten" : "or in the next"} <span className="font-bold">{language === "de" ? "Parkhaus" : "Parking Garage"}</span> {language === "de" ? "5 Minuten entfernt." : "5 minutes away."} <br /><br />
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:gap-6 items-center md:items-start w-full px-6 md:px-0">
                        <Button className="w-full md:w-auto text-base min-h-[44px] px-6">
                            <Link href="https://maps.app.goo.gl/dq8grbU2DrHrB4gw7" className="block py-2 px-2">
                                {language === "de" ? "Parkhaus Ostbahnhof 500m" : "Ostbahnhof Parking 500m"}
                            </Link>
                        </Button>
                        <Button className="w-full md:w-auto text-base min-h-[44px] px-6">
                            <Link href="https://maps.app.goo.gl/g7ZxdfDtyF71aUno9" className="block py-2 px-2">
                                {language === "de" ? "Parkhaus Hilton Hotel 450m" : "Hilton Hotel Parking 450m"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            {/* Main Restaurant Image */}
            <div className="w-full h-[350px] md:w-[720px] md:h-[420px] rounded-xl overflow-hidden shadow-lg relative z-10 inset-y-0 right-0" >
                {showMap ? (
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6934.883595245024!2d11.596559500000001!3d48.1296125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ddfcbd59e3def%3A0xac6d87a717fc5cfb!2sSANJI&#39;S%20Steak%2C%20Grill%20%26%20Bar!5e1!3m2!1sde!2sde!4v1747258110502!5m2!1sde!2sde" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
                ) : (
                    <div className="absolute inset-0 z-0">
                        <div className="text-center text-gray-400">
                            {language === "de" ? "Um die Karte zu laden, stimmen Sie bitte der Verwendung von Cookies zu." : "To load the map, please accept the use of cookies."}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}
