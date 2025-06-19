"use client";

import { Instagram, Mail, User, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { getCookie } from 'cookies-next';
import CookieAlert from "./alerts/cookieAlert";
import FillAlert from "./alerts/fillAlert";
import CaptchaAlert from "./alerts/captchaAlert";
import SucessEmailAlert from "./alerts/sucessEmailAlert";
import { useLanguage } from "./contexts/language-context";

export default function Contact() {

    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [showCookieAlert, setShowCookieAlert] = useState(false);
    const [showFillAlert, setShowFillAlert] = useState(false);
    const [showCaptchaAlert, setShowCaptchaAlert] = useState(false);
    const [showSucessEmailAlert, setShowSucessEmailAlert] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        const consent = getCookie('cookie_consent');
        setShowCaptcha(!!consent);
        if (!consent) return;

        const handleCaptchaSolve = (e) => {
            const token = e.detail.token;
            setCaptchaToken(token);
            sendCaptcha(token);
        };

        // Wait for the widget to be available
        const checkWidget = setInterval(() => {
            const widget = document.querySelector("#cap");
            if (widget) {
                widget.addEventListener("solve", handleCaptchaSolve);
                clearInterval(checkWidget);
            }
        }, 100);

        // Cleanup function
        return () => {
            clearInterval(checkWidget);
            const widget = document.querySelector("#cap");
            if (widget) {
                widget.removeEventListener("solve", handleCaptchaSolve);
            }
        };
    }, []);

    const sendCaptcha = async (token) => {
        const res = await fetch("http://localhost:3000/api/send-captcha", {
            method: "POST",
            body: JSON.stringify({ token }),
        });
        const data = await res.json();
        console.log(data.message || data.error);
    };

    const sendEmail = async () => {
        const consent = getCookie('cookie_consent');
        if (!consent) {
            setShowCookieAlert(true);
            return;
        }
        setShowCookieAlert(false);

        if (!captchaToken) {
            setShowCaptchaAlert(true);
            return;
        }
        setShowCaptchaAlert(false);
        if (name === '' || email === '' || subject === '') {
            setShowFillAlert(true);
            return;
        }
        setShowFillAlert(false);

        try {
            // Make sure this uses the correct URL for your environment
            const apiUrl = 'http://localhost:3000/api/send-email-node';
            
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    subject,
                    msg,
                    name
                }),
            });
            if (!res.ok) {
                throw new Error('Failed to send email');
            }
            const data = await res.json();
            console.log(data.message || data.error);
            setShowSucessEmailAlert(true);
            setName('');
            setEmail('');
            setSubject('');
            setMsg('');
        } catch (error) {
            console.error('Error sending email:', error);
            setShowCaptchaAlert(true);
        }
    };

    return (
        <div className="relative bg-[#020002] text-white py-16 min-h-screen overflow-hidden">
            <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-12 justify-center">
                {/* Left: Contact Form */}
                <div className="flex-1 flex flex-col justify-center max-w-xl md:pr-8 p-6 md:p-10 ">
                    <h1 className="text-5xl font-bold mb-8 text-left">{language === "de" ? "Kontaktieren Sie uns" : "Contact Us"}</h1>
                    
                    <form className="space-y-6" >
                        <div>
                            <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-300">{language === "de" ? "Dein Name" : "Your Name"}</label>
                            <Input 
                                id="name" 
                                name="name" 
                                type="text" 
                                placeholder={language === "de" ? "Dein Name" : "Your Name"} 
                                required value={name} 
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-300">{language === "de" ? "Deine E-Mail-Adresse" : "Your Email Address"}</label>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder={language === "de" ? "Deine E-Mail-Adresse" : "Your Email Address"} 
                                required value={email} 
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-lg font-medium text-gray-300">{language === "de" ? "Betreff" : "Subject"}</label>
                            <Input 
                                id="subject" 
                                name="subject" 
                                type="text" 
                                placeholder={language === "de" ? "Betreff" : "Subject"} 
                                required value={subject} 
                                onChange={(e) => setSubject(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-300">{language === "de" ? "Deine Nachricht (optional)" : "Your Message (optional)"}</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows={5} 
                                placeholder={language === "de" ? "Deine Nachricht" : "Your Message"} 
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base text-white shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-colors" 
                                value={msg} onChange={(e) => setMsg(e.target.value)} />
                        </div>
                        {showCookieAlert && (
                            <div className="my-4">
                                <CookieAlert />
                            </div>
                        )}
                        {showFillAlert && (
                            <div className="my-4">
                                <FillAlert />
                            </div>
                        )}
                        {showCaptchaAlert && (
                            <div className="my-4">
                                <CaptchaAlert />
                            </div>
                        )}
                        {showSucessEmailAlert && (
                            <div className="my-4">
                                <SucessEmailAlert />
                            </div>
                        )}
                        {showCaptcha && (
                            <>
                                <Script 
                                    src="https://cap.sanjis.thanhxt.com/assets/widget.js"
                                    strategy="afterInteractive"
                                ></Script>
                                <cap-widget
                                    id="cap"
                                    data-cap-api-endpoint={process.env.NEXT_PUBLIC_CAPTCHA_API_URL_PRODUCTION}
                                ></cap-widget>
                            </>
                        )}
                        <Button 
                            type="submit" 
                            className="mt-4 w-full md:w-auto px-8 py-2 text-lg font-semibold" 
                            onClick={(e) => {
                                e.preventDefault();
                                sendEmail();
                            }}>Senden
                        </Button>
                    </form>
                </div>
                {/* Right: Info Section */}
                <div className="flex-1 flex flex-col justify-center max-w-xl md:pl-8 mt-12 md:mt-0">
                    <h2 className="text-3xl font-bold mb-6 text-left">{language === "de" ? "Unsere Informationen" : "Our Information"}</h2>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-200">{language === "de" ? "Öffnungszeiten" : "Opening Hours"}</h2>
                        <div className="text-gray-300 text-base">
                            <div>Montag – Donnerstag: 12:00 – 23:00</div>
                            <div>Freitag – Samstag: 12:00 – 00:00</div>
                            <div>Sonntag: 17:00 – 23:00</div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-200">{language === "de" ? "Adresse" : "Address"}</h2>
                        <div className="flex items-center gap-2 text-gray-300 text-base">
                            <MapPin className="w-5 h-5 text-yellow-400" />
                            {language === "de" ? "Kellerstraße 32, 81667 München" : "Kellerstraße 32, 81667 Munich"}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-200">{language === "de" ? "Kontakt" : "Contact"}</h2>
                        <div className="flex items-center gap-2 text-gray-300 text-base mb-1">
                            <Mail className="w-5 h-5 text-yellow-400" />
                            <a href="mailto:info@sanjiskitchen.de" className="hover:text-yellow-400 transition">{language === "de" ? "info@sanjiskitchen.de" : "info@sanjiskitchen.de"}</a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 text-base">
                            <User className="w-5 h-5 text-yellow-400" />
                            <a href="tel:+498937505678" className="hover:text-yellow-400 transition">{language === "de" ? "+49 89 37505678" : "+49 89 37505678"}</a>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-200">{language === "de" ? "Social Media" : "Social Media"}</h2>
                            <div className="flex gap-4 mt-2">
                            <Link href="https://www.instagram.com/sanjis.kitchen/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
                                <Instagram className="w-8 h-8" />
                            </Link>
                            <Link href="https://maps.app.goo.gl/aydeaQ5jkak2mUz78" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
                                <MapPin className="w-8 h-8" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
