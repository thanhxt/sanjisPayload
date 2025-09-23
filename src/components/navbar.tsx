"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect, useState, useContext } from "react"
import { MenuContext, type MenuContextType } from "./contexts/menu-context"
import { useLanguage } from "./contexts/language-context"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { menuOpen, setMenuOpen } = useContext(MenuContext) as MenuContextType;
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

        const handleLanguageChange = (value: 'de' | 'en') => {
            setLanguage(value)
        }

    return (
        <div>
            {/* Flag Icons 
            https://www.npmjs.com/package/flag-icons
            https://flagicons.lipis.dev/
            */}
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css"
                />
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                menuOpen
                    ? 'bg-black'
                    : isScrolled
                        ? 'bg-[#00000099] backdrop-blur-sm'
                        : 'bg-transparent'
            } text-white py-4`}>
                <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                    <div className="text-lg font-bold">
                        <Link href="/">
                            <Avatar className="bg-transparent h-12 w-12 cursor-pointer">
                                <AvatarImage src="/sanjislogo.svg" alt="Logo" className="invert" />
                                <AvatarFallback className="bg-transparent text-white">Logo</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                    {/* Desktop Nav */}
                    <ul className="nav-links flex space-x-8 text-xl">
                        <li><Link href="/" className="hover:text-gray-400 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Startseite" : "Home"}</Link></li>
                        <li><Link href="/about" className="hover:text-gray-400 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Über uns" : "About"}</Link></li>
                        <li><Link href="/speisekarte" className="hover:text-gray-400 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Speisekarte" : "Menu"}</Link></li>
                        <li><Link href="https://www.opentable.de/r/sanjis-steak-grill-and-bar-reservations-munchen?restref=347604&lang=de-DE&ot_source=Restaurant%20website" className="hover:text-gray-400 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Reservierung" : "Reservations"}</Link></li>
                        <li><Link href="/voucher" className="hover:text-gray-400 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Gutschein" : "Voucher"}</Link></li>
                        <li><Link href="/kontakt" className="hover:text-gray-400 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Kontakt" : "Contact"}</Link></li>
                        <li> <ToggleGroup type="single" defaultValue={language} variant="outline" size="sm" onValueChange={handleLanguageChange} aria-label="Select language">
                            <ToggleGroupItem value="de" aria-label="Switch to German" className="min-h-[44px] min-w-[44px] px-4">
                                <span className="fi fi-de"></span>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="en" aria-label="Switch to English" className="min-h-[44px] min-w-[44px] px-4">
                                <span className="fi fi-us"></span>
                            </ToggleGroupItem>
                        </ToggleGroup></li>
                    </ul>
                    {/* Mobile Breadcrumb/Hamburger */}
                    <button
                        className="breadcrumb-mobile flex flex-col justify-center items-end w-10 h-10 p-2"
                        style={{ display: 'none', background: 'none', border: 'none' }}
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="block w-8 h-0.5 mb-1 bg-yellow-300 rounded"></span>
                        <span className="block w-6 h-0.5 mb-1 bg-yellow-300 rounded"></span>
                        <span className="block w-4 h-0.5 bg-yellow-300 rounded"></span>
                    </button>
                </div>
                {/* Overlay menu */}
                <div className={`mobile-menu-overlay fixed inset-0 z-50 flex flex-col transition-all duration-500 ${menuOpen ? 'menu-open' : ''}`}
                    style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
                >
                    <div className="mobile-menu-bg absolute inset-0 bg-black transition-all duration-500" style={{ opacity: menuOpen ? 1 : 0 }} />
                    <div className={`relative flex flex-col h-full w-full transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                        style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(-32px)' }}
                    >
                        <div className="flex justify-between items-center p-6">
                            <Link href="/">
                                <Avatar className="bg-transparent h-12 w-12 cursor-pointer">
                                    <AvatarImage src="/sanjislogo.svg" alt="Logo" className="invert" />
                                    <AvatarFallback className="bg-transparent text-white">Logo</AvatarFallback>
                                </Avatar>
                            </Link>
                            <button
                                className="text-3xl text-yellow-300 font-thin"
                                style={{ background: 'none', border: 'none' }}
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                &#10005;
                            </button>
                        </div>
                        <ul className="flex flex-col items-start gap-6 px-8 text-xl mt-4">
                            <li><Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Startseite" : "Home"}</Link></li>
                            <li><Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Über uns" : "About Us"}</Link></li>
                            <li><Link href="/speisekarte" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Speisekarte" : "Menu"}</Link></li>
                            <li><Link href="https://www.opentable.de/r/sanjis-steak-grill-and-bar-reservations-munchen?restref=347604&lang=de-DE&ot_source=Restaurant%20website" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Reservierung" : "Reservations"}</Link></li>
                            <li><Link href="/kontakt" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light block py-2 px-4 min-h-[44px] min-w-[44px]">{language === "de" ? "Kontakt" : "Contact"}</Link></li>
                            <li className="mt-4">
                                <ToggleGroup type="single" defaultValue={language} variant="outline" size="sm" onValueChange={handleLanguageChange} aria-label="Select language">
                                    <ToggleGroupItem value="de" aria-label="Switch to German" className="min-h-[44px] min-w-[44px] px-4">
                                        <span className="fi fi-de"></span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="en" aria-label="Switch to English" className="min-h-[44px] min-w-[44px] px-4">
                                        <span className="fi fi-us"></span>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </li>
                        </ul>
                    </div>
                </div>
                <style jsx>{`
                    @media (max-width: 900px) {
                        .nav-links {
                            display: none;
                        }
                        .breadcrumb-mobile {
                            display: flex !important;
                        }
                        .mobile-menu-overlay {
                            pointer-events: none;
                        }
                        .mobile-menu-overlay.menu-open {
                            pointer-events: auto;
                        }
                        .mobile-menu-bg {
                            transition: opacity 0.5s;
                        }
                        .mobile-menu-overlay .relative {
                            transition: opacity 0.5s, transform 0.5s;
                        }
                        .container {
                            padding-left: 1rem !important;
                            padding-right: 1rem !important;
                        }
                    }
                `}</style>
            </nav>
        </div>
    )
}