import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDish } from "@/type/steaksDishType";

export default async function getSteaksDish() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuSteaksDish',
        limit: 0, // 0 = no limit; Payload defaults to 10 and would silently truncate the menu
    })

    const steaksDish = result.docs as SteaksDish[];
    steaksDish.sort((a, b) => (a.position || 0) - (b.position || 0));
    

    return steaksDish;
}