import { Suspense } from "react";

import { getProfile, getProfiles } from "~/app/server-actions/profiles/actions";
import ComingSoon from "~/components/coming-soon";

interface PlayerProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata(
  props: Readonly<PlayerProfilePageProps>,
) {
  const params = await props.params;
  const player = await getProfile(params.username);

  return { title: player?.username ?? "Player" };
}

export async function generateStaticParams() {
  const profiles = await getProfiles();

  return profiles.map((profile) => ({ username: profile.username }));
}

export default function PlayerProfilePageSuspenseWrapper(
  props: Readonly<PlayerProfilePageProps>,
) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayerProfile {...props} />
    </Suspense>
  );
}

async function PlayerProfile(props: Readonly<PlayerProfilePageProps>) {
  const params = await props.params;
  return (
    <ComingSoon title={params.username}>
      <h2>The Player Profiles are under construction</h2>
    </ComingSoon>
  );
}
