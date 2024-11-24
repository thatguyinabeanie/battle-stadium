import { Suspense } from "react";

import { Input } from "@battle-stadium/ui";

import type { OrganizationTournamentParams } from "~/types";
import { getProfilesMe } from "~/app/server-actions/profiles/actions";
import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";
import { TournamentRegistrationForm } from "~/components/tournaments/tournament-registration";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";

export async function generateStaticParams() {
  return await generateOrganizationTournamentsStaticParams();
}

export default async function Register(
  props: Readonly<OrganizationTournamentParams>,
) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;

  return (
    <>
      <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
        <div>
          Register for {org_slug} tournament {tournament_id}
        </div>

        <Suspense fallback={ <div>Loading...</div> }>
          <TournamentRegistrationFormWrapper org_slug={org_slug} tournament_id={tournament_id} />
        </Suspense>
      </div>
    </>
  );
}

function TournamentRegistrationFormWrapper(props: {org_slug: string, tournament_id: number}) {
  return (
    <TournamentRegistrationForm
      {...props}
      tournamentRegistrationAction={ createRegistrationHandler(props.tournament_id) }
    >
      <Input name="ign" />
      <ProfileSelector />
    </TournamentRegistrationForm>
  );
}

// Registration handler without cache directive
function createRegistrationHandler (tournament_id: number) {
  return async function handleRegistration (formData: FormData) {
    "use server";
    const in_game_name = formData.get("in_game_name")?.toString() ?? "";
    const profile_username = formData.get("profile")?.toString() ?? "";
    const show_country_flag = formData.get("show_country_flag") === "on";

    const profiles = await getCachedProfiles();
    const profile = profiles.find((p) => p.username === profile_username);
    const profile_id = profile?.id;

    if (!profile_id) {
      throw new Error("Profile not found");
    }

    return postTournamentRegistration({
      tournamentId: tournament_id,
      inGameName: in_game_name,
      profileId: profile_id,
      showCountryFlag: show_country_flag,
    });
  };
}

// Helper function for cached profile data
async function getCachedProfiles () {
  "use cache";
  return getProfilesMe();
}

async function ProfileSelector () {
  const profiles = await getCachedProfiles();

  return (
    <>
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

      <datalist id="profiles">
        { profiles.map((profile) => (
          <option
            key={ profile.id }
            value={ profile.username }
            label={ profile.username }
            data-profile-id={ profile.id }
          />
        )) }
      </datalist>
    </>
  );
}
