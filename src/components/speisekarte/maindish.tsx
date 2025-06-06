import Image from "next/image";

export default function MainDish() {
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
                    src="/Sanjis_Julio-14.jpg"
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
                    Hauptspeise
                </h1>
            </div>
        </div>
         <div style={{ background: '#18181b', color: '#fff', padding: '60px 0', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: 24, fontWeight: 'bold' }}>MAIN DISH</h1>
                <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {/* Left Column */}
                    <div style={{ flex: 1, minWidth: 350 }}>
                        <div style={{ marginBottom: 32 }}>
                            <span>surf &amp; turf</span> 39.9<br />
                            100g Black Angus Roastbeef |
                            Black Tiger Prawns | Saisongemüse | Jasminreis<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>100g black angus striploin | black tiger prawns | seasonal vegetables | jasmine rice</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>lamb chops</span> 44.9<br />
                            Lammkottlets (Neuseeland) |
                            Wilder Brokkoli | getrüffeltes Kartoffelpüree<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>lamb chops (New Zealand) | wild broccoli | truffled mashed potatoes</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>french duck red sin</span> 34.9<br />
                            medium gegrillte Barbarieentenbrust |
                            Saisongemüse | Rotwein-Hoisin Soße | Jasminreis<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>medium grilled barbary duck breast | seasonal vegetables | red wine hoisin sauce | jasmine rice</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>salmon teriyaki</span> 31.9<br />
                            Lachs | Saisongemüse |
                            Teriyakisoße | Jasminreis<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>salmon | seasonal vegetables | teriyaki sauce | jasmine rice</span>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div style={{ flex: 1, minWidth: 350 }}>
                        <div style={{ marginBottom: 32 }}>
                            <span>crispy angus tamarind</span> 38.9<br />
                            panierte Black Angus Filetstreifen | grüner Spargel |
                            Zuckerschoten | Zwiebeln | Tamarindensoße | Jasminreis<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>crispy black angus filet strips | green asparagus | sugar snap peas | onions | tamarind sauce | jasmine rice</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>tiger prawns thai basil</span> 39.9<br />
                            gegrillte Tiger Prawns | Saisongemüse | Thai-Basilikum | Jasminreis<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>grilled tiger prawns | seasonal vegetables | thai-basil | jasmine rice</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>crispy tofu curry</span> 23.9<br />
                            Tofu | Saisongemüse | rote Kokos-Curry Soße | Jasminreis<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>tofu | seasonal vegetables | red coconut-curry sauce | jasmine rice</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
