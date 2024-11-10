import TournamentRegistration from "~/components/tournaments/tournament-registration";

interface RegisterProps {
  params: Promise<{
    org_slug: string;
    tournament_id: bigint;
  }>;
}

export default async function Register(props: Readonly<RegisterProps>) {
  const params = await props.params;

  return <TournamentRegistration {...params} />;
}
