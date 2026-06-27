import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { SideDish } from "@/type/sidedishType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuSideDish',
            limit: 100,
        });

        const sides = result.docs as SideDish[];
        sides.sort((a, b) => (a.position || 0) - (b.position || 0));

        return NextResponse.json(sides);
    } catch (error) {
        console.error('[MENU:SIDEDISH] ❌ Error:', error);
        return NextResponse.json({ error: 'Failed to fetch side dishes' }, { status: 500 });
    }
}
