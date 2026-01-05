'use client';
import { useLanguage } from "./contexts/language-context";

export default function Widerrufsbelehrung() {
    const { language } = useLanguage();
    return (
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[900px] mx-auto px-4">
                <h1 className="text-center text-4xl mb-8 font-bold">
                    {language === "de" ? "Widerrufsbelehrung" : "Cancellation Policy"}
                </h1>

                <section className="mb-8">
                    <div className="space-y-6">
                        {language === "de" ? (
                            <>
                                <div>
                                    <p className="mb-4">
                                        Verbraucher haben ein vierzehntägiges Widerrufsrecht.
                                    </p>
                                    
                                    <h3 className="font-bold mb-2">Widerrufsrecht</h3>
                                    <p className="mb-2">Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
                                    <p className="mb-2">Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses (bei Dienstleistungen oder digitalen Inhalten, die nicht auf einem körperlichen Datenträger geliefert werden) oder ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
                                    <p className="mb-2">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Sanji&apos;s, Kellerstraße 32, 81667 München, E-Mail: info@sanjiskitchen.de, Telefon: 089 37505678) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.</p>
                                    <p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold mb-2">Folgen des Widerrufs</h3>
                                    <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>
                                    <p className="mt-2">Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">Muster-Widerrufsformular</h3>
                                    <p className="italic mb-2">(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
                                    <div className="pl-4 border-l-2 border-zinc-700 space-y-2">
                                        <p>An Sanji&apos;s, Kellerstraße 32, 81667 München, E-Mail: info@sanjiskitchen.de:</p>
                                        <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)</p>
                                        <p>Bestellt am (*)/erhalten am (*)</p>
                                        <p>Name des/der Verbraucher(s)</p>
                                        <p>Anschrift des/der Verbraucher(s)</p>
                                        <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
                                        <p>Datum</p>
                                        <p className="text-sm">(*) Unzutreffendes streichen.</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p className="mb-4">
                                        Consumers have a fourteen-day right of withdrawal.
                                    </p>

                                    <h3 className="font-bold mb-2">Right of withdrawal</h3>
                                    <p className="mb-2">You have the right to withdraw from this contract within fourteen days without giving any reason.</p>
                                    <p className="mb-2">The withdrawal period is fourteen days from the day of the conclusion of the contract (in case of service contracts or digital content not supplied on a tangible medium) or from the day on which you or a third party named by you, who is not the carrier, have taken possession of the goods.</p>
                                    <p className="mb-2">To exercise your right of withdrawal, you must inform us (Sanji&apos;s, Kellerstraße 32, 81667 München, Germany, E-Mail: info@sanjiskitchen.de, Phone: +49 89 37505678) by means of a clear declaration (e.g. a letter sent by post or an e-mail) of your decision to withdraw from this contract. You may use the attached model withdrawal form for this purpose, but it is not mandatory.</p>
                                    <p>To meet the withdrawal deadline, it is sufficient for you to send your notification of exercising your right of withdrawal before the withdrawal period has expired.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">Consequences of withdrawal</h3>
                                    <p>If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of delivery (with the exception of the supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract. We will carry out such reimbursement using the same means of payment as you used for the initial transaction, unless you have expressly agreed otherwise; in any event, you will not incur any fees as a result of such reimbursement.</p>
                                    <p className="mt-2">If you requested to begin the performance of services during the withdrawal period, you shall pay us an amount which is in proportion to what has been provided until you have communicated us your withdrawal from this contract, in comparison with the full coverage of the contract.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">Model withdrawal form</h3>
                                    <p className="italic mb-2">(If you wish to withdraw from the contract, please complete this form and return it.)</p>
                                    <div className="pl-4 border-l-2 border-zinc-700 space-y-2">
                                        <p>To Sanji&apos;s, Kellerstraße 32, 81667 München, Germany, E-Mail: info@sanjiskitchen.de:</p>
                                        <p>I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale of the following goods (*)/for the provision of the following service (*) </p>
                                        <p>Ordered on (*)/received on (*)</p>
                                        <p>Name of consumer(s)</p>
                                        <p>Address of consumer(s)</p>
                                        <p>Signature of consumer(s) (only if this form is notified on paper)</p>
                                        <p>Date</p>
                                        <p className="text-sm">(*) Delete as appropriate.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}