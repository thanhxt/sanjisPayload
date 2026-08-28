'use client';

import React, { useState } from 'react';
import { useLanguage } from '../contexts/language-context';
import AppetizerClient from './vorspeise/appetizerClient';
import MainDishClient from './hauptspeise/maindishClient';
import SteaksClient from './steaks/steaksClient';
import Lunch from './lunch';
import { MenuAppetizerDish } from '@/type/appetizerDishType';
import { MainDish } from '@/type/mainDishType';
import { SteaksDish } from '@/type/steaksDishType';
import { SteaksDishChoice } from '@/type/steaksDishChoiceType';
import { SteaksDishSharing } from '@/type/steaksDishSharingType';

// The menu endpoints answer errors with a JSON body ({ error }), not an array.
// Without the ok/array check that object lands in state and the child's .map() throws,
// which blanks the whole section instead of just leaving it empty.
const fetchMenu = async <T,>(url: string): Promise<T[]> => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`${url} responded ${res.status}`);
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
        throw new Error(`${url} did not return an array`);
    }
    return data as T[];
};

// Create a wrapper component for async data fetching
const AccordionContent = ({ sectionId, isActive }: { sectionId: string, isActive: boolean }) => {
    const [appetizerItems, setAppetizerItems] = useState<MenuAppetizerDish[]>([]);
    const [mainDishItems, setMainDishItems] = useState<MainDish[]>([]);
    const [steaksDishItems, setSteaksDishItems] = useState<SteaksDish[]>([]);
    const [steaksDishChoiceItems, setSteaksDishChoiceItems] = useState<SteaksDishChoice[]>([]);
    const [steaksDishSharingItems, setSteaksDishSharingItems] = useState<SteaksDishSharing[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        if (isActive && (sectionId === 'vorspeise' || sectionId === 'hauptspeise' || sectionId === 'steaks')) {
            setIsLoading(true);

            if (sectionId === 'vorspeise' && appetizerItems.length === 0) {
                fetchMenu<MenuAppetizerDish>('/api/menu-appetizer')
                    .then(items => setAppetizerItems(items))
                    .catch(error => console.error('Error fetching appetizer items:', error))
                    .finally(() => setIsLoading(false));
            } else if (sectionId === 'hauptspeise' && mainDishItems.length === 0) {
                fetchMenu<MainDish>('/api/menu-maindish')
                    .then(items => setMainDishItems(items))
                    .catch(error => console.error('Error fetching main dish items:', error))
                    .finally(() => setIsLoading(false));
            } else if (sectionId === 'steaks' && steaksDishItems.length === 0) {
                // All three drive one section, so only clear the spinner once they settle.
                Promise.allSettled([
                    fetchMenu<SteaksDish>('/api/menu-steaksdish')
                        .then(items => setSteaksDishItems(items)),
                    fetchMenu<SteaksDishChoice>('/api/menu-steaksdishchoice')
                        .then(items => setSteaksDishChoiceItems(items)),
                    fetchMenu<SteaksDishSharing>('/api/menu-steaksdishsharing')
                        .then(items => setSteaksDishSharingItems(items)),
                ])
                    .then(results => {
                        for (const result of results) {
                            if (result.status === 'rejected') {
                                console.error('Error fetching steaks items:', result.reason);
                            }
                        }
                    })
                    .finally(() => setIsLoading(false));
            } else {
                setIsLoading(false);
            }
        }
    }, [isActive, sectionId, appetizerItems.length, mainDishItems.length, steaksDishItems.length, steaksDishChoiceItems.length]);

    if (!isActive) return null;

    if (isLoading) {
        return (
            <div className="bg-black text-white py-10 flex justify-center">
                <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
            </div>
        );
    }

    switch (sectionId) {
        case 'vorspeise':
            return <AppetizerClient menuItems={appetizerItems} />;
        case 'hauptspeise':
            return <MainDishClient menuItems={mainDishItems} />;
        case 'steaks':
            return <SteaksClient steaksItems={steaksDishItems} 
            steakChoiceItems={steaksDishChoiceItems} 
            steakSharingItems={steaksDishSharingItems} />;
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
        // { label: 'LUNCH', color: '#888', opacity: 0.5, id: 'lunch' },
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
                        position: relative;
                        transition: color 0.3s, opacity 0.3s, letter-spacing 0.3s, background 0.3s;
                        cursor: pointer;
                    }
                    /* Widen tracking instead of font-size to avoid reflowing the page on hover */
                    .menu-section:hover {
                        color: #fff !important;
                        opacity: 1 !important;
                        letter-spacing: 0.14em !important;
                    }
                    .menu-section.active {
                        color: #fff !important;
                        opacity: 1 !important;
                        background: #222 !important;
                    }
                    .menu-underline {
                        position: absolute;
                        bottom: 40px;
                        left: 50%;
                        height: 1px;
                        width: 0;
                        transform: translateX(-50%);
                        background: #facc15;
                        transition: width 0.5s ease;
                    }
                    .menu-section:hover .menu-underline {
                        width: 96px;
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
                            <span className="menu-underline" />
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
