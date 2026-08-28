import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishChoice } from "@/type/steaksDishChoiceType";

export default async function getSteaksDishChoice() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuSanjisChoice',
        limit: 0, // 0 = no limit; Payload defaults to 10 and would silently truncate the menu
    })

    const steaksDishChoice = result.docs as SteaksDishChoice[];

    return steaksDishChoice;
}