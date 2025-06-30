export default function Lunch() {
    return (
        <>
        <div className="bg-zinc-900 text-white py-16 min-h-screen">
            <div className="max-w-[900px] text-lg mx-auto px-4">
                <h1 className="text-center text-4xl mb-2 font-bold">LUNCH</h1>
                <div className="text-center text-gray-300 text-lg mb-8">
                    GÄNGE MENU<br />
                    <span className="text-gray-500 text-sm">COURSE MENU</span>
                </div>
                {/* Menu Courses */}
                <div className="text-center mb-10">
                    <div className="mb-8">
                        <div className="font-medium text-lg mb-1">1.</div>
                        <div className="font-medium">Chicorée</div>
                        <div className="text-gray-300 text-base">chicory</div>
                        <div className="my-2">Radicchio | Kerbel | Haselnuss | Sesam-Hollandaise</div>
                        <div className="text-gray-500 text-sm">radicchio | chervil | hazelnut | sesame hollandaise</div>
                    </div>
                    <div className="mb-8">
                        <div className="font-medium text-lg mb-1">2.</div>
                        <div className="font-medium">Onsen-Ei</div>
                        <div className="text-gray-300 text-base">onsen</div>
                        <div className="my-2">Spitzkohl | Paprika | Koriander</div>
                        <div className="text-gray-500 text-sm">pointed white cabbage | peppers | coriander</div>
                    </div>
                    <div className="flex flex-col items-center mb-8 max-w-[500px] mx-auto">
                        <div className="font-medium text-lg mb-1">3</div>
                        <div className="flex w-full justify-center items-center gap-0">
                            <div className="flex-1 min-w-[180px] text-right pr-5">
                                <div className="font-medium">Onglet</div>
                                <div className="text-gray-500 text-sm">hanging tender</div>
                                <div className="font-medium">Sellerie Creme | Kürbis | Jus</div>
                                <div className="text-gray-500 text-sm">celery cream | pumpkin | jus</div>
                            </div>
                            <div className="w-0.5 h-[60px] bg-gray-500 rounded-sm" />
                            <div className="flex-1 min-w-[180px] text-left pl-5">
                                <div className="font-medium">Kräuterwickerl (vegetarisch)</div>
                                <div className="text-gray-500 text-sm">cabbage rolls (vegetarian)</div>
                                <div className="font-medium">Sellerie Creme | Topinambur | Röstzwiebeln | Beurre Blanc</div>
                                <div className="text-gray-500 text-sm">celery cream | jerusalem artichoke | roasted onions | beurre blanc</div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="font-medium text-lg mb-1">4</div>
                        <div>Birne</div>
                        <div className="text-gray-300 text-base">pear</div>
                        <div className="my-2">Joghurt | Zitrus | Honig | Crumble</div>
                        <div className="text-gray-500 text-sm">yogurt | citrus | honey | crumble</div>
                    </div>
                </div>
                {/* Course Prices */}
                <div className="bg-zinc-800 text-white border-2 border-gray-500 rounded-md text-center py-6 max-w-[400px] mx-auto text-lg font-medium">
                    4 Gänge / courses | 60<br />
                    3 Gänge / courses (1,2,4) | 55<br />
                    2 Gänge / courses (1,4) | 39
                </div>
            </div>
        </div>
        </>
    )
}
