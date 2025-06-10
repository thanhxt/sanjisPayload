export default function Sides() {
    return (
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[1100px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-6 font-bold">SIDES</h1>
                <div className="flex gap-12 flex-wrap justify-between">
                    {/* Left Column */}
                    <div className="flex-1 min-w-[320px]">
                        <div className="mb-6">french fries 6,9</div>
                        <div className="mb-6">truffled french fries with parmesan 9,9</div>
                        <div className="mb-6">Bratkartoffeln mit Schalotten 8,9</div>
                        <div className="mb-6">Wilder Brokkoli mit Knoblauch, Zwiebeln und Sesam 9,9</div>
                        <div className="mb-6">getrüffeltes Kartoffelpüree 9,9</div>
                        <div className="mb-6">Babyspinat Salat mit Zwiebeln &amp; Sesamdressing 8,9</div>
                    </div>
                    {/* Right Column */}
                    <div className="flex-1 min-w-[320px]">
                        <div className="mb-6">Beilagensalat klein / groß 6,9 / 8,9</div>
                        <div className="mb-6">Jasmin Reis 3</div>
                        <div className="mb-6">Hausgemachter Kimchi 5</div>
                        <div className="mb-6">Bio Sauerteigbrot von Julius Brantner Brothandwerk 4,5</div>
                        {/* Sauces Box */}
                        <div className="bg-zinc-800 text-white border-2 border-gray-600 rounded-lg mt-10 p-8 max-w-[350px]">
                            <div className="font-bold text-xl mb-4">Homemade Sauces</div>
                            <div className="flex justify-between mb-2"><span>ssamjang</span><span>2</span></div>
                            <div className="flex justify-between mb-2"><span>jus</span><span>5</span></div>
                            <div className="flex justify-between mb-2"><span>Sanji&apos;s chimichurri</span><span>4</span></div>
                            <div className="flex justify-between mb-2"><span>truffle mayo</span><span>5</span></div>
                            <div className="flex justify-between mb-2"><span>wasabi mayo</span><span>3</span></div>
                            <div className="flex justify-between mb-2"><span>chilli mayo</span><span>3</span></div>
                            <div className="flex justify-between"><span>sesame</span><span>3</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
