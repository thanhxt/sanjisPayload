export default function Sides() {
    return (
        <div style={{ background: '#18181b', color: '#fff', padding: '60px 0', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: 24, fontWeight: 'bold' }}>SIDES</h1>
                <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {/* Left Column */}
                    <div style={{ flex: 1, minWidth: 320 }}>
                        <div style={{ marginBottom: 24 }}>french fries 6,9</div>
                        <div style={{ marginBottom: 24 }}>truffled french fries with parmesan 9,9</div>
                        <div style={{ marginBottom: 24 }}>Bratkartoffeln mit Schalotten 8,9</div>
                        <div style={{ marginBottom: 24 }}>Wilder Brokkoli mit Knoblauch, Zwiebeln und Sesam 9,9</div>
                        <div style={{ marginBottom: 24 }}>getrüffeltes Kartoffelpüree 9,9</div>
                        <div style={{ marginBottom: 24 }}>Babyspinat Salat mit Zwiebeln &amp; Sesamdressing 8,9</div>
                    </div>
                    {/* Right Column */}
                    <div style={{ flex: 1, minWidth: 320 }}>
                        <div style={{ marginBottom: 24 }}>Beilagensalat klein / groß 6,9 / 8,9</div>
                        <div style={{ marginBottom: 24 }}>Jasmin Reis 3</div>
                        <div style={{ marginBottom: 24 }}>Hausgemachter Kimchi 5</div>
                        <div style={{ marginBottom: 24 }}>Bio Sauerteigbrot von Julius Brantner Brothandwerk 4,5</div>
                        {/* Sauces Box */}
                        <div style={{ background: '#222', color: '#fff', border: '2px solid #888', borderRadius: 6, marginTop: 40, padding: '32px 24px', maxWidth: 350 }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: 16 }}>Homemade Sauces</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>ssamjang</span><span>2</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>jus</span><span>5</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Sanji&apos;s chimichurri</span><span>4</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>truffle mayo</span><span>5</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>wasabi mayo</span><span>3</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>chilli mayo</span><span>3</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>sesame</span><span>3</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
