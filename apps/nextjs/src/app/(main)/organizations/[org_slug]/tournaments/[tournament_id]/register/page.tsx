import { auth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";

import { Input } from "@battle-stadium/ui";

import type { OrganizationTournamentParams, Tokens } from "~/types";
import { getProfiles } from "~/app/server-actions/profiles/actions";
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
  const session = await auth();
  if (!session.userId) {
    return null;
  }

  const tokens: Tokens = {
    oidc: await getVercelOidcToken(),
    clerk: await session.getToken(),
  };
  return (
    <>
      <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
        <div>
          Register for {org_slug} tournament {tournament_id}
        </div>

        <TournamentRegistrationForm
          {...params}
          handleTournamentRegistration={handleTournamentRegistration(
            session.userId,
            tokens,
          )}
        >
          <Input name="ign" />
          <ProfileSelector userId={session.userId} tokens={tokens} />
        </TournamentRegistrationForm>
      </div>
    </>
  );
}

function handleTournamentRegistration(userId: string, tokens: Tokens) {
  return async (formData: FormData, tournament_id: number) => {
    "use server";
    const profiles = await getProfiles(userId, tokens);

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
  const profiles = await getProfiles(props.userId, props.tokens);
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
