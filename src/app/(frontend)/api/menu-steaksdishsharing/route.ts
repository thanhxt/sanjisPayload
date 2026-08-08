import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishSharing } from "@/type/steaksDishSharingType";

// Menu data changes rarely; cache the response and bust via /api/revalidate.
export const revalidate = 3600;

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuSteaksSharing',
        });

        const steaksDishSharing = result.docs as SteaksDishSharing[];

        return NextResponse.json(steaksDishSharing);
    } catch (error) {
        console.error('[MENU:STEAKS:SHARING] ❌ Error:', error);
        return NextResponse.json({ error: 'Failed to fetch steaksDishSharing' }, { status: 500 });
    }
} 