import Image from "next/image";

export default function Steaks() {
    return (
        <div>
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '0',
                background: '#000',
            }}>
                <Image
                    src="/Sanjis_Julio-18.jpg"
                    alt="Background"
                    width={1000}
                    height={1000}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(8px) brightness(0.5)',
                        zIndex: 1,
                    }}
                />
                <h1 style={{
                    position: 'relative',
                    color: '#fff',
                    zIndex: 2,
                    fontSize: '2.5rem',
                    textAlign: 'center',
                }}>
                    STEAKS
                </h1>
            </div>
            {/* STEAKS Section Wireframe */}
            <div id="steaks" style={{ background: '#18181b', color: '#fff', padding: '60px 0', minHeight: '100vh' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                    {/* Top Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                        <div style={{ flex: 1, textAlign: 'center', borderTop: '2px solid #888', borderBottom: '2px solid #888', margin: '0 16px', padding: '24px 0' }}>
                            <div style={{ fontWeight: 'bold' }}>- Hanging Tender -</div>
                            <div>saftig, zart &amp; aromatisch<br />
                                <div style={{ fontSize: '0.95em', color: '#888' }}>
                                    juicy, tender &amp; aromatic
                                </div>
                            </div>
                            <div style={{ fontSize: '0.95em', margin: '8px 0' }}>Black Angus | Prime Beef GOP USA</div>
                            <div>250g | 48<br />400g | 75</div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', borderTop: '2px solid #888', borderBottom: '2px solid #888', margin: '0 16px', padding: '24px 0' }}>
                            <div style={{ fontWeight: 'bold' }}>- Filet -</div>
                            <div>zart &amp; mager<br />
                                <div style={{ fontSize: '0.95em', color: '#888' }}>
                                    tender &amp; lean
                                </div>
                            </div>
                            <div style={{ fontSize: '0.95em', margin: '8px 0' }}>Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>180g | 42<br />250g | 64</div>
                        </div>
                    </div>
                    {/* Middle Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                        <div style={{ flex: 1, textAlign: 'center', borderTop: '2px solid #888', borderBottom: '2px solid #888', margin: '0 16px', padding: '24px 0' }}>
                            <div style={{ fontWeight: 'bold' }}>- Flanksteak</div>
                                <div>mager, langfaserig &amp; mussig<br />
                                <div style={{ fontSize: '0.95em', color: '#888' }}>
                                    lean, long-fibrous &amp; rustic
                                </div>
                            </div>
                            <div style={{ fontSize: '0.95em', margin: '8px 0' }}>Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>250g | 44<br />400g | 69</div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', borderTop: '2px solid #888', borderBottom: '2px solid #888', margin: '0 16px', padding: '24px 0' }}>
                            <div style={{ fontWeight: 'bold' }}>- Entrecôte / Rib-Eye -</div>
                            <div>saftig, marmoriert mit Fettauge<br />
                                <div style={{ fontSize: '0.95em', color: '#888' }}>
                                    juicy, marbled, fat eye
                                </div>
                            </div>
                            <div style={{ fontSize: '0.95em', margin: '8px 0' }}>Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>300g | 58<br />500g | 82</div>
                        </div>
                    </div>
                    {/* Center SANJI&apos;S CHOICE */}
                    <div style={{ border: '2px solid #888', padding: 32, margin: '40px 0', textAlign: 'center', background: '#222' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: 12 }}>SANJI&apos;S CHOICE</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 8 }}>Wagyu A5</div>
                        <div style={{ fontSize: '1rem', marginBottom: 8 }}>Zarte und saftige Wagyu Cuts in höchster Qualität aus der<br />Provinz Miyazaki in Japan</div>
                        <div style={{ fontSize: '1rem', marginBottom: 16, color: '#888' }}>Tender and juicy Wagyu cuts of the highest quality from the<br />Miyazaki province in Japan</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, fontSize: '1rem', fontWeight: 500 }}>
                            <span>Entrecôte 45 | p. 100G</span>
                            <span>Filet 60€ | p. 100G</span>
                        </div>
                    </div>
                    {/* SHARING STEAKS */}
                    <div style={{ textAlign: 'center', margin: '40px 0' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 8 }}>SHARING STEAKS</div>
                        <div style={{ fontSize: '0.95rem', marginBottom: 4 }}>(Ca. 45–60min Zubereitungszeit)<br />
                            <div style={{ fontSize: '0.95rem', color: '#888' }}>
                                Approx. 45–60min preparation time
                            </div>
                        </div>
                        <div style={{ fontSize: '0.95rem', marginBottom: 8 }}>Am Tisch flambiert &amp; tranchiert.<br />
                            <div style={{ fontSize: '0.95rem', color: '#888' }}>
                                Flambéed &amp; carved at the table.
                            </div>
                        </div>
                    </div>
                    {/* Bottom Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                        <div style={{ flex: 1, textAlign: 'center', borderTop: '2px solid #888', borderBottom: '2px solid #888', margin: '0 16px', padding: '24px 0' }}>
                            <div style={{ fontWeight: 'bold' }}>- Porterhouse -</div>
                            <div>Kombination aus Filetsteak &amp;<br />Striploin, getrennt durch ein T-förmigen Knochen<br />
                                <div style={{ fontSize: '0.95em', color: '#888' }}>
                                    combination of tenderloin &amp; striploin, separated by a T-shaped bone
                                </div>
                            </div>
                            <div style={{ fontSize: '0.95em', margin: '8px 0' }}>Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>ca. 1000g | 179</div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', borderTop: '2px solid #888', borderBottom: '2px solid #888', margin: '0 16px', padding: '24px 0' }}>
                            <div style={{ fontWeight: 'bold' }}>- Chateaubriand -</div>
                            <div>Mittelstück vom Filet<br /> besonders zart &amp; saftig<br />
                                <div style={{ fontSize: '0.95em', color: '#888' }}>
                                    center piece of filet<br />particularly tender &amp; juicy
                                </div>
                            </div>
                            <div style={{ fontSize: '0.95em', margin: '8px 0' }}>Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>500g | 129<br />750g | 189</div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', borderTop: '2px solid #888', borderBottom: '2px solid #888', margin: '0 16px', padding: '24px 0' }}>
                            <div style={{ fontWeight: 'bold' }}>- Tomahawk -</div>
                            <div>Rib-Eye am Knochen<br />
                                <span style={{ fontSize: '0.95em', color: '#888' }}>
                                    rib-eye on the bone
                                </span>
                            </div>
                            <div style={{ fontSize: '0.95em', margin: '8px 0' }}>Black Angus | Jack&apos;s Creek, Australien</div>
                            <div>900g - 1400g | 15 pro 100G</div>
                        </div>
                    </div>
                    {/* Upgrade Note */}
                    <div style={{ textAlign: 'center', fontSize: '1rem', marginTop: 24 }}>
                        Upgrade! Surf &amp; Turf + Black Tiger Prawns 17,9
                    </div>
                </div>
            </div>
        </div>
    )
}
