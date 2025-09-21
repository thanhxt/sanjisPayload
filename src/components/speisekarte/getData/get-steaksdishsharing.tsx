import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishSharing } from "@/type/steaksDishSharingType";

export const revalidate = 60;

export default async function getSteaksDishSharing() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuSteaksSharing',
    })

    const steaksDishSharing = result.docs as SteaksDishSharing[];

    return steaksDishSharing;
}