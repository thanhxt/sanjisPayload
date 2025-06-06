'use client'

import { useState } from "react";

export default function SteakSectionStripe({ sections }: { sections: { id: string, label: string }[] }) {
    
    const [active, setActive] = useState('steaks-section');

    // Listen to scroll to highlight the active section
    if (typeof window !== 'undefined') {
        window.onscroll = () => {
            const offsets = sections.map(s => ({
                id: s.id,
                offset: document.getElementById(s.id)?.getBoundingClientRect().top || 9999
            }));
            const visible = offsets.find(s => s.offset > -200 && s.offset < window.innerHeight / 2);
            if (visible && visible.id !== active) setActive(visible.id);
        };
    }

    const handleSectionClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Vertical Stripes Navigation */}
            <div style={{ position: 'relative' }}>
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    right: 32,
                    transform: 'translateY(-50%)',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                    alignItems: 'center',
                }}>
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            onClick={() => handleSectionClick(section.id)}
                            style={{
                                width: 48,
                                height: 12,
                                borderRadius: 8,
                                background: active === section.id ? '#fff' : '#888',
                                opacity: active === section.id ? 1 : 0.6,
                                cursor: 'pointer',
                                border: active === section.id ? '2px solid #222' : '2px solid #222',
                                transition: 'background 0.2s, opacity 0.2s',
                                boxShadow: active === section.id ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
                            }}
                            title={section.label}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}