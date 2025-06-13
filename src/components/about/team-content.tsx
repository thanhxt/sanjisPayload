'use client';

import Image from "next/image";
import { Team } from "@/type/teamType";
import { useLanguage } from "../contexts/language-context";

interface TeamContentProps {
  team: Team[];
}

export function TeamContent({ team }: TeamContentProps) {
  const { language } = useLanguage();

  return (
    <section className="py-20 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            {language === "de" ? "Das Team" : "Our Team"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-8"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            {language === "de" 
              ? "Lernen Sie die talentierten Köche kennen, die hinter jedem außergewöhnlichen Gericht stehen."
              : "Meet the talented chefs behind every exceptional dish."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((team) => (
            <div key={team.id} className="group">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-xl">
                <Image 
                  src={team.Bild.url} 
                  alt={team.Mitarbeiter}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-medium text-white mb-1">
                    {team.Mitarbeiter}
                  </h3>
                  <p className="text-yellow-400 text-sm font-light">
                    {team.beschreibung}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 