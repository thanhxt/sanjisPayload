import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { openingTimes } from "@/type/openingType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'Oeffnungzeiten',
            limit: 1,
        });

        if (result.docs.length === 0) {
            return NextResponse.json(null);
        }

        const times = result.docs[0] as openingTimes;
        return NextResponse.json(times);
    } catch (error) {
        console.error('[OPENINGTIMES] ❌ Error:', error);
        return NextResponse.json({ error: 'Failed to fetch opening times' }, { status: 500 });
    }
}
