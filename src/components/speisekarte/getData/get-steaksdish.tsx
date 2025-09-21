import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDish } from "@/type/steaksdishType";

export const revalidate = 60;

export default async function getSteaksDish() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuSteaksDish',
    })

    const steaksDish = result.docs as SteaksDish[];
    steaksDish.sort((a, b) => (a.position || 0) - (b.position || 0));
    

    return steaksDish;
}