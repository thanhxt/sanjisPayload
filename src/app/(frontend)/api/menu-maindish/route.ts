import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";
import { MainDish } from "@/type/mainDishType";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const result = await payload.find({
            collection: 'menuMainDish',
        });

        const mainDish = result.docs as MainDish[];
        mainDish.sort((a, b) => (a.position || 0) - (b.position || 0));

        return NextResponse.json(mainDish);
    } catch (error) {
        console.error('Error fetching main dishes:', error);
        return NextResponse.json({ error: 'Failed to fetch main dishes' }, { status: 500 });
    }
} 