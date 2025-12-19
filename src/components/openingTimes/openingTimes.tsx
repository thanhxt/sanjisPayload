'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { X, CalendarClock } from "lucide-react"
import { useLanguage } from '@/components/contexts/language-context'

export default function HolidayOpeningHours() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const dismissed = sessionStorage.getItem('holiday-hours-dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsOpen(false)
    sessionStorage.setItem('holiday-hours-dismissed', 'true')
  }

  if (!isOpen) return null

  const isDe = language === 'de'

  return (
    <div className="fixed top-24 left-4 z-[60] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-top-5 fade-in duration-500 ">
      <Alert className="bg-[#0f0f0f]/95 border-[#C5A059] text-white shadow-xl shadow-black/50 backdrop-blur-md relative pr-8">
        <CalendarClock className="h-5 w-5 text-[#C5A059]" />
        <AlertTitle className="text-[#C5A059] mb-3 font-semibold tracking-wider uppercase text-sm">
          {isDe ? 'Öffnungszeiten Feiertage' : 'Holiday Opening Hours'}
        </AlertTitle>
        <AlertDescription className="text-gray-200 text-sm space-y-1.5 font-light">
            <div className="flex justify-between items-center border-b border-white/10 pb-1 gap-4">
              <span>24.12. & 25.12.</span>
              <span className="text-red-400 font-medium tracking-wide text-xs uppercase text-right">
                {isDe ? 'Geschlossen' : 'Closed'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-1 gap-4">
              <span>26.12.</span>
              <span className="text-green-400 font-medium tracking-wide text-xs uppercase text-right">
                {isDe ? 'Geöffnet' : 'Open'}
              </span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span>01.01.</span>
              <span className="text-red-400 font-medium tracking-wide text-xs uppercase text-right">
                {isDe ? 'Geschlossen' : 'Closed'}
              </span>
            </div>
             <div className="pt-2 text-xs text-[#C5A059]/80 italic text-center">
               {isDe ? 'Frohe Weihnachten & Guten Rutsch!' : 'Merry Christmas & Happy New Year!'}
            </div>
        </AlertDescription>
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          aria-label={isDe ? 'Schließen' : 'Close'}
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  )
}
