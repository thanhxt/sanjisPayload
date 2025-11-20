import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishChoice } from "@/type/steaksDishChoiceType";

export const revalidate = 60;

export default async function getSteaksDishChoice() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuSanjisChoice',
    })

    const steaksDishChoice = result.docs as SteaksDishChoice[];

    return steaksDishChoice;
}