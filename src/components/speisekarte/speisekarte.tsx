'use client';

import React from 'react';
import { useLanguage } from '../contexts/language-context';
import Link from 'next/link';

export default function Speisekarte() {
    const { language } = useLanguage();
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
                    { label: language === "de" ? 'VORSPEISE' : 'STARTERS', color: '#888', opacity: 0.5, id: 'vorspeise' },
                    { label: language === "de" ? 'STEAKS' : 'STEAK', color: '#888', opacity: 0.5, id: 'steaks' },
                    { label: language === "de" ? 'HAUPTSPEISE' : 'MAIN COURSE', color: '#888', opacity: 0.5, id: 'hauptspeise' },
                    //{ label: 'DESSERTS', color: '#888', opacity: 0.5 },
                    { label: 'LUNCH', color: '#888', opacity: 0.5, id: 'lunch' },
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
                            <Link
                                href={`/speisekarte/${item.id}`}
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s',
                                }}
                            >
                                {item.label}
                            </Link>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
