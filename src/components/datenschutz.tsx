import Link from "next/link";

export default function Datenschutz() {
    return (
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[900px] mx-auto px-4">
                <h1 className="text-center text-4xl font-bold mb-8">
                    Datenschutzerklärung
                </h1>

                {/* 1. Datenschutz auf einen Blick */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">1. Datenschutz auf einen Blick</h2>
                    <h3 className="text-lg font-bold mb-2">Allgemeine Hinweise</h3>
                    <p>
                        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                    </p>
                </section>

                {/* 2. Datenerfassung auf dieser Website */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">2. Datenerfassung auf dieser Website</h2>
                    <h3 className="text-lg font-bold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                    <p>
                        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt &quot;Hinweis zur Verantwortlichen Stelle&quot; in dieser Datenschutzerklärung entnehmen.
                    </p>
                    <h3 className="text-lg font-bold mb-2 mt-4">Wie erfassen wir Ihre Daten?</h3>
                    <p>
                        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                    </p>
                </section>

                {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h2>
                    <h3 className="text-lg font-bold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                    <p>
                        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                        <br /><br />
                        <strong>Sanji&apos;s</strong><br />
                        Duong Phan Hai <br />
                        Kellerstraße 32<br />
                        81667 München<br />
                        E-Mail: <Link href="mailto:info@sanjiskitchen.de" className="text-yellow-400">info@sanjiskitchen.de</Link><br />
                        Tel: <Link href="tel:+498937505678" className="text-yellow-400">+49 89 37505678</Link>
                    </p>
                </section>
                
                {/* 4. Hosting */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">4. Hosting</h2>
                    <p>
                        Wir hosten sämtliche Inhalte unserer Website auf einem von uns gemieteten Virtual Private Server (VPS). 
                        Dabei überlassen wir die Serverinfrastruktur keinem externen Shared-Hosting-Anbieter; alle Daten verbleiben ausschließlich 
                        auf unserem VPS.
                    </p>
                    <p>
                        Auf diesem VPS werden automatisch technische Logfiles angelegt, sobald Sie unsere Website besuchen. Folgende Informationen werden protokolliert:
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li>Browsertyp und Browserversion</li>
                        <li>Verwendetes Betriebssystem</li>
                        <li>Referrer-URL (die zuvor besuchte Seite)</li>
                        <li>Hostname des zugreifenden Rechners</li>
                        <li>Uhrzeit der Serveranfrage</li>
                        <li>IP-Adresse</li>
                    </ul>
                    <p>
                        Eine Zusammenführung dieser Logdaten mit anderen Datenquellen findet nicht statt. Die Speicherung dient ausschließlich 
                        dem Zweck der technischen Absicherung, Fehleranalyse und Optimierung des Betriebs unserer Website. Rechtsgrundlage ist 
                        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer stabilen, sicheren Bereitstellung).
                    </p>
                    <p>
                        Da alle Daten ausschließlich auf unserem VPS verbleiben, erfolgt keine Weitergabe an Dritte, 
                        soweit nicht eine gesetzliche Verpflichtung (z. B. behördliche Anforderung) hierzu besteht. Der Zugriff auf den 
                        Server ist auf autorisierte Administratoren beschränkt.
                    </p>
                </section>

                {/* 5. Cookies */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">5. Cookies</h2>
                    <p>
                        Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
                    </p>
                    <p>
                        Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
                    </p>
                </section>

                {/* 6. Drittanbieter-Tools & Plugins */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">6. Drittanbieter-Tools & Plugins</h2>
                    <p>
                        Unsere Website nutzt Inhalte von Drittanbietern:
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li><strong>OpenTable</strong>: Zur Tischreservierung. Dabei können Daten wie IP-Adresse, Browserinformationen und Reservierungsdaten an OpenTable übermittelt werden.</li>
                        <li><strong>Google Maps</strong>: Zum Anzeigen von Lageplänen. Es kann eine Verbindung zu Google-Servern hergestellt werden. Dabei wird Ihre IP-Adresse übertragen.</li>
                        <li><strong>CAPTCHA-Dienst</strong>: Zum Schutz vor Spam im Kontaktformular. Der Dienst verarbeitet technische Informationen zur Verifikation.</li>
                    </ul>
                </section>

                {/* 7. Links zu externen Diensten */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">7. Links zu externen Diensten</h2>
                    <p>
                        Unsere Website enthält Verweise (Links) zu externen Anbietern, z. B.:
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li><strong>Google Maps</strong>: Ein Klick öffnet Google Maps in einem neuen Tab. Google verarbeitet dabei ggf. Ihre IP-Adresse und setzt Cookies.</li>
                        <li><strong>Instagram</strong>: Unsere Social-Media-Icons verlinken auf unser Instagram-Profil. Wenn Sie dem Link folgen, werden Daten an Instagram übermittelt und dort Cookies gesetzt. Datenschutzhinweis: <a href="https://help.instagram.com/519522125107875" className="text-yellow-400" target="_blank" rel="noopener noreferrer">help.instagram.com/519522125107875</a></li>
                        <li><strong>E-Mail</strong>: Ein Klick auf <code>mailto:info@sanjiskitchen.de</code> öffnet Ihr E-Mail-Programm. Dabei wird lediglich die Adresse übertragen – keine Cookies von uns.</li>
                        <li><strong>Telefon</strong>: Ein Klick auf <code>tel:+498937505678</code> startet den Anruf über Ihr Gerät. Es werden keine Cookies gesetzt.</li>
                    </ul>
                    <p className="mt-3">
                        Sobald Sie einen externen Link öffnen, gelten für die dortigen Angebote die Datenschutzbestimmungen des jeweiligen Anbieters. 
                        Wir haben keinen Einfluss auf Art und Umfang der dortigen Datenverarbeitung.
                    </p>
                </section>

                {/* 8. Ihre Rechte */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">8. Ihre Rechte</h2>
                    <p>
                        Sie haben jederzeit das Recht auf:
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li>Auskunft über Ihre gespeicherten personenbezogenen Daten</li>
                        <li>Berichtigung oder Löschung Ihrer personenbezogenen Daten</li>
                        <li>Einschränkung der Verarbeitung Ihrer personenbezogenen Daten</li>
                        <li>Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten</li>
                        <li>Datenübertragbarkeit</li>
                        <li>Widerruf Ihrer Einwilligung zur Datenverarbeitung</li>
                        <li>Beschwerde bei der zuständigen Aufsichtsbehörde</li>
                    </ul>
                </section>

                {/* 9. SSL- bzw. TLS-Verschlüsselung */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">9. SSL- bzw. TLS-Verschlüsselung</h2>
                    <p>
                        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. 
                        Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                    </p>
                </section>

                <div className="text-gray-400 text-sm text-center">
                    Stand: Mai 2025
                </div>
            </div>
        </div>
    );
}
