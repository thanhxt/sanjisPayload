import React from 'react';
export default function Speisekarte() {
    return (
        <div>
            {/* Menu Section */}
            <div style={{ background: '#111', padding: 0, margin: 0 }}>
                <style>{`
                    .menu-section {
                        transition: color 0.3s, opacity 0.3s, font-size 0.3s;
                        cursor: pointer;
                    }
                    .menu-section:hover {
                        color: #fff !important;
                        opacity: 1 !important;
                        font-size: 5.5vw !important;
                    }
                `}</style>
                <div style={{
                    borderTop: '1px solid #333',
                    borderBottom: '1px solid #333',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    padding: '24px 0 40px 0',
                    color: '#fff',
                }}>
                    UNSERE SPEISEKARTE
                </div>
                {[
                    { label: 'VORSPEISE', color: '#888', opacity: 0.5 },
                    { label: 'STEAKS', color: '#888', opacity: 0.5 },
                    { label: 'HAUPTSPEISE', color: '#888', opacity: 0.5 },
                    //{ label: 'DESSERTS', color: '#888', opacity: 0.5 },
                    { label: 'LUNCH', color: '#888', opacity: 0.5 },
                ].map((item) => (
                    <React.Fragment key={item.label}>
                        <div
                            className="menu-section"
                            style={{
                                borderBottom: '1px solid #333',
                                textAlign: 'center',
                                fontWeight: 'normal',
                                fontSize: '5vw',
                                padding: '60px 0',
                                background: '#111',
                                color: item.color,
                                opacity: item.opacity,
                                letterSpacing: '0.06em',
                            }}
                        >
                            <a
                                href={`/speisekarte/${item.label.toLowerCase()}`}
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s',
                                }}
                            >
                                {item.label}
                            </a>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
