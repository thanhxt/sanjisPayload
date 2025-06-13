'use client';

import { useLanguage } from "../contexts/language-context";

export function AboutContent() {
  const { language } = useLanguage();

  return (
    <div className="order-1 lg:order-2 space-y-8 text-white">
      <div className="space-y-4">
        <h1 className="text-5xl lg:text-6xl font-light tracking-wide">
          {language === "de" ? "WILLKOMMEN IM" : "WELCOME TO"} <br />SANJI&apos;S
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
      </div>
      <p className="text-gray-300 text-lg leading-relaxed">
        {language === "de" 
          ? "Tauchen Sie ein in eine Welt des exquisiten Genusses, in der Qualität auf höchstem Niveau zelebriert wird. Bei uns steht das Beste vom Besten im Mittelpunkt: von zartem Wagyu-Rindfleisch bis hin zu erstklassigem Black Angus. Unser Engagement für herausragende Qualität spiegelt sich nicht nur in unseren Gerichten wider, sondern auch in unserer Auswahl an erstklassigen Zutaten und handgefertigten Cocktails."
          : "Dive into a world of exquisite taste, where quality is celebrated at the highest level. At our restaurant, the best of the best is at the center: from tender Wagyu beef to top-quality Black Angus. Our commitment to exceptional quality is reflected not only in our dishes, but also in our selection of high-quality ingredients and handcrafted cocktails."
        }
      </p>
      <p className="text-gray-400 leading-relaxed">
        {language === "de"
          ? "Bei uns dreht sich alles um die feinsten Geschmackserlebnisse, die Sie sich vorstellen können. Mit jedem Bissen und jedem Schluck entführen wir Sie auf eine kulinarische Reise, die Ihre Sinne verzaubern wird. Unsere Leidenschaft für außergewöhnliches Essen und exzellenten Service ist in jedem Detail spürbar – von der Auswahl der Zutaten bis hin zur Präsentation auf Ihrem Teller."
          : "At our restaurant, everything revolves around the finest taste experiences you can imagine. With every bite and every sip, we transport you on a culinary journey that will enchant your senses. Our passion for exceptional food and excellent service is palpable in every detail – from the selection of ingredients to the presentation on your plate."
        }
      </p>
    </div>
  );
} 