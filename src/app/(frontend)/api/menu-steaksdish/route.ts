import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDish } from "@/type/steaksdishType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuSteaksDish',
        });

        const steaks = result.docs as SteaksDish[];
        steaks.sort((a, b) => (a.position || 0) - (b.position || 0));

        return NextResponse.json(steaks);
    } catch (error) {
        console.error('Error fetching steaks:', error);
        return NextResponse.json({ error: 'Failed to fetch steaks' }, { status: 500 });
    }
} 