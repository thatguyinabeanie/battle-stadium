import { getProfile } from "~/app/server-actions/profiles/actions";
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

export default async function PlayerProfilePage(
  props: Readonly<PlayerProfilePageProps>,
) {
  const params = await props.params;
  const player = await getProfile(params.username);

  return (
    <ComingSoon title={player?.username ?? "Player Profile"}>
      <h2>The Player Profiles are under construction</h2>
    </ComingSoon>
  );
}
