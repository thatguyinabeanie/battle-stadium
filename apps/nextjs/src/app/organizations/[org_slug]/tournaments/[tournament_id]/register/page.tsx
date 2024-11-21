import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { OrganizationTournamentProps } from "~/types";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "~/app/server-actions/profiles/actions";
import TournamentRegistration from "~/components/tournaments/tournament-registration";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";
import type { Profile } from "@battle-stadium/db/schema";
import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams () {
  return await generateOrganizationTournamentsStaticParams();
}

export default async function Register (
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;

  const me = await getAccountMe();

  if (!me) {
    redirect("/sign-in");
  }

  const profiles = await getProfilesByAccountId(me.id);

  const tournamentRegistration = tournamentRegistrationAction(params.tournament_id, profiles);
  return (
    <>
      <ToastContainer />
      <TournamentRegistration { ...params } profiles={ profiles } tournamentRegistrationAction={ tournamentRegistration } />
    </>
  );
}

function tournamentRegistrationAction (tournament_id: number, profiles: Profile[]) {
  return async (formData: FormData) => {
    "use server";

    const in_game_name = formData.get("ign") as string;
    const profile = formData.get("profile") as string;
    const show_country_flag =
      (formData.get("country_flag") as string) === "true";

    const profile_id = profiles.find((p) => p.username == profile)?.id;

    if (!profile_id) {
      throw new Error("Profile not found.");
    }

    return await postTournamentRegistration({
      tournamentId: tournament_id,
      inGameName: in_game_name,
      profileId: profile_id,
      showCountryFlag: show_country_flag,
    });
  };
}
