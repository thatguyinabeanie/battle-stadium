import { redirect } from "next/navigation";

import type { OrganizationTournamentProps } from "~/types";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "~/app/server-actions/profiles/actions";
import TournamentRegistration from "~/components/tournaments/tournament-registration";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return await generateOrganizationTournamentsStaticParams();
}

export default async function Register(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;

  const me = await getAccountMe();

  if (!me) {
    redirect("/sign-in");
  }

  const profiles = await getProfilesByAccountId(me.id);

  return <TournamentRegistration {...params} profiles={profiles} />;
}
