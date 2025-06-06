export default function Impressum() {
    return (
        <div style={{ background: '#18181b', color: '#fff', padding: '60px 0', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: 32, fontWeight: 'bold' }}>
                    Impressum
                </h1>

                <section style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: 12 }}>Angaben gemäß § 5 TMG</h2>
                    <div>Sanji&apos;s</div>
                    <div>Kellerstraße 32</div>
                    <div>81667 München</div>
                    <div style={{ marginTop: 8, fontWeight: 'bold' }}>Vertreten durch:</div>
                    <div>Duong Phan Hai</div>
                </section>

                <section style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: 12 }}>Kontakt</h2>
                    <div>Telefon: 089 37505678</div>
                    <div>E-Mail: <a href="mailto:info@sanjiskitchen.de" style={{ color: '#facc15' }}>info@sanjiskitchen.de</a></div>
                </section>

                <section style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: 12 }}>Umsatzsteuer-ID</h2>
                    <div>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: 146/132/93354</div>
                </section>

                <section style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: 12 }}>EU-Streitschlichtung <span role="img" aria-label="link">🔗</span></h2>
                    <div>
                        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: '#facc15' }}>https://ec.europa.eu/consumers/odr/</a>.<br />
                        Unsere E-Mail-Adresse finden Sie oben im Impressum.
                    </div>
                </section>

                <section style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: 12 }}>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
                    <div>
                        Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil. Zuständig ist die Universalschlichtungsstelle des Zentrums für Schlichtung e.V., Straßburger Straße 8, 77694 Kehl am Rhein (<a href="https://www.verbraucher-schlichter.de" target="_blank" rel="noopener noreferrer" style={{ color: '#facc15' }}>https://www.verbraucher-schlichter.de</a>).
                    </div>
                </section>

                <div style={{ color: '#888', fontSize: '0.95rem', textAlign: 'center' }}>
                    Stand: Mai 2025
                </div>
            </div>
        </div>
    );
}