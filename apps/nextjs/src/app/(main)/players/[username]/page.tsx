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

export default async function PlayerProfilePage(props: Readonly<PlayerProfilePageParams>) {
  const { username } = await props.params;
  return <PlayerProfile username={ username } />;
}

async function PlayerProfile ({ username }: ProfilePageProps) {
  const profile = await getProfile(username);
  return (
    <ComingSoon title={`${profile?.username}'s Profile`}>
      <h2>The Player Profiles are under construction</h2>
    </ComingSoon>
  );
}
