'use client';
import { useLanguage } from "./contexts/language-context";

export default function Impressum() {
    const { language } = useLanguage();
    return (
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[900px] mx-auto px-4">
                <h1 className="text-center text-4xl mb-8 font-bold">
                    {language === "de" ? "Impressum" : "Legal Notice"}
                </h1>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "Angaben gemäß § 5 TMG" : "Information according to § 5 TMG"}</h2>
                    <div>{language === "de" ? "Sanji's" : "Sanji's"}</div>
                    <div>{language === "de" ? "Kellerstraße 32" : "Kellerstraße 32"}</div>
                    <div>{language === "de" ? "81667 München" : "81667 München"}</div>
                    <div className="mt-2 font-bold">{language === "de" ? "Vertreten durch:" : "Represented by:"}</div>
                    <div>{language === "de" ? "Duong Phan Hai" : "Duong Phan Hai"}</div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "Kontakt" : "Contact"}</h2>
                    <div>{language === "de" ? "Telefon: 089 37505678" : "Phone: +49 89 37505678"}</div>
                    <div>{language === "de" ? "E-Mail: info@sanjiskitchen.de" : "E-Mail: info@sanjiskitchen.de"}</div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "Umsatzsteuer-ID" : "VAT ID"}</h2>
                    <div>{language === "de" ? "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: 146/132/93354" : "VAT identification number according to § 27 a Umsatzsteuergesetz: 146/132/93354"}</div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "EU-Streitschlichtung" : "EU Mediation"} <span role="img" aria-label="link">🔗</span></h2>
                    <div>
                        {language === "de" ? (
                            <>
                                Wir sind nicht bereit oder verpflichtet, an Streitbeteilugungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                            </>
                        ) : (
                            <>
                                We are not prepared or obliged to participate in dispute resolution proceedings before a consumer mediation center.
                            </>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}