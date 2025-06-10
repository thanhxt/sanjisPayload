import Image from "next/image";

export default function MainDish() {
    return (
        <>
        <div>
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mb-0 bg-black">
                <Image
                    src="/Sanjis_Julio-14.jpg"
                    alt="Background"
                    width={1000}
                    height={1000}
                    className="absolute w-full h-full object-cover blur-md brightness-50 z-10"
                />
                <h1 className="relative text-white z-20 text-4xl text-center">
                    Hauptspeise
                </h1>
            </div>
        </div>
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[1200px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-6 font-bold">MAIN DISH</h1>
                <div className="flex gap-12 flex-wrap justify-between">
                    {/* Left Column */}
                    <div className="flex-1 min-w-[350px]">
                        <div className="mb-8">
                            <span>surf &amp; turf</span> 39.9<br />
                            100g Black Angus Roastbeef |
                            Black Tiger Prawns | Saisongemüse | Jasminreis<br />
                            <span className="text-gray-500 text-sm">100g black angus striploin | black tiger prawns | seasonal vegetables | jasmine rice</span>
                        </div>
                        <div className="mb-8">
                            <span>lamb chops</span> 44.9<br />
                            Lammkottlets (Neuseeland) |
                            Wilder Brokkoli | getrüffeltes Kartoffelpüree<br />
                            <span className="text-gray-500 text-sm">lamb chops (New Zealand) | wild broccoli | truffled mashed potatoes</span>
                        </div>
                        <div className="mb-8">
                            <span>french duck red sin</span> 34.9<br />
                            medium gegrillte Barbarieentenbrust |
                            Saisongemüse | Rotwein-Hoisin Soße | Jasminreis<br />
                            <span className="text-gray-500 text-sm">medium grilled barbary duck breast | seasonal vegetables | red wine hoisin sauce | jasmine rice</span>
                        </div>
                        <div className="mb-8">
                            <span>salmon teriyaki</span> 31.9<br />
                            Lachs | Saisongemüse |
                            Teriyakisoße | Jasminreis<br />
                            <span className="text-gray-500 text-sm">salmon | seasonal vegetables | teriyaki sauce | jasmine rice</span>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="flex-1 min-w-[350px]">
                        <div className="mb-8">
                            <span>crispy angus tamarind</span> 38.9<br />
                            panierte Black Angus Filetstreifen | grüner Spargel |
                            Zuckerschoten | Zwiebeln | Tamarindensoße | Jasminreis<br />
                            <span className="text-gray-500 text-sm">crispy black angus filet strips | green asparagus | sugar snap peas | onions | tamarind sauce | jasmine rice</span>
                        </div>
                        <div className="mb-8">
                            <span>tiger prawns thai basil</span> 39.9<br />
                            gegrillte Tiger Prawns | Saisongemüse | Thai-Basilikum | Jasminreis<br />
                            <span className="text-gray-500 text-sm">grilled tiger prawns | seasonal vegetables | thai-basil | jasmine rice</span>
                        </div>
                        <div className="mb-8">
                            <span>crispy tofu curry</span> 23.9<br />
                            Tofu | Saisongemüse | rote Kokos-Curry Soße | Jasminreis<br />
                            <span className="text-gray-500 text-sm">tofu | seasonal vegetables | red coconut-curry sauce | jasmine rice</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
