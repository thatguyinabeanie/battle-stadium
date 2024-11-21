import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { Input } from "@battle-stadium/ui";

import type { OrganizationTournamentParams } from "~/types";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "~/app/server-actions/profiles/actions";
import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";
import TournamentRegistration from "~/components/tournaments/tournament-registration";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return await generateOrganizationTournamentsStaticParams();
}

export default async function Register(
  props: Readonly<OrganizationTournamentParams>,
) {
  const params = await props.params;
  const tournamentRegistration = tournamentRegistrationAction(
    params.tournament_id,
  );
  return (
    <>
      <ToastContainer />
      <TournamentRegistration
        {...params}
        tournamentRegistrationAction={tournamentRegistration}
      >
        <ProfileSelector />
      </TournamentRegistration>
    </>
  );
}

function tournamentRegistrationAction(tournament_id: number) {
  return async (formData: FormData) => {
    "use server";

    const me = await getAccountMe();
    if (!me) {
      redirect("/sign-in");
    }
    const profiles = await getProfilesByAccountId(me.id);

    const in_game_name = formData.get("ign") as string;
    const profile = formData.get("profile") as string;
    const show_country_flag =
      (formData.get("country_flag") as string) === "true";

    const profile_id = profiles.find((p) => p.username === profile)?.id;

    if (!profile_id) {
      throw new Error("Profile not found.");
    }

    return postTournamentRegistration({
      tournamentId: tournament_id,
      inGameName: in_game_name,
      profileId: profile_id,
      showCountryFlag: show_country_flag,
    });
  };
}

async function ProfileSelector() {
  const me = await getAccountMe();
  if (!me) {
    redirect("/sign-in");
  }
  const profiles = await getProfilesByAccountId(me.id);
  return (
    <div>
      <Input
        type="text"
        name="profile"
        list="profiles"
        placeholder="Select profile"
        required
        aria-label="Select your Profile"
        aria-description="profile-description"
      />

      <div id="profile-description" className="sr-only">
        Select your profile from the list of available profiles
      </div>

      <div className="pt-4">
        <datalist id="profiles">
          {profiles.map((profile) => (
            <option
              key={profile.id}
              value={profile.username}
              label={profile.username}
              data-profile-id={profile.id}
            />
          ))}
        </datalist>
      </div>
    </div>
  );
}
