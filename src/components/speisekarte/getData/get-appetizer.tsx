import { getPayload } from "payload";
import config from "@payload-config";
import { MenuAppetizerDish } from "@/type/appetizerDishType";

export default async function getAppetizerDish() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuAppetizerDish',
        limit: 0, // 0 = no limit; Payload defaults to 10 and would silently truncate the menu
    })

    const appetizerDish = result.docs as MenuAppetizerDish[];
    appetizerDish.sort((a, b) => (a.position || 0) - (b.position || 0));
    
    return appetizerDish;
}