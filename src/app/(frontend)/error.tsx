'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <h1 className="text-4xl font-light tracking-widest mb-4">Etwas ist schiefgelaufen</h1>
                <p className="text-gray-300 font-light mb-2">
                    Bitte versuchen Sie es erneut. Sollte das Problem bestehen bleiben,
                    erreichen Sie uns unter{' '}
                    <a href="mailto:info@sanjiskitchen.de" className="underline hover:text-yellow-300">info@sanjiskitchen.de</a>.
                </p>
                <p className="text-sm text-gray-500 mb-10">
                    Something went wrong. Please try again.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="border border-white/30 rounded-full px-8 py-3 text-lg font-light tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    >
                        Erneut versuchen
                    </button>
                    <Link
                        href="/"
                        className="border border-white/30 rounded-full px-8 py-3 text-lg font-light tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    >
                        Zur Startseite
                    </Link>
                </div>
            </div>
        </main>
    )
}
