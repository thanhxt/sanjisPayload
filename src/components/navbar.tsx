"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect, useState, useContext } from "react"
import { MenuContext, type MenuContextType } from "./contexts/menu-context"
import { useLanguage } from "./contexts/language-context"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const { menuOpen, setMenuOpen } = useContext(MenuContext) as MenuContextType;
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        setIsMounted(true)
        const handleScroll = () => {
            if (typeof window !== 'undefined' && window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
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
            <nav className={`fixed w-full z-50 transition-all duration-300 ${menuOpen
                ? 'bg-black'
                : isScrolled
                    ? 'bg-[#00000099] backdrop-blur-sm'
                    : 'bg-transparent'
                } text-white py-4`}>
                <div className="max-w-[1440px] mx-auto flex justify-between items-center px-4 md:px-8">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Avatar className="bg-transparent h-10 w-10 md:h-12 md:w-12 cursor-pointer transition-transform hover:scale-105">
                                <AvatarImage src="/sanjislogo.svg" alt="Logo" className="invert" />
                                <AvatarFallback className="bg-transparent text-white">Logo</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                    {/* Desktop Nav */}
                    <ul className="nav-links hidden xl:flex items-center space-x-2 lg:space-x-4 xl:space-x-6 text-base xl:text-lg">
                        <li><Link href="/" className="hover:text-yellow-300 transition-colors font-light block py-2 px-3">{language === "de" ? "Startseite" : "Home"}</Link></li>
                        <li><Link href="/about" className="hover:text-yellow-300 transition-colors font-light block py-2 px-3">{language === "de" ? "Über uns" : "About"}</Link></li>
                        <li><Link href="/speisekarte" className="hover:text-yellow-300 transition-colors font-light block py-2 px-3">{language === "de" ? "Speisekarte" : "Menu"}</Link></li>
                        <li><Link href="/reservierung" className="hover:text-yellow-300 transition-colors font-light block py-2 px-3">{language === "de" ? "Reservierung" : "Reservations"}</Link></li>
                        <li><Link href="/voucher" className="hover:text-yellow-300 transition-colors font-light block py-2 px-3">{language === "de" ? "Gutschein" : "Voucher"}</Link></li>
                        <li><Link href="/kontakt" className="hover:text-yellow-300 transition-colors font-light block py-2 px-3">{language === "de" ? "Kontakt" : "Contact"}</Link></li>
                        <li className="pl-2"> 
                            <ToggleGroup type="single" value={isMounted ? language : 'de'} variant="outline" size="sm" onValueChange={handleLanguageChange} aria-label="Select language" className="border-white/20">
                                <ToggleGroupItem value="de" aria-label="Switch to German" className="h-8 w-10 px-0 data-[state=on]:bg-white/20">
                                    <span className="fi fi-de text-xs"></span>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="en" aria-label="Switch to English" className="h-8 w-10 px-0 data-[state=on]:bg-white/20">
                                    <span className="fi fi-us text-xs"></span>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </li>
                    </ul>
                    {/* Mobile Breadcrumb/Hamburger */}
                    <button
                        className="xl:hidden flex flex-col justify-center items-end w-10 h-10 p-2 group"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="block w-8 h-0.5 mb-1.5 bg-yellow-300 rounded transition-all group-hover:w-8"></span>
                        <span className="block w-6 h-0.5 mb-1.5 bg-yellow-300 rounded transition-all group-hover:w-8"></span>
                        <span className="block w-4 h-0.5 bg-yellow-300 rounded transition-all group-hover:w-8"></span>
                    </button>
                </div>
                {/* Overlay menu */}
                <div className={`mobile-menu-overlay fixed inset-0 z-50 flex flex-col transition-all duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
                >
                    <div className="mobile-menu-bg absolute inset-0 bg-black/95 backdrop-blur-md" />
                    <div className={`relative flex flex-col h-full w-full transition-all duration-500 delay-100 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex justify-between items-center p-6 md:p-8">
                            <Link href="/" onClick={() => setMenuOpen(false)}>
                                <Avatar className="bg-transparent h-12 w-12">
                                    <AvatarImage src="/sanjislogo.svg" alt="Logo" className="invert" />
                                    <AvatarFallback>Logo</AvatarFallback>
                                </Avatar>
                            </Link>
                            <button
                                className="w-12 h-12 flex items-center justify-center text-yellow-300 transition-transform hover:rotate-90"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <ul className="flex flex-col items-center justify-center flex-grow gap-8 text-2xl uppercase tracking-widest">
                            <li><Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors font-light">{language === "de" ? "Startseite" : "Home"}</Link></li>
                            <li><Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors font-light">{language === "de" ? "Über uns" : "About Us"}</Link></li>
                            <li><Link href="/speisekarte" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors font-light">{language === "de" ? "Speisekarte" : "Menu"}</Link></li>
                            <li><Link href="/reservierung" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors font-light">{language === "de" ? "Reservierung" : "Reservations"}</Link></li>
                            <li><Link href="/voucher" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors font-light">{language === "de" ? "Gutschein" : "Voucher"}</Link></li>
                            <li><Link href="/kontakt" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 transition-colors font-light">{language === "de" ? "Kontakt" : "Contact"}</Link></li>
                            <li className="mt-4">
                                <ToggleGroup type="single" value={isMounted ? language : 'de'} variant="outline" onValueChange={handleLanguageChange} aria-label="Select language" className="scale-125 border-white/20">
                                    <ToggleGroupItem value="de" className="px-6 data-[state=on]:bg-white/20">
                                        <span className="fi fi-de"></span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="en" className="px-6 data-[state=on]:bg-white/20">
                                        <span className="fi fi-us"></span>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </div>
    )
}