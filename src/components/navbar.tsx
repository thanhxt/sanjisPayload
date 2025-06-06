"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState, useContext } from "react"
import Link from "next/link"
import { MenuContext, type MenuContextType } from "./menu-context"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { menuOpen, setMenuOpen } = useContext(MenuContext) as MenuContextType;

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

    return (
        <div>
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
                        <li><Link href="/" className="hover:text-gray-400 font-light">Home</Link></li>
                        <li><Link href="/about" className="hover:text-gray-400 font-light">About</Link></li>
                        <li><Link href="/speisekarte" className="hover:text-gray-400 font-light">Speisekarte</Link></li>
                        <li><Link href="/reservierung" className="hover:text-gray-400 font-light">Reservierungen</Link></li>
                        <li><Link href="/kontakt" className="hover:text-gray-400 font-light">Kontakt</Link></li>
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
                            <li><Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light">Home</Link></li>
                            <li><Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light">About Us</Link></li>
                            <li><Link href="/speisekarte" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light">Speisekarte</Link></li>
                            <li><Link href="/reservierung" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light">Reservieren</Link></li>
                            <li><Link href="/kontakt" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 font-light">Kontakt</Link></li>
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