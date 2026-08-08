import { getPayload } from "payload";
import config from "@payload-config";
import { Team as TeamDoc } from "@/type/teamType";
import { TeamContent } from "../about/team-content";
import type { TeamBlockType } from "../../../payload-types";

export async function TeamBlock({ anchorId }: TeamBlockType) {
    const payload = await getPayload({ config });

    const resultTeam = await payload.find({
        collection: 'team',
    });

    const team: TeamDoc[] = resultTeam.docs as TeamDoc[];

    return (
        <section id={anchorId || undefined}>
            <TeamContent team={team} />
        </section>
    );
}
