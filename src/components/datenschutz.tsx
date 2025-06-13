'use client';

import Link from "next/link";
import { useLanguage } from "./contexts/language-context";

export default function Datenschutz() {
    const { language } = useLanguage();
    return (
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[900px] mx-auto px-4">
                <h1 className="text-center text-4xl font-bold mb-8">
                    {language === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
                </h1>

                {/* 1. Datenschutz auf einen Blick */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "1. Datenschutz auf einen Blick" : "1. Privacy Policy Overview"}</h2>
                    <h3 className="text-lg font-bold mb-2">{language === "de" ? "Allgemeine Hinweise" : "General Information"}</h3>
                    <p>
                        {language === "de" ? "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung." : "The following notes provide a simple overview of what happens with your personal data when you visit this website. Personal data is all data that can be used to identify you personally. Detailed information on the subject of data protection can be found in our data protection declaration listed under this text."}
                    </p>
                </section>

                {/* 2. Datenerfassung auf dieser Website */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "2. Datenerfassung auf dieser Website" : "2. Data Collection on this Website"}</h2>
                    <h3 className="text-lg font-bold mb-2">{language === "de" ? "Wer ist verantwortlich für die Datenerfassung auf dieser Website?" : "Who is responsible for the data collection on this website?"}</h3>
                    <p>
                        {language === "de" ? "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt &quot;Hinweis zur Verantwortlichen Stelle&quot; in dieser Datenschutzerklärung entnehmen." : "The data processing on this website is carried out by the website operator. You can find the contact details in the section &quot;Notice on the Responsible Party&quot; in this privacy policy."}
                    </p>
                    <h3 className="text-lg font-bold mb-2 mt-4">{language === "de" ? "Wie erfassen wir Ihre Daten?" : "How do we collect your data?"}</h3>
                    <p>
                        {language === "de" ? "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten." : "Your data is collected in part by you providing it to us. This can, for example, involve data that you enter into a contact form. Other data is collected automatically or upon visiting the website with our IT systems, such as technical data (e.g. internet browser, operating system or time of page access). The collection of this data takes place automatically as soon as you visit this website."}
                    </p>
                </section>

                {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "3. Allgemeine Hinweise und Pflichtinformationen" : "3. General Information and Mandatory Information"}</h2>
                    <h3 className="text-lg font-bold mb-2">{language === "de" ? "Hinweis zur verantwortlichen Stelle" : "Notice on the Responsible Party"}</h3>
                    <p>
                        {language === "de" ? "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:" : "The responsible party for the data processing on this website is:"}
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
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "4. Hosting" : "4. Hosting"}</h2>
                    <p>
                        {language === "de" ? "Wir hosten sämtliche Inhalte unserer Website auf einem von uns gemieteten Virtual Private Server (VPS). Dabei überlassen wir die Serverinfrastruktur keinem externen Shared-Hosting-Anbieter; alle Daten verbleiben ausschließlich auf unserem VPS." : "We host all the content of our website on a rented Virtual Private Server (VPS). We do not lease the server infrastructure to any external shared hosting provider; all data remains exclusively on our VPS."}
                    </p>
                    <p>
                        {language === "de" ? "Auf diesem VPS werden automatisch technische Logfiles angelegt, sobald Sie unsere Website besuchen. Folgende Informationen werden protokolliert:" : "On this VPS, technical log files are automatically created as soon as you visit our website. The following information is recorded:"}
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li>{language === "de" ? "Browsertyp und Browserversion" : "Browser type and version"}</li>
                        <li>{language === "de" ? "Verwendetes Betriebssystem" : "Used operating system"}</li>
                        <li>{language === "de" ? "Referrer-URL (die zuvor besuchte Seite)" : "Referrer URL (the previously visited page)"}</li>
                        <li>{language === "de" ? "Hostname des zugreifenden Rechners" : "Hostname of the accessing computer"}</li>
                        <li>{language === "de" ? "Uhrzeit der Serveranfrage" : "Time of server request"}</li>
                        <li>{language === "de" ? "IP-Adresse" : "IP address"}</li>
                    </ul>
                    <p>
                        {language === "de" ? "Eine Zusammenführung dieser Logdaten mit anderen Datenquellen findet nicht statt. Die Speicherung dient ausschließlich dem Zweck der technischen Absicherung, Fehleranalyse und Optimierung des Betriebs unserer Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer stabilen, sicheren Bereitstellung)." : "A merging of these log data with other data sources does not take place. The storage serves exclusively the purpose of technical security, error analysis, and optimization of the operation of our website. Legal basis is Art. 6 Abs. 1 lit. f DSGVO (legitimate interest in a stable, secure provision)."}
                    </p>
                    <p>
                        {language === "de" ? "Da alle Daten ausschließlich auf unserem VPS verbleiben, erfolgt keine Weitergabe an Dritte, soweit nicht eine gesetzliche Verpflichtung (z. B. behördliche Anforderung) hierzu besteht. Der Zugriff auf den Server ist auf autorisierte Administratoren beschränkt." : "Since all data remains exclusively on our VPS, no transfer to third parties takes place, unless there is a legal obligation (e.g. legal requirement) to do so. Access to the server is restricted to authorized administrators."}
                    </p>
                </section>

                {/* 5. Cookies */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "5. Cookies" : "5. Cookies"}</h2>
                    <p>
                        {language === "de" ? "Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt." : "Our websites use so-called &quot;cookies&quot;. Cookies are small data packages and do not harm your device. They are either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) stored on your device. Session cookies are automatically deleted after the end of your visit. Permanent cookies remain on your device until you delete them yourself or an automatic deletion by your web browser takes place."}
                    </p>
                    <p>
                        {language === "de" ? "Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen)." : "Cookies can come from us (First-Party-Cookies) or from third parties (so-called Third-Party-Cookies). Third-Party-Cookies enable the integration of certain services of third parties within websites (e.g. cookies for the processing of payment services)."}
                    </p>
                </section>

                {/* 6. Drittanbieter-Tools & Plugins */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "6. Drittanbieter-Tools & Plugins" : "6. Third-Party Tools & Plugins"}</h2>
                    <p>
                        {language === "de" ? "Unsere Website nutzt Inhalte von Drittanbietern:" : "Our website uses content from third parties:"}
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li><strong>OpenTable</strong>: {language === "de" ? "Zur Tischreservierung. Dabei können Daten wie IP-Adresse, Browserinformationen und Reservierungsdaten an OpenTable übermittelt werden." : "For table reservations. Data such as IP address, browser information, and reservation data can be transmitted to OpenTable."}</li>
                        <li><strong>Google Maps</strong>: {language === "de" ? "Zum Anzeigen von Lageplänen. Es kann eine Verbindung zu Google-Servern hergestellt werden. Dabei wird Ihre IP-Adresse übertragen." : "For displaying location plans. A connection to Google servers can be established. Your IP address is transmitted in this case."}</li>
                        <li><strong>CAPTCHA-Dienst</strong>: {language === "de" ? "Zum Schutz vor Spam im Kontaktformular. Der Dienst verarbeitet technische Informationen zur Verifikation." : "For protection against spam in the contact form. The service processes technical information for verification."}</li>
                    </ul>
                </section>

                {/* 7. Links zu externen Diensten */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "7. Links zu externen Diensten" : "7. Links to External Services"}</h2>
                    <p>
                        {language === "de" ? "Unsere Website enthält Verweise (Links) zu externen Anbietern, z. B." : "Our website contains links (links) to external providers, e.g."}
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li><strong>Google Maps</strong>: {language === "de" ? "Ein Klick öffnet Google Maps in einem neuen Tab. Google verarbeitet dabei ggf. Ihre IP-Adresse und setzt Cookies." : "A click opens Google Maps in a new tab. Google may process your IP address and set cookies in this case."}</li>
                        <li><strong>Instagram</strong>: {language === "de" ? "Unsere Social-Media-Icons verlinken auf unser Instagram-Profil. Wenn Sie dem Link folgen, werden Daten an Instagram übermittelt und dort Cookies gesetzt. Datenschutzhinweis:" : "Our social media icons link to our Instagram profile. When you follow the link, data is transmitted to Instagram and cookies are set there. Privacy notice:"} <a href="https://help.instagram.com/519522125107875" className="text-yellow-400" target="_blank" rel="noopener noreferrer">help.instagram.com/519522125107875</a></li>
                        <li><strong>E-Mail</strong>: {language === "de" ? "Ein Klick auf" : "A click on"} <code>mailto:info@sanjiskitchen.de</code> {language === "de" ? "öffnet Ihr E-Mail-Programm. Dabei wird lediglich die Adresse übertragen – keine Cookies von uns." : "opens your email program. Only the address is transmitted - no cookies from us."}</li>
                        <li><strong>Telefon</strong>: {language === "de" ? "Ein Klick auf" : "A click on"} <code>tel:+498937505678</code> {language === "de" ? "startet den Anruf über Ihr Gerät. Es werden keine Cookies gesetzt." : "starts the call via your device. No cookies are set."}</li>
                    </ul>
                    <p className="mt-3">
                        Sobald Sie einen externen Link öffnen, gelten für die dortigen Angebote die Datenschutzbestimmungen des jeweiligen Anbieters. 
                        Wir haben keinen Einfluss auf Art und Umfang der dortigen Datenverarbeitung.
                    </p>
                </section>

                {/* 8. Ihre Rechte */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "8. Ihre Rechte" : "8. Your Rights"}</h2>
                    <p>
                        {language === "de" ? "Sie haben jederzeit das Recht auf:" : "You have the right at any time to:"}
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li>{language === "de" ? "Auskunft über Ihre gespeicherten personenbezogenen Daten" : "Information about your stored personal data"}</li>
                        <li>{language === "de" ? "Berichtigung oder Löschung Ihrer personenbezogenen Daten" : "Correction or deletion of your personal data"}</li>
                        <li>{language === "de" ? "Einschränkung der Verarbeitung Ihrer personenbezogenen Daten" : "Restriction of processing of your personal data"}</li>
                        <li>{language === "de" ? "Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten" : "Opposition to the processing of your personal data"}</li>
                        <li>{language === "de" ? "Datenübertragbarkeit" : "Data portability"}</li>
                        <li>{language === "de" ? "Widerruf Ihrer Einwilligung zur Datenverarbeitung" : "Revocation of your consent to data processing"}</li>
                        <li>{language === "de" ? "Beschwerde bei der zuständigen Aufsichtsbehörde" : "Complaint to the competent supervisory authority"}</li>
                    </ul>
                </section>

                {/* 9. SSL- bzw. TLS-Verschlüsselung */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "9. SSL- bzw. TLS-Verschlüsselung" : "9. SSL- or TLS-Encryption"}</h2>
                    <p>
                        {language === "de" ? "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von \"http://\" auf \"https://\" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile." : "This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content. A secure connection is recognized by the change of the browser address from \"http://\" to \"https://\" and the lock symbol in your browser address bar."}
                    </p>
                </section>

                <div className="text-gray-400 text-sm text-center">
                    {language === "de" ? "Stand: Mai 2025" : "Last updated: May 2025"}
                </div>
            </div>
        </div>
    );
}
