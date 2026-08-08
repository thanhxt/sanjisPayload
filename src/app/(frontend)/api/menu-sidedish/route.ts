import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { SideDish } from "@/type/sidedishType";

// Menu data changes rarely; cache the response and bust via /api/revalidate.
export const revalidate = 3600;

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuSideDish',
            sort: 'position',
            limit: 100,
        });

        return NextResponse.json(result.docs as SideDish[]);
    } catch (error) {
        console.error('[MENU:SIDEDISH] ❌ Error:', error);
        return NextResponse.json({ error: 'Failed to fetch side dishes' }, { status: 500 });
    }
}
