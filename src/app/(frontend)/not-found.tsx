import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <Image
                    src="/sanjislogo.svg"
                    alt="Sanji's Kitchen Logo"
                    width={96}
                    height={96}
                    className="invert mx-auto mb-8"
                />
                <h1 className="text-6xl font-light tracking-widest mb-4">404</h1>
                <p className="text-xl text-gray-300 font-light mb-2">
                    Diese Seite wurde leider nicht gefunden.
                </p>
                <p className="text-sm text-gray-500 mb-10">
                    Sorry, we couldn&apos;t find this page.
                </p>
                <Link
                    href="/"
                    className="inline-block border border-white/30 rounded-full px-8 py-3 text-lg font-light tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                    Zurück zur Startseite
                </Link>
            </div>
        </main>
    )
}
