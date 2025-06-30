import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { MenuAppetizerDish } from "@/type/appetizerDishType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuAppetizerDish',
        });

        const appetizerDish = result.docs as MenuAppetizerDish[];
        appetizerDish.sort((a, b) => (a.position || 0) - (b.position || 0));
        
        return NextResponse.json(appetizerDish);
    } catch (error) {
        console.error('Error fetching appetizer dishes:', error);
        return NextResponse.json({ error: 'Failed to fetch appetizer dishes' }, { status: 500 });
    }
} 