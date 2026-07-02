"use client"
import { useLanguage } from "../contexts/language-context";
import { useEffect, useState } from "react";
import { SideDish } from "@/type/sidedishType";

const defaultSides: SideDish[] = [
    { id: '1', position: 1, titleDE: 'french fries', titleEN: 'french fries', price: '6,9', category: 'side', createdAt: '', updatedAt: '' },
    { id: '2', position: 2, titleDE: 'truffled french fries with parmesan', titleEN: 'truffled french fries with parmesan', price: '9,9', category: 'side', createdAt: '', updatedAt: '' },
    { id: '3', position: 3, titleDE: 'Bratkartoffeln mit Schalotten', titleEN: 'fried potatoes with shallots', price: '9,9', category: 'side', createdAt: '', updatedAt: '' },
    { id: '4', position: 4, titleDE: 'wildes Brokkoli mit Knoblauch, Zwiebeln und Sesam', titleEN: 'wild broccoli with garlic, onions and sesame', price: '9,9', category: 'side', createdAt: '', updatedAt: '' },
    { id: '5', position: 5, titleDE: 'getrüffeltes Kartoffelpüree', titleEN: 'truffled mashed potato', price: '9,9', category: 'side', createdAt: '', updatedAt: '' },
    { id: '6', position: 6, titleDE: 'Babyspinat Salat mit Zwiebeln & Sesamdressing', titleEN: 'baby spinach salad with onions & sesame dressing', price: '8,9', category: 'side', createdAt: '', updatedAt: '' },
    { id: '7', position: 7, titleDE: 'Beilagensalat klein / groß', titleEN: 'side salad small / large', price: '6,9 / 8,9', category: 'side', createdAt: '', updatedAt: '' },
    { id: '8', position: 8, titleDE: 'Jasmin Reis', titleEN: 'Jasmine rice', price: '3', category: 'side', createdAt: '', updatedAt: '' },
    { id: '9', position: 9, titleDE: 'hausgemachter Kimchi', titleEN: 'homemade kimchi', price: '5', category: 'side', createdAt: '', updatedAt: '' },
    { id: '10', position: 10, titleDE: 'Bio Sauerteigbrot von Julius Brantner Brothandwerk', titleEN: 'organic sourdough bread from Julius Brantner Brothandwerk', price: '4,5', category: 'side', createdAt: '', updatedAt: '' },
    { id: '11', position: 11, titleDE: 'ssamjang', titleEN: 'ssamjang', price: '2', category: 'sauce', createdAt: '', updatedAt: '' },
    { id: '12', position: 12, titleDE: 'Sanji\'s chimichurri', titleEN: 'Sanji\'s chimichurri', price: '4', category: 'sauce', createdAt: '', updatedAt: '' },
    { id: '13', position: 13, titleDE: 'truffle mayo', titleEN: 'truffle mayo', price: '5', category: 'sauce', createdAt: '', updatedAt: '' },
    { id: '14', position: 14, titleDE: 'wasabi mayo', titleEN: 'wasabi mayo', price: '3', category: 'sauce', createdAt: '', updatedAt: '' },
    { id: '15', position: 15, titleDE: 'chilli mayo', titleEN: 'chilli mayo', price: '3', category: 'sauce', createdAt: '', updatedAt: '' },
    { id: '16', position: 16, titleDE: 'sesame', titleEN: 'sesame', price: '3', category: 'sauce', createdAt: '', updatedAt: '' }
];

export default function Sides() {
    const { language } = useLanguage();
    const [items, setItems] = useState<SideDish[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/menu-sidedish')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching side dishes:", err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="bg-black text-white py-16 text-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    const activeItems = items.length > 0 ? items : defaultSides;
    const sidesList = activeItems.filter(item => item.category === 'side');
    const saucesList = activeItems.filter(item => item.category === 'sauce');

    const midIndex = Math.ceil(sidesList.length / 2);
    const leftColumnSides = sidesList.slice(0, midIndex);
    const rightColumnSides = sidesList.slice(midIndex);

    return (
        <div className="bg-black text-white py-16 min-h-screen">
            <div className="max-w-[1100px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-6 font-bold">SIDES</h1>
                <div className="flex gap-12 flex-wrap justify-between">
                    {/* Left Column */}
                    <div className="flex-1 min-w-[320px]">
                        {leftColumnSides.map((item) => (
                            <div key={item.id} className="mb-6">
                                {language === "de" ? item.titleDE : (item.titleEN || item.titleDE)} {item.price}
                            </div>
                        ))}
                    </div>
                    {/* Right Column */}
                    <div className="flex-1 min-w-[320px]">
                        {rightColumnSides.map((item) => (
                            <div key={item.id} className="mb-6">
                                {language === "de" ? item.titleDE : (item.titleEN || item.titleDE)} {item.price}
                            </div>
                        ))}
                        {/* Sauces Box */}
                        <div className="bg-zinc-800 text-white border-2 border-gray-600 rounded-lg mt-10 p-8 max-w-[350px]">
                            <div className="font-bold text-xl mb-4">Homemade Sauces</div>
                            {saucesList.map((item) => (
                                <div key={item.id} className="flex justify-between mb-2">
                                    <span>{language === "de" ? item.titleDE : (item.titleEN || item.titleDE)}</span>
                                    <span>{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
