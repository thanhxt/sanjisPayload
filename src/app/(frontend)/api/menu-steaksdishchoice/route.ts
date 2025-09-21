import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishChoice } from "@/type/steaksDishChoiceType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuSanjisChoice',
        });

        const steaksDishChoice = result.docs as SteaksDishChoice[];

        return NextResponse.json(steaksDishChoice);
    } catch (error) {
        console.error('Error fetching steaksDishChoice:', error);
        return NextResponse.json({ error: 'Failed to fetch steaksDishChoice' }, { status: 500 });
    }
} 