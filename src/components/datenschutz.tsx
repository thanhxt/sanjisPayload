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
                        {language === "de" ? "Wir hosten die Inhalte unserer Website bei folgendem Anbieter:" : "We host the content of our website with the following provider:"}
                    </p>
                    <p className="mt-2 font-bold">
                        {language === "de" ? "IONOS SE" : "IONOS SE"}
                    </p>
                    <p className="mt-2">
                        {language === "de" ? "Der Anbieter ist ein externer Dienstleister. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Anbieters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln." : "The provider is an external service provider. The personal data collected on this website is stored on the provider's servers. This may include, in particular, IP addresses, contact requests, meta and communication data, contract data, contact details, names, website accesses and other data generated via a website."}
                    </p>
                    <p className="mt-3">
                        {language === "de" ? "Das Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO)." : "Hosting takes place for the purpose of fulfilling the contract with our potential and existing customers (Art. 6 Para. 1 lit. b GDPR) and in the interest of a secure, fast and efficient provision of our online offer by a professional provider (Art. 6 Para. 1 lit. f GDPR)."}
                    </p>

                    <h3 className="text-lg font-bold mb-2 mt-4">{language === "de" ? "Auftragsverarbeitung" : "Data Processing Agreement"}</h3>
                    <p>
                        {language === "de" ? "Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit dem oben genannten Anbieter geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet." : "We have concluded a data processing agreement (DPA) with the above-mentioned provider. This is a contract required by data protection law, which ensures that the provider processes the personal data of our website visitors only in accordance with our instructions and in compliance with the GDPR."}
                    </p>

                    <h3 className="text-lg font-bold mb-2 mt-4">{language === "de" ? "Technische Logfiles & Consent-Datenbank" : "Technical Logfiles & Consent Database"}</h3>
                    <p>
                        {language === "de" ? "Auf dem Server werden automatisch technische Logfiles angelegt (z.B. IP-Adresse, Browser, Uhrzeit). Zusätzlich speichern wir auf dem Server eine Datenbank mit Ihren Cookie-Einwilligungsentscheidungen (siehe Abschnitt 5). Die dort gespeicherten IP-Adressen werden mittels SHA-256-Hashing anonymisiert." : "Technical log files are automatically created on the server (e.g. IP address, browser, time). In addition, we store a database with your cookie consent decisions on the server (see Section 5). The IP addresses stored there are anonymized using SHA-256 hashing."}
                    </p>
                </section>

                {/* 5. Cookies */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "5. Cookies und Cookie-Einwilligung" : "5. Cookies and Cookie Consent"}</h2>

                    <h3 className="text-lg font-bold mb-2">{language === "de" ? "Was sind Cookies?" : "What are Cookies?"}</h3>
                    <p>
                        {language === "de" ? "Unsere Internetseiten verwenden so genannte \"Cookies\". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt." : "Our websites use so-called \"cookies\". Cookies are small data packages and do not harm your device. They are either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) stored on your device. Session cookies are automatically deleted after the end of your visit. Permanent cookies remain on your device until you delete them yourself or an automatic deletion by your web browser takes place."}
                    </p>
                    <p className="mt-3">
                        {language === "de" ? "Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen)." : "Cookies can come from us (First-Party-Cookies) or from third parties (so-called Third-Party-Cookies). Third-Party-Cookies enable the integration of certain services of third parties within websites (e.g. cookies for the processing of payment services)."}
                    </p>

                    <h3 className="text-lg font-bold mb-2 mt-4">{language === "de" ? "Cookie-Einwilligungsbanner" : "Cookie Consent Banner"}</h3>
                    <p>
                        {language === "de" ? "Beim ersten Besuch unserer Website erscheint ein Cookie-Banner, mit dem Sie Ihre Einwilligung zur Nutzung von Cookies erteilen können. Wir unterscheiden dabei zwischen folgenden Cookie-Kategorien:" : "When you first visit our website, a cookie banner appears where you can give your consent to the use of cookies. We distinguish between the following cookie categories:"}
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li><strong>{language === "de" ? "Notwendige Cookies" : "Necessary Cookies"}</strong>: {language === "de" ? "Diese Cookies sind für den technischen Betrieb der Website unerlässlich und können nicht deaktiviert werden. Sie speichern z.B. Ihre Cookie-Einwilligungsentscheidung." : "These cookies are essential for the technical operation of the website and cannot be deactivated. They store, for example, your cookie consent decision."}</li>
                        <li><strong>{language === "de" ? "Funktionale Cookies" : "Functional Cookies"}</strong>: {language === "de" ? "Diese Cookies ermöglichen erweiterte Funktionen wie interaktive Karten (Google Maps) oder Reservierungssysteme (OpenTable). Sie können diese Cookies ablehnen, jedoch könnten dadurch einige Funktionen eingeschränkt sein." : "These cookies enable advanced features such as interactive maps (Google Maps) or reservation systems (OpenTable). You can reject these cookies, but some features may be limited as a result."}</li>
                    </ul>
                    <p className="mt-3">
                        {language === "de" ? "Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie den Cookie-Banner erneut über den Link im Footer aufrufen oder Ihre Browser-Einstellungen anpassen." : "You can change your cookie settings at any time by calling up the cookie banner again via the link in the footer or by adjusting your browser settings."}
                    </p>

                    <h3 className="text-lg font-bold mb-2 mt-4">{language === "de" ? "Protokollierung Ihrer Entscheidung (Consent-Log)" : "Logging Your Decision (Consent Log)"}</h3>
                    <p>
                        {language === "de" ? "Zum Zweck der Nachweisbarkeit der von Ihnen getroffenen Entscheidung und zur Erfüllung unserer gesetzlichen Dokumentationspflichten (Art. 7 Abs. 1 DSGVO) speichern wir folgende Daten in einer Datenbank auf unserem Server:" : "For the purpose of documenting your decision and fulfilling our legal documentation obligations (Art. 7 Para. 1 GDPR), we store the following data in a database on our server:"}
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li>{language === "de" ? "Eine anonyme ID (Consent-ID), die Ihrem Browser zugeordnet ist" : "An anonymous ID (Consent-ID) that is assigned to your browser"}</li>
                        <li>{language === "de" ? "Den Zeitstempel der Einwilligung" : "The timestamp of consent"}</li>
                        <li>{language === "de" ? "Informationen zu Ihrem Browser (User-Agent)" : "Information about your browser (User-Agent)"}</li>
                        <li>{language === "de" ? "Ihre gewählten Einstellungen (welche Kategorien akzeptiert wurden)" : "Your selected settings (which categories were accepted)"}</li>
                        <li>{language === "de" ? "Ihre IP-Adresse in anonymisierter Form (SHA-256 Hash, nicht rückführbar)" : "Your IP address in anonymized form (SHA-256 hash, not traceable)"}</li>
                        <li>{language === "de" ? "Die Version der Datenschutzerklärung, die bei der Einwilligung gültig war" : "The version of the privacy policy that was valid at the time of consent"}</li>
                    </ul>
                    <p className="mt-3">
                        {language === "de" ? "Diese Daten werden nicht an Dritte weitergegeben und dienen ausschließlich dem Nachweis Ihrer Einwilligung. Die Löschung erfolgt automatisch nach 12 Monaten oder wenn die Nachweispflicht entfällt. Rechtsgrundlage für diese Verarbeitung ist Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung) in Verbindung mit Art. 7 Abs. 1 DSGVO." : "This data is not shared with third parties and is used exclusively to document your consent. Deletion takes place automatically after 12 months or when the documentation obligation lapses. The legal basis for this processing is Art. 6 Para. 1 lit. c GDPR (legal obligation) in conjunction with Art. 7 Para. 1 GDPR."}
                    </p>
                    <p className="mt-3">
                        {language === "de" ? "Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung." : "You can revoke your consent at any time with effect for the future. The revocation does not affect the lawfulness of the processing carried out until then."}
                    </p>
                </section>

                {/* 6. Webanalyse (Umami) */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "6. Webanalyse (Umami)" : "6. Web Analytics (Umami)"}</h2>
                    <p>
                        {language === "de" ? "Diese Website verwendet Umami, einen Open-Source-Webanalysedienst. Umami verwendet keine Cookies und speichert keine personenbezogenen Daten. Die IP-Adressen der Besucher werden anonymisiert verarbeitet." : "This website uses Umami, an open-source web analytics service. Umami does not use cookies and does not store personal data. Visitors' IP addresses are processed anonymously."}
                    </p>
                    <p className="mt-3">
                        {language === "de" ? "Die Nutzung von Umami erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der anonymisierten Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren." : "The use of Umami is based on Art. 6 Para. 1 lit. f GDPR. The website operator has a legitimate interest in the anonymous analysis of user behavior in order to optimize both its website and its advertising."}
                    </p>
                    <p className="mt-3">
                        {language === "de" ? "Da Umami auf unseren eigenen Servern gehostet wird, werden keine Daten an Dritte (z. B. Google Analytics) weitergegeben." : "Since Umami is hosted on our own servers, no data is passed on to third parties (e.g. Google Analytics)."}
                    </p>
                </section>

                {/* 7. Drittanbieter-Tools & Plugins */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "7. Drittanbieter-Tools & Plugins" : "7. Third-Party Tools & Plugins"}</h2>
                    <p>
                        {language === "de" ? "Unsere Website nutzt Inhalte von Drittanbietern:" : "Our website uses content from third parties:"}
                    </p>
                    <ul className="list-disc pl-5 mt-2.5">
                        <li><strong>OpenTable</strong>: {language === "de" ? "Zur Tischreservierung. Dabei können Daten wie IP-Adresse, Browserinformationen und Reservierungsdaten an OpenTable übermittelt werden." : "For table reservations. Data such as IP address, browser information, and reservation data can be transmitted to OpenTable."}</li>
                        <li><strong>Google Maps</strong>: {language === "de" ? "Zum Anzeigen von Lageplänen. Es kann eine Verbindung zu Google-Servern hergestellt werden. Dabei wird Ihre IP-Adresse übertragen." : "For displaying location plans. A connection to Google servers can be established. Your IP address is transmitted in this case."}</li>
                        <li><strong>CAPTCHA-Dienst</strong>: {language === "de" ? "Zum Schutz vor Spam im Kontaktformular. Der Dienst verarbeitet technische Informationen zur Verifikation." : "For protection against spam in the contact form. The service processes technical information for verification."}</li>
                    </ul>
                </section>

                {/* 8. Links zu externen Diensten */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "8. Links zu externen Diensten" : "8. Links to External Services"}</h2>
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

                {/* 9. Ihre Rechte */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "9. Ihre Rechte" : "9. Your Rights"}</h2>
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

                {/* 10. SSL- bzw. TLS-Verschlüsselung */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">{language === "de" ? "10. SSL- bzw. TLS-Verschlüsselung" : "10. SSL- or TLS-Encryption"}</h2>
                    <p>
                        {language === "de" ? "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von \"http://\" auf \"https://\" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile." : "This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content. A secure connection is recognized by the change of the browser address from \"http://\" to \"https://\" and the lock symbol in your browser address bar."}
                    </p>
                </section>
            </div>
        </div>
    );
}
