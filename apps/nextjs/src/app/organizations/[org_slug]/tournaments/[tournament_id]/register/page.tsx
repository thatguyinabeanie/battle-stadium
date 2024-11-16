import { redirect } from "next/navigation";

import { getAccountMe } from "~/app/server-actions/accounts/actions";
import TournamentRegistration from "~/components/tournaments/tournament-registration";

export interface RegisterProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>;
}

export default async function Register(props: Readonly<RegisterProps>) {
  const params = await props.params;

  const me = await getAccountMe();

  if (!me) {
    redirect("/sign-in");
  }

  return <TournamentRegistration {...params} me={me} />;
}
