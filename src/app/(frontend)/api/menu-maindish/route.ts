import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { MainDish } from "@/type/mainDishType";

// Menu data changes rarely; cache the response and bust via /api/revalidate.
export const revalidate = 3600;

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuMainDish',
            sort: 'position',
            limit: 100,
        });

        return NextResponse.json(result.docs as MainDish[]);
    } catch (error) {
        console.error('[MENU:MAINDISH] ❌ Error:', error);
        return NextResponse.json({ error: 'Failed to fetch main dishes' }, { status: 500 });
    }
}
