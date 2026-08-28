import { getPayload } from "payload";
import config from "@payload-config";
import { SteaksDishSharing } from "@/type/steaksDishSharingType";

export default async function getSteaksDishSharing() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuSteaksSharing',
        limit: 0, // 0 = no limit; Payload defaults to 10 and would silently truncate the menu
    })

    const steaksDishSharing = result.docs as SteaksDishSharing[];

    return steaksDishSharing;
}