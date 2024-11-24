import { Suspense } from "react";

import { Input } from "@battle-stadium/ui";

import type { OrganizationTournamentParams } from "~/types";
import { getProfilesMe } from "~/app/server-actions/profiles/actions";
import { TournamentRegistrationForm } from "~/components/tournaments/tournament-registration";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";
import { handleTournamentRegistration } from "~/app/server-actions/registration/actions";
import { ProfileSelector } from "./profile-selector";

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

async function getCachedProfiles () {

  return await getProfilesMe();
}

async function TournamentRegistrationFormWrapper(props: {org_slug: string, tournament_id: number}) {
  const profiles = await getCachedProfiles();
  return (
    <TournamentRegistrationForm
      {...props}
      handleTournamentRegistration={ handleTournamentRegistration }
    >
      <Input name="ign" />
      <ProfileSelector profiles={ profiles } />
    </TournamentRegistrationForm>
  );
}

