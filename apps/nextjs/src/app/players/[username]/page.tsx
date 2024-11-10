import { getProfile } from "~/app/server-actions/profiles/actions";

interface PlayerProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata (
  props: Readonly<PlayerProfilePageProps>,
) {
  const params = await props.params;
  const player = await getProfile(params.username);

  return { title: player?.username ?? "Player" };
}

export default async function PlayerProfilePage (
  props: Readonly<PlayerProfilePageProps>,
) {
  const params = await props.params;
  const player = await getProfile(params.username);

  return (
    <div>
      <h1>{ player?.username }</h1>
      <p> { player?.slug } </p>
    </div>
  );
}
