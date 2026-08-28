import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishSharing } from "@/type/steaksDishSharingType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuSteaksSharing',
            limit: 0, // 0 = no limit; Payload defaults to 10 and would silently truncate the menu
        });

        const steaksDishSharing = result.docs as SteaksDishSharing[];

        return NextResponse.json(steaksDishSharing);
    } catch (error) {
        console.error('[MENU:STEAKS:SHARING] ❌ Error:', error);
        return NextResponse.json({ error: 'Failed to fetch steaksDishSharing' }, { status: 500 });
    }
} 