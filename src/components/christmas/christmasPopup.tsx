'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // WICHTIG: Link importiert

export default function ChristmasPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);

  useEffect(() => {
    // Session Storage Check
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem('sanjis_xmas_seen');

    if (hasSeen) {
      setShowTrigger(true);
    } else {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    setTimeout(() => setShowTrigger(true), 300);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sanjis_xmas_seen', 'true');
    }
  };

  const handleOpenTrigger = () => {
    setShowTrigger(false);
    setShowPopup(true);
  };

  // Gemeinsame Klassen für das Button-Styling, um Code zu sparen
  const buttonBaseClass = "group relative w-full inline-flex items-center justify-center py-3 px-4 overflow-hidden rounded-sm border border-[#C5A059] text-[#C5A059] hover:text-black transition-colors duration-300 ease-out cursor-pointer";
  const buttonHoverBgClass = "absolute inset-0 w-full h-full bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out";
  const buttonTextClass = "relative font-medium tracking-[0.15em] text-xs uppercase whitespace-nowrap";

  return (
    <>
      {/* === MINI TRIGGER (Unten Rechts) === */}
      {showTrigger && (
        <button
          onClick={handleOpenTrigger}
          className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full bg-[#0a0a0a]/90 border border-[#C5A059]/60 backdrop-blur-md flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all duration-500 shadow-xl shadow-black/60 group cursor-pointer"
          aria-label="Weihnachts-Special öffnen"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-8.25M21 11.25c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2m18 0V9.75a1.5 1.5 0 0 0-1.5-1.5h-3.75a1.5 1.5 0 0 0-1.5 1.5v1.5m-9 0V9.75a1.5 1.5 0 0 0-1.5-1.5H4.5a1.5 1.5 0 0 0-1.5 1.5v1.5m9 0h-9" />
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v8.25" />
           </svg>
           <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#C5A059] opacity-80"></span>
        </button>
      )}

      {/* === DAS HAUPT POPUP === */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={handleClosePopup}
          />

          {/* Container */}
          <div className="relative z-[10000] w-full max-w-[500px] bg-[#0f0f0f] rounded-sm shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 border border-[#C5A059]/20">
            
            {/* Schließen Button */}
            <button 
              onClick={handleClosePopup}
              className="absolute top-2 right-2 z-20 bg-black/20 hover:bg-black/60 text-gray-600 hover:text-white rounded-full p-2 transition-all backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* BILD BEREICH */}
            <div className="relative w-full h-auto bg-white">
              <Image 
                src="/christmas.png" 
                alt="Sanji's Christmas Special"
                width={800}
                height={1000}
                className="w-full h-auto block"
                priority
                quality={90}
              />
            </div>

            {/* FOOTER BEREICH MIT 2 BUTTONS */}
            <div className="bg-[#0f0f0f] px-6 py-6 text-center border-t border-[#2a2a2a]">
              
              {/* Container für die Buttons: Mobil untereinander, ab Tablet nebeneinander */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                
                {/* BUTTON 1: ZUM MENÜ (Interne Seite) */}
                <Link 
                  href="/christmas" 
                  onClick={handleClosePopup}
                  className={buttonBaseClass}
                >
                  <span className={buttonHoverBgClass}></span>
                  <span className={buttonTextClass}>
                    Zum Menü
                  </span>
                </Link>

                {/* BUTTON 2: RESERVIEREN (Extern) */}
                <a 
                  href="https://www.opentable.de/r/sanjis-steak-grill-and-bar-reservations-munchen?restref=347604&lang=de-DE&ot_source=Restaurant%20website" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClosePopup}
                  className={buttonBaseClass}
                >
                  <span className={buttonHoverBgClass}></span>
                  <span className={buttonTextClass}>
                    Tisch Reservieren
                  </span>
                </a>

              </div>

              {/* "Später erinnern" Text */}
              <button 
                onClick={handleClosePopup} 
                className="mt-5 text-[10px] uppercase tracking-widest text-gray-600 hover:text-gray-400 transition-colors"
              >
                Schließen
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}