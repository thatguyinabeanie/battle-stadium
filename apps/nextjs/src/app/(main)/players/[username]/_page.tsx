// import { Suspense } from "react";

import { db } from "@battle-stadium/db";
import { Suspense } from "react";

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

export default function PlayerProfilePage({params}: Readonly<PlayerProfilePageParams>) {
  return (
    <Suspense fallback={null}>
      <PlayerProfileParamsUnwrap params={ params } />
    </Suspense>
  );
}

async function PlayerProfileParamsUnwrap({ params }: PlayerProfilePageParams) {
  const { username } = await params;
  return <PlayerProfileCached username={username} />;
}

async function PlayerProfileCached({ username }: ProfilePageProps) {
  const profile = await getProfile(username);
  return (
    <ComingSoon title={`${profile?.username}'s Profile`}>
      <h2>The Player Profiles are under construction</h2>
    </ComingSoon>
  );
}