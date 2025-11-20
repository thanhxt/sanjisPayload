import { Hero } from "@/type/heroType";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";

export default async function HeroImage(props: { slug: string }) {
    const payload = await getPayload({ config });

        const resultHero = await payload.find({
            collection: 'hero',
        });

        const heroes: Hero[] = resultHero.docs as Hero[];

    return (
        <div className="absolute w-full h-full object-cover blur-md brightness-50 z-10">
            <Image
                  src={heroes.find((hero) => hero.title === props.slug)?.image.url || '/notFound.jpg'}
                  alt="Exquisite Japanese cuisine"
                  fill
                  className="object-cover"
                  priority
                />
        </div>
    )
}