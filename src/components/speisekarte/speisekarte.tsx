'use client';

import React, { useState } from 'react';
import { useLanguage } from '../contexts/language-context';
import AppetizerClient from './vorspeise/appetizerClient';
import MainDishClient from './hauptspeise/maindishClient';
import Steaks from './steaks';
import Lunch from './lunch';
import { MenuAppetizerDish } from '@/type/appetizerDishType';
import { MainDish } from '@/type/mainDishType';

// Create a wrapper component for async data fetching
const AccordionContent = ({ sectionId, isActive }: { sectionId: string, isActive: boolean }) => {
    const [appetizerItems, setAppetizerItems] = useState<MenuAppetizerDish[]>([]);
    const [mainDishItems, setMainDishItems] = useState<MainDish[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        if (isActive && (sectionId === 'vorspeise' || sectionId === 'hauptspeise')) {
            setIsLoading(true);
            
            if (sectionId === 'vorspeise' && appetizerItems.length === 0) {
                fetch('/api/menu-appetizer')
                    .then(res => res.json())
                    .then(items => {
                        setAppetizerItems(items);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching appetizer items:', error);
                        setIsLoading(false);
                    });
            } else if (sectionId === 'hauptspeise' && mainDishItems.length === 0) {
                fetch('/api/menu-maindish')
                    .then(res => res.json())
                    .then(items => {
                        setMainDishItems(items);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching main dish items:', error);
                        setIsLoading(false);
                    });
            } else {
                setIsLoading(false);
            }
        }
    }, [isActive, sectionId, appetizerItems.length, mainDishItems.length]);

    if (!isActive) return null;

    if (isLoading) {
        return (
            <div className="bg-black text-white py-8 text-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    switch (sectionId) {
        case 'vorspeise':
            return <AppetizerClient menuItems={appetizerItems} />;
        case 'hauptspeise':
            return <MainDishClient menuItems={mainDishItems} />;
        case 'steaks':
            return <Steaks />;
        case 'lunch':
            return <Lunch />;
        default:
            return null;
    }
};

export default function Speisekarte() {
    const { language } = useLanguage();
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const menuItems = [
        { label: language === "de" ? 'VORSPEISE' : 'STARTERS', color: '#888', opacity: 0.5, id: 'vorspeise' },
        { label: language === "de" ? 'STEAKS' : 'STEAK', color: '#888', opacity: 0.5, id: 'steaks' },
        { label: language === "de" ? 'HAUPTSPEISE' : 'MAIN COURSE', color: '#888', opacity: 0.5, id: 'hauptspeise' },
        { label: 'LUNCH', color: '#888', opacity: 0.5, id: 'lunch' },
    ];

    const handleMenuClick = (itemId: string) => {
        if (activeSection === itemId) {
            setActiveSection(null); // Close if already open
        } else {
            setActiveSection(itemId); // Open this section
        }
    };

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
                    .menu-section.active {
                        color: #fff !important;
                        opacity: 1 !important;
                        background: #222 !important;
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
                    {language === "de" ? "UNSERE SPEISEKARTE" : "OUR MENU"}
                </div>
                {menuItems.map((item) => (
                    <React.Fragment key={item.label}>
                        <div
                            className={`menu-section ${activeSection === item.id ? 'active' : ''}`}
                            style={{
                                borderBottom: '1px solid #333',
                                textAlign: 'center',
                                fontWeight: 'normal',
                                fontSize: '5vw',
                                padding: '60px 0',
                                background: activeSection === item.id ? '#222' : '#111',
                                color: activeSection === item.id ? '#fff' : item.color,
                                opacity: activeSection === item.id ? 1 : item.opacity,
                                letterSpacing: '0.06em',
                            }}
                            onClick={() => handleMenuClick(item.id)}
                        >
                            {item.label}
                        </div>
                        {/* Accordion Content */}
                        <AccordionContent 
                            sectionId={item.id} 
                            isActive={activeSection === item.id} 
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
