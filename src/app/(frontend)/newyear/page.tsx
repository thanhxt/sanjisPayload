import Image from 'next/image';

export const metadata = {
  title: "Silvester Menü & Jahresabschluss | Sanji's – Steak, Grill & Bar München",
  description: 'Feiern Sie Silvester bei Sanji\'s Kitchen in München! Genießen Sie unser exklusives Jahresabschluss-Dinner und begrüßen Sie das neue Jahr mit Genuss und Feuerwerk.',
};

export default function NewyearPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#C5A059] flex flex-col items-center pb-20">

      {/* === INTRO TEXT === */}
      <div className="text-center mt-32 mb-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
          <span className="text-[#C5A059] italic">Jahresabschluss-Dinner</span> im Sanjis
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
          Gemeinsam das Jahr ausklingen lassen - mit Genuss, Wärme und besonderen Momenten.
        </p>
        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mt-2">
          Zum Mitternachtsschlag erwartet euch ein exklusives Feuerwerk – feiern wir gemeinsam den Beginn des neuen Jahres.
        </p>
      </div>

      {/* === DAS MENÜ BILD (ELEGANT EINGEBETTET) === */}
      <div className="relative w-full max-w-2xl px-4 mb-16 animate-in fade-in zoom-in duration-1000 delay-100">
        
        {/* Hintergrund GLOW Effekt (Goldener Schein hinter dem Bild) */}
        <div className="absolute -inset-1 bg-gradient-to-b from-[#C5A059]/20 to-transparent blur-2xl opacity-50 rounded-[30px]"></div>
        
        {/* Container für das Bild */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-[#C5A059]/20">
          <Image
            src="/newyear-menu.jpeg" 
            alt="Sanji's New Year Menu Gänge"
            width={800}
            height={1200}
            className="w-full h-auto object-cover"
            priority
          />
          
          {/* Ein ganz feiner Overlay-Verlauf unten, damit der Übergang zum schwarzen Hintergrund weicher ist */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent opacity-20"></div>
        </div>
      </div>

      {/* === CALL TO ACTION BUTTON === */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050505]/80 backdrop-blur-md border-t border-[#C5A059]/20 flex justify-center z-50 animate-in slide-in-from-bottom-full duration-1000 delay-300">
        <a
          href="https://www.opentable.com/booking/experiences-availability?rid=347604&restref=347604&experienceId=593444&utm_source=external&utm_medium=referral&utm_campaign=shared"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative group overflow-hidden rounded-sm
            bg-[#C5A059] text-black 
            py-4 px-12 
            font-bold uppercase tracking-[0.2em] text-sm
            shadow-[0_0_20px_rgba(197,160,89,0.3)]
            hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]
            transition-all duration-300
          "
        >
          <span className="relative z-10">Tisch für Neujahr sichern</span>
          {/* Shine Effekt beim Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/30 skew-x-12 transition-transform duration-700 ease-in-out"></div>
        </a>
      </div>

      {/* Abstandhalter unten, damit der Button nichts verdeckt */}
      <div className="h-20"></div>

    </main>
  );
}