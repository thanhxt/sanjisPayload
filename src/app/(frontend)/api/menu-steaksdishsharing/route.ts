import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishSharing } from "@/type/steaksDishSharingType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuSteaksSharing',
        });

        const steaksDishSharing = result.docs as SteaksDishSharing[];

        return NextResponse.json(steaksDishSharing);
    } catch (error) {
        console.error('Error fetching steaksDishSharing:', error);
        return NextResponse.json({ error: 'Failed to fetch steaksDishSharing' }, { status: 500 });
    }
} 