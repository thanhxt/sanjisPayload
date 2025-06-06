import Image from "next/image";

export default function Lunch() {
    return (
        <>
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
                    src="/Sanjis_Julio-36.jpg"
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
                    }} />
                <h1 style={{
                    position: 'relative',
                    color: '#fff',
                    zIndex: 2,
                    fontSize: '2.5rem',
                    textAlign: 'center',
                }}>
                    Mittagstisch
                </h1>
            </div>
        </div>
        <div style={{ background: '#18181b', color: '#fff', padding: '60px 0', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: 8, fontWeight: 'bold' }}>LUNCH</h1>
                    <div style={{ textAlign: 'center', color: '#ccc', fontSize: '1.1rem', marginBottom: 32 }}>
                        GÄNGE MENU<br />
                        <span style={{ color: '#888', fontSize: '0.95rem' }}>COURSE MENU</span>
                    </div>
                    {/* Menu Courses */}
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: 4 }}>1.</div>
                            <div style={{ fontWeight: 500 }}>Chicorée</div>
                            <div style={{ color: '#ccc', fontSize: '1rem' }}>chicory</div>
                            <div style={{ margin: '8px 0' }}>Radicchio | Kerbel | Haselnuss | Sesam-Hollandaise</div>
                            <div style={{ color: '#888', fontSize: '0.95rem' }}>radicchio | chervil | hazelnut | sesame hollandaise</div>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: 4 }}>2.</div>
                            <div style={{ fontWeight: 500 }}>Onsen-Ei</div>
                            <div style={{ color: '#ccc', fontSize: '1rem' }}>onsen</div>
                            <div style={{ margin: '8px 0' }}>Spitzkohl | Paprika | Koriander</div>
                            <div style={{ color: '#888', fontSize: '0.95rem' }}>pointed white cabbage | peppers | coriander</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
                            <div style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: 4 }}>3</div>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
                                <div style={{ flex: 1, minWidth: 180, textAlign: 'right', paddingRight: 20 }}>
                                    <div style={{ fontWeight: 500 }}>Onglet</div>
                                    <div style={{ color: '#888', fontSize: '0.95rem' }}>hanging tender</div>
                                    <div style={{ fontWeight: 500 }}>Sellerie Creme | Kürbis | Jus</div>
                                    <div style={{ color: '#888', fontSize: '0.95rem' }}>celery cream | pumpkin | jus</div>
                                </div>
                                <div style={{ width: 2, height: 60, background: '#888', borderRadius: 1 }} />
                                <div style={{ flex: 1, minWidth: 180, textAlign: 'left', paddingLeft: 20 }}>
                                    <div style={{ fontWeight: 500 }}>Kräuterwickerl (vegetarisch)</div>
                                    <div style={{ color: '#888', fontSize: '0.95rem' }}>cabbage rolls (vegetarian)</div>
                                    <div style={{ fontWeight: 500 }}>Sellerie Creme | Topinambur | Röstzwiebeln | Beurre Blanc</div>
                                    <div style={{ color: '#888', fontSize: '0.95rem' }}>celery cream | jerusalem artichoke | roasted onions | beurre blanc</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ fontWeight: 500, fontSize: '1.1rem', marginBottom: 4 }}>4</div>
                            <div>Birne</div>
                            <div style={{ color: '#ccc', fontSize: '1rem' }}>pear</div>
                            <div style={{ margin: '8px 0' }}>Joghurt | Zitrus | Honig | Crumble</div>
                            <div style={{ color: '#888', fontSize: '0.95rem' }}>yogurt | citrus | honey | crumble</div>
                        </div>
                    </div>
                    {/* Course Prices */}
                    <div style={{ background: '#222', color: '#fff', border: '2px solid #888', borderRadius: 6, textAlign: 'center', padding: '24px 0', maxWidth: 400, margin: '0 auto', fontSize: '1.1rem', fontWeight: 500 }}>
                        4 Gänge / courses | 60<br />
                        3 Gänge / courses (1,2,4) | 55<br />
                        2 Gänge / courses (1,4) | 39
                    </div>
                </div>
            </div>
        </>
    )
}
