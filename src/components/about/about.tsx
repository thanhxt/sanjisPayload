import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import { Team } from "@/type/teamType";
import { Hero } from "@/type/heroType";
import { AboutContent } from "./about-content";
import { TeamContent } from "./team-content";

export const revalidate = 60;

export default async function About() {
  const payload = await getPayload({ config });

  // Get the media
  const resultHero = await payload.find({
    collection: 'hero',
  });

  // Get the team
  const resultTeam = await payload.find({
    collection: 'team',
  });

  const heroes: Hero[] = resultHero.docs as Hero[];
  const team: Team[] = resultTeam.docs as Team[];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroes.find((hero) => hero.title === 'aboutHero')?.image.url || '/notFound.jpg'}
                  alt="Exquisite Japanese cuisine"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
            <AboutContent />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamContent team={team} />
    </div>
  );
}
