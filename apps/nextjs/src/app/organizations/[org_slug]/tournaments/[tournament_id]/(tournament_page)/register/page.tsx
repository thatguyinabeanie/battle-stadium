import { redirect } from "next/navigation";

import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "~/app/server-actions/profiles/actions";
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

  const profiles = await getProfilesByAccountId(me.id);

  return <TournamentRegistration {...params} profiles={profiles} />;
}
