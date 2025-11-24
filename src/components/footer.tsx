'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { useLanguage } from './contexts/language-context';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { language } = useLanguage();
  const [year, setYear] = useState<number>(2024);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const t = {
    links:       { de: 'Links',            en: 'Links' },
    menu:        { de: 'Speisekarte',      en: 'Menu' },
    about:       { de: 'Über uns',         en: 'About' },
    reservation: { de: 'Reservierung',      en: 'Reservation' },
    contact:     { de: 'Kontakt',          en: 'Contact' },
    voucher:     { de: 'Gutschein',        en: 'Voucher' },
    christmas:   { de: 'Weihnachten',      en: 'Christmas' },
    opening:     { de: 'Öffnungszeiten',    en: 'Opening Hours' },
    weekdays:    { de: 'Montag - Freitag',  en: 'Monday - Friday' },
    Sunday:      { de: 'Sonntag',           en: 'Sunday' },
    saturday:    { de: 'Samstag',           en: 'Samstag' },
    socials:     { de: 'Socials',           en: 'Socials' },
    rights:      { de: 'Alle Rechte vorbehalten', en: 'All rights reserved' },
    privacy:     { de: 'Datenschutz',       en: 'Privacy Policy' },
    legal:       { de: 'Impressum',         en: 'Legal Notice' },
  };

  return (
    <footer className="bg-black text-gray-100 pt-8 pb-2 font-sans">
      <div className="flex flex-col items-center w-full">
        {/* Logo centered */}
        <div className="mb-6 flex justify-center w-full">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center">
            <Avatar className="bg-transparent h-12 w-12 md:h-16 md:w-16 cursor-pointer">
              <AvatarImage src="/sanjislogo.svg" alt="Logo" className="invert" />
              <AvatarFallback className="bg-transparent text-white">Logo</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Three columns via grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full px-4 md:px-8 mb-8 text-center gap-6">
          {/* Links */}
          <div className="flex flex-col items-center">
            <h2 className="font-bold tracking-widest mb-2 text-lg">{t.links[language]}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-yellow-400 hover:underline">
                  {t.about[language]}
                </Link>
              </li>
              <li>
                <Link href="/speisekarte" className="hover:text-yellow-400 hover:underline">
                  {t.menu[language]}
                </Link>
              </li>
              <li>
                <Link href="/weihnachten" className="hover:text-yellow-400 hover:underline">
                  {t.christmas[language]}
                </Link>
              </li>
              <li>
                <Link href="/reservierung" className="hover:text-yellow-400 hover:underline">
                  {t.reservation[language]}
                </Link>
              </li>
              <li>
                <Link href="/voucher" className="hover:text-yellow-400 hover:underline">
                  {t.voucher[language]}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-400 hover:underline">
                  {t.contact[language]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-center">
            <h2 className="font-bold tracking-widest mb-2 text-lg">{t.opening[language]}</h2>
            <div className="text-xs md:text-sm text-gray-300 space-y-2">
              <div>
                {t.weekdays[language]}<br />
                17:00 – 00:00
              </div>
              <div>
                {t.saturday[language]}<br />
                12:00 – 14:30<br />
                17:00 - 00:00
              </div>
              <div>
                {t.Sunday[language]}<br />
                12:00 - 14:30<br />
                17:00 – 23:00
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center">
            <h2 className="font-bold tracking-widest mb-2 text-lg">{t.socials[language]}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://www.instagram.com/sanjis.kitchen/" className="hover:text-yellow-400 hover:underline">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="mailto:info@sanjiskitchen.de" className="hover:text-yellow-400 hover:underline">
                  info@sanjiskitchen.de
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black text-gray-300 text-xs md:text-base border-t border-gray-800 flex flex-col md:flex-row justify-between items-center px-6 py-4">
        <span>© {year} Sanji&apos;s München | {t.rights[language]}</span>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/datenschutz" className="hover:text-yellow-400 hover:underline">
            {t.privacy[language]}
          </Link>
          <Link href="/impressum" className="hover:text-yellow-400 hover:underline">
            {t.legal[language]}
          </Link>
        </div>
      </div>
    </footer>
  );
}
