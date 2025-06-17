import { getPayload } from "payload";
import config from "@payload-config";
import { MainDish } from "@/type/mainDishType";

export default async function getMainDish() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'menuMainDish',
    })

    const mainDish = result.docs as MainDish[];
    mainDish.sort((a, b) => (a.position || 0) - (b.position || 0));

    return mainDish;
}