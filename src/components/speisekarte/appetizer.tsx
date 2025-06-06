import Image from "next/image";

export default function Appetizer() {
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
                    src="/Sanjis_Julio-27.jpg"
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
                    Vorspeise
                </h1>
            </div>
        </div>
        <div style={{ background: '#18181b', color: '#fff', padding: '60px 0', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: 24, fontWeight: 'bold' }}>APPETIZER</h1>
                <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {/* Left Column */}
                    <div style={{ flex: 1, minWidth: 350 }}>
                        <div style={{ marginBottom: 32 }}>
                            <span>Spicy Salmon</span> 10.9<br />
                            Lachs würfel | Chilli-Mayo | Sesam | Koriander | Zwiebeln | Reis-Nori Cracker<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>salmon cubes | chilli mayo | sesame | coriander | onions | rice-nori crackers</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>Flamed Yellowfin Tuna Tataki</span> 10.9<br />
                            flambierter Gelbschwanzthunfisch | Kimchi | Wasabi Mayo | Teriyaki | Sesam<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>flambéed yellowfin tuna | kimchi | wasabi mayo | teriyaki | sesame</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>Truffled Wagyu Carpaccio</span> 24.9<br />
                            hauchdünne Wagyu scheiben | Trüffel-Mayo | Rucola | Parmesan | Saisontrüffel<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>thin wagyu slices | truffle-mayo | rocket | parmesan | seasonal truffle</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>Crispy Chilli Prawns</span> 19.9<br />
                            panierte Black Tiger Garnelen | Chilli-Mayo | Chilliflocken<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>crispy black tiger prawns | chilli mayo | chilli flakes</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>Wagyu Beef La Lot</span> 14.9<br />
                            Wildbetelblätter | Wagyu hack | Erdnüsse | Röstzwiebeln | Fischsauce<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>wild betel leaves | minced wagyu | peanuts | fried onions | fish sauce</span>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div style={{ flex: 1, minWidth: 350 }}>
                        <div style={{ marginBottom: 32 }}>
                            <span>Green Mango Duck Salad</span> 10.9<br />
                            medium gegrillte Barbarieentenbrust | Koriander | Thai-Basilikum | Zwiebeln | Erdnüsse<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>medium grilled barbary duck breast | coriander | thai basil | onions | peanuts</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>Soft Shell Crabs</span> 10.9<br />
                            Butterkrebs | Frühlingszwiebeln | Pfeffer<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>soft shell crabs | spring onions | pepper</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>Edamame</span> 8.9<br />
                            japanische Sojabohnen | Sesam | Maldonsalz<br />
                            <span style={{ color: '#888', fontSize: '0.95rem' }}>japanese soybeans | sesame | maldon salt</span>
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <span>Pléiade Poget No 3 Oyster</span> 3p / 18  6p / 36<br />
                        </div>
                        {/* Sauces Box */}
                        <div style={{ background: '#222', color: '#fff', border: '2px solid #888', borderRadius: 6, marginTop: 40, padding: '32px 24px', maxWidth: 350 }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: 16 }}>Classic Starter Sharing
                            <span style={{ color: '#888', fontSize: '0.95rem', display: 'block', marginTop: 4 }}>startet ab 2 Personen – 25 P.P. • starts at 2 persons – 25 p.p.</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Wagyu Beef La Lot</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>French Mango Salat</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Lachs Tatar</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Yellowfin Tuna Tataki</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
