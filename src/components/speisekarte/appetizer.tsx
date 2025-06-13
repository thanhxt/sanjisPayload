import Image from "next/image";
import HeroText from "../hero-text";

export default function Appetizer() {
    return (
        <>
        <div>
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                <Image
                    src="/Sanjis_Julio-27.jpg"
                    alt="Background"
                    width={1000}
                    height={1000}
                    className="absolute w-full h-full object-cover blur-md brightness-50 z-10"
                />
                <HeroText title="Vorspeise" titleEn="Appetizer" />
            </div>
        </div>
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[1200px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-6 font-bold">APPETIZER</h1>
                <div className="flex gap-12 flex-wrap justify-between">
                    {/* Left Column */}
                    <div className="flex-1 min-w-[350px]">
                        <div className="mb-8">
                            <span>Spicy Salmon</span> 10.9<br />
                            Lachs würfel | Chilli-Mayo | Sesam | Koriander | Zwiebeln | Reis-Nori Cracker<br />
                            <span className="text-gray-500 text-sm">salmon cubes | chilli mayo | sesame | coriander | onions | rice-nori crackers</span>
                        </div>
                        <div className="mb-8">
                            <span>Flamed Yellowfin Tuna Tataki</span> 10.9<br />
                            flambierter Gelbschwanzthunfisch | Kimchi | Wasabi Mayo | Teriyaki | Sesam<br />
                            <span className="text-gray-500 text-sm">flambéed yellowfin tuna | kimchi | wasabi mayo | teriyaki | sesame</span>
                        </div>
                        <div className="mb-8">
                            <span>Truffled Wagyu Carpaccio</span> 24.9<br />
                            hauchdünne Wagyu scheiben | Trüffel-Mayo | Rucola | Parmesan | Saisontrüffel<br />
                            <span className="text-gray-500 text-sm">thin wagyu slices | truffle-mayo | rocket | parmesan | seasonal truffle</span>
                        </div>
                        <div className="mb-8">
                            <span>Crispy Chilli Prawns</span> 19.9<br />
                            panierte Black Tiger Garnelen | Chilli-Mayo | Chilliflocken<br />
                            <span className="text-gray-500 text-sm">crispy black tiger prawns | chilli mayo | chilli flakes</span>
                        </div>
                        <div className="mb-8">
                            <span>Wagyu Beef La Lot</span> 14.9<br />
                            Wildbetelblätter | Wagyu hack | Erdnüsse | Röstzwiebeln | Fischsauce<br />
                            <span className="text-gray-500 text-sm">wild betel leaves | minced wagyu | peanuts | fried onions | fish sauce</span>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="flex-1 min-w-[350px]">
                        <div className="mb-8">
                            <span>Green Mango Duck Salad</span> 10.9<br />
                            medium gegrillte Barbarieentenbrust | Koriander | Thai-Basilikum | Zwiebeln | Erdnüsse<br />
                            <span className="text-gray-500 text-sm">medium grilled barbary duck breast | coriander | thai basil | onions | peanuts</span>
                        </div>
                        <div className="mb-8">
                            <span>Soft Shell Crabs</span> 10.9<br />
                            Butterkrebs | Frühlingszwiebeln | Pfeffer<br />
                            <span className="text-gray-500 text-sm">soft shell crabs | spring onions | pepper</span>
                        </div>
                        <div className="mb-8">
                            <span>Edamame</span> 8.9<br />
                            japanische Sojabohnen | Sesam | Maldonsalz<br />
                            <span className="text-gray-500 text-sm">japanese soybeans | sesame | maldon salt</span>
                        </div>
                        <div className="mb-8">
                            <span>Pléiade Poget No 3 Oyster</span> 3p / 18  6p / 36<br />
                        </div>
                        {/* Sauces Box */}
                        <div className="bg-zinc-800 text-white border-2 border-gray-500 rounded-md mt-10 p-8 max-w-[350px]">
                            <div className="font-bold text-xl mb-4">Classic Starter Sharing
                                <span className="text-gray-500 text-sm block mt-1">startet ab 2 Personen – 25 P.P. • starts at 2 persons – 25 p.p.</span>
                            </div>
                            <div className="flex justify-between mb-2"><span>Wagyu Beef La Lot</span></div>
                            <div className="flex justify-between mb-2"><span>French Mango Salat</span></div>
                            <div className="flex justify-between mb-2"><span>Lachs Tatar</span></div>
                            <div className="flex justify-between mb-2"><span>Yellowfin Tuna Tataki</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
