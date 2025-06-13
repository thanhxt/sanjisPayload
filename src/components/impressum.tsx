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
                                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-yellow-400">https://ec.europa.eu/consumers/odr/</a>.<br />
                                Unsere E-Mail-Adresse finden Sie oben im Impressum.
                            </>
                        ) : (
                            <>
                                The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-yellow-400">https://ec.europa.eu/consumers/odr/</a>.<br />
                                Our email address can be found above in the legal notice.
                            </>
                        )}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "Verbraucherstreitbeilegung/Universalschlichtungsstelle" : "Consumer dispute resolution/Universal mediation"}</h2>
                    <div>
                        {language === "de" ? (
                            <>
                                Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil. Zuständig ist die Universalschlichtungsstelle des Zentrums für Schlichtung e.V., Straßburger Straße 8, 77694 Kehl am Rhein (<a href="https://www.verbraucher-schlichter.de" target="_blank" rel="noopener noreferrer" className="text-yellow-400">https://www.verbraucher-schlichter.de</a>).
                            </>
                        ) : (
                            <>
                                We participate in a dispute resolution procedure before a consumer mediation center. The responsible body is the Universal Mediation Center of the Center for Mediation e.V., Straßburger Straße 8, 77694 Kehl am Rhein (<a href="https://www.verbraucher-schlichter.de" target="_blank" rel="noopener noreferrer" className="text-yellow-400">https://www.verbraucher-schlichter.de</a>).
                            </>
                        )}
                    </div>
                </section>

                <div className="text-gray-400 text-sm text-center">
                    {language === "de" ? "Stand: Mai 2025" : "Last updated: May 2025"}
                </div>
            </div>
        </div>
    );
}