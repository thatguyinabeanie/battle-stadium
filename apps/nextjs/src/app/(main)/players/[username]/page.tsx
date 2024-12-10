import { db } from "@battle-stadium/db";

import { getProfile } from "~/app/server-actions/profiles/actions";
import ComingSoon from "~/components/coming-soon";

interface ProfilePageProps {
  username: string;
}

interface PlayerProfilePageParams {
  params: Promise<ProfilePageProps>;
}

export async function generateStaticParams() {
  return (await db.query.profiles.findMany()).map(({ username }) => ({
    username,
  }));
}

export default async function PlayerProfilePage(
  props: Readonly<PlayerProfilePageParams>,
) {
  const { username } = await props.params;
  return <PlayerProfile username={username} />;
}

async function PlayerProfile({ username }: ProfilePageProps) {
  const profile_username = (await getProfile(username))?.username ?? "Player";
  return (
    <section
      aria-label="Player Profile Content"
      className="z-0 m-4 mt-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
    >
      <ComingSoon title={`${profile_username} Profile`} />
    </section>
  );
}
