import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';

export default function Footer() {
    return (
        
        <footer className="bg-black text-gray-100 pt-10 pb-4 m-0 border-0 font-sans" style={{marginBottom: 0, border: 'none'}}>
            <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-gray-700 flex items-center justify-center bg-gray-800 mb-6">
                    <Avatar className="bg-transparent h-16 w-16 cursor-pointer">
                        <AvatarImage src="/sanjislogo.svg" alt="Logo" className="invert" />
                        <AvatarFallback className="bg-transparent text-white">Logo</AvatarFallback>
                    </Avatar>
                </div>
                {/* Main content */}
                <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-12 text-center mb-8">
                    {/* Links */}
                    <div className="flex-1">
                        <h3 className="font-bold mb-2 tracking-widest text-lg">Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/speisekarte" className="transition-all duration-300 hover:text-yellow-400 hover:underline underline-offset-8">Speisekarte</Link></li>
                            <li><Link href="/about" className="transition-all duration-300 hover:text-yellow-400 hover:underline underline-offset-8">About</Link></li>
                            <li><Link href="/reservierung" className="transition-all duration-300 hover:text-yellow-400 hover:underline underline-offset-8">Reservierung</Link></li>
                        </ul>
                    </div>
                    {/* Öffnungszeiten */}
                    <div className="flex-1">
                        <h3 className="font-bold mb-2 tracking-widest text-lg">Öffnungszeiten</h3>
                        <div className="text-sm text-gray-300">
                            <div>Montag - Freitag<br />17:00 - 00:00</div>
                            <div className="mt-2">Samstag - Sonntag<br />12:00 - 14:30<br />17:00 - 00:00</div>
                        </div>
                    </div>
                    {/* Socials */}
                    <div className="flex-1">
                        <h3 className="font-bold mb-2 tracking-widest text-lg">Socials</h3>
                        <ul className="space-y-2">
                            <li><Link href="https://www.instagram.com/sanjis.kitchen/" className="transition-all duration-300 hover:text-yellow-400 hover:underline underline-offset-8">Instagram</Link></li>
                            <li><Link href="mailto:info@sanjiskitchen.de" className="transition-all duration-300 hover:text-yellow-400 hover:underline underline-offset-8">info@sanjiskitchen.de</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Full-width bottom bar */}
            <div className="bg-black text-gray-300 text-base flex flex-col md:flex-row justify-between items-center px-4 py-4 mt-4 w-full border-t border-gray-800">
                <span>© {new Date().getFullYear()} Sanji&apos;s München | Alle Rechte vorbehalten</span>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <Link href="/datenschutz" className="transition-all duration-300 hover:text-yellow-400 hover:underline underline-offset-8">Datenschutz</Link>
                    <Link href="/impressum" className="transition-all duration-300 hover:text-yellow-400 hover:underline underline-offset-8">Impressum</Link>
                </div>
            </div>
        </footer>
    );
}