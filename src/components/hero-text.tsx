'use client';
import { useLanguage } from "./contexts/language-context";

export default function HeroText( { title, titleEn }: { title: string, titleEn: string } ) {
    const { language } = useLanguage();
    return (
        <div className="relative text-white z-20 text-4xl text-center">
            <h1 className="text-4xl font-bold">{language === "de" ? title : titleEn}</h1>
        </div>
    )
}