import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";

import { Input } from "@battle-stadium/ui";

import type { Tokens } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";
import { getProfilesByClerkUserId } from "~/app/server-actions/profiles/actions";
import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";
import { TournamentRegistrationForm } from "~/components/tournaments/tournament-registration";
import { unstable_noStore as no_store } from "next/cache";

export async function generateStaticParams() {
  const results = await getOrganizationTournamentsRaw();
  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}

interface OrganizationTournamentProps {
  org_slug: string;
  tournament_id: number;
}

interface OrganizationTournamentParams {
  params: Promise<OrganizationTournamentProps>;
}

export default function RegisterSuspenseWrapper({
  params,
}: OrganizationTournamentParams) {
  return (
    <Suspense fallback={null}>
      <RegisterWrapper params={params} />
    </Suspense>
  );
}


async function RegisterWrapper(props: Readonly<OrganizationTournamentParams>) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;

  return (<RegisterContent org_slug={org_slug} tournament_id={tournament_id} />);
}

async function RegisterContent({
  org_slug,
  tournament_id,
}: {
  org_slug: string;
  tournament_id: number;
}) {
  const session = await auth();
  if (!session.userId) {
    return null;
  }
  const tokens: Tokens = {
    oidc: await getVercelOidcToken(),
    clerk: await session.getToken(),
  };

  return (
    <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
      <div>
        Register for { org_slug } tournament { tournament_id }
      </div>

      <TournamentRegistrationForm
        tournament_id={ tournament_id }
        org_slug={ org_slug }
        handleTournamentRegistration={ handleTournamentRegistration(session.userId, tokens) }
      >
        <Input name="ign" />
        <ProfileSelector userId={ session.userId } tokens={ tokens } />
      </TournamentRegistrationForm>
    </div>
  );
}

function handleTournamentRegistration(userId: string, tokens: Tokens) {
  return async (formData: FormData, tournament_id: number) => {
    "use server";
    const profiles = await getProfilesByClerkUserId(userId, tokens);

    const in_game_name = formData.get("ign") as string;
    const profile = formData.get("profile") as string;
    const show_country_flag =
      (formData.get("country_flag") as string) === "true";

    const profile_id = profiles.find((p) => p.username === profile)?.id;

    if (!profile_id) {
      throw new Error("Profile not found.");
    }

    return postTournamentRegistration(
      {
        tournamentId: tournament_id,
        inGameName: in_game_name,
        profileId: Number(profile_id),
        showCountryFlag: show_country_flag,
      },
      tokens,
    );
  };
}

async function ProfileSelector(props: { userId: string; tokens: Tokens }) {
  const profiles = await getProfilesByClerkUserId(props.userId, props.tokens);
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
        {profiles.map((profile) => (
          <option
            key={profile.id}
            value={profile.username}
            label={profile.username}
            data-profile-id={profile.id}
          />
        ))}
      </datalist>
    </>
  );
}
