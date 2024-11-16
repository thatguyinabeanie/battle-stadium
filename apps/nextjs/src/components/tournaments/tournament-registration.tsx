import type { Profile } from "@battle-stadium/db/schema";
import { Button, Input } from "@battle-stadium/ui";

import type { AccountMe } from "~/lib/api";
import { getProfilesByAccountId } from "~/app/server-actions/profiles/actions";
import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";
import ProfilesAutocomplete from "./profiles-autocomplete";

interface TournamentRegistrationProps {
  org_slug: string;
  tournament_id: number;
  me: AccountMe;
}

export default async function TournamentRegistration({
  org_slug,
  tournament_id,
  me,
}: Readonly<TournamentRegistrationProps>) {
  const profiles = await getProfilesByAccountId(me.id);

  return (
    <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
      <div>
        Register for {org_slug} tournament {tournament_id}
      </div>

      <form
        action={register(tournament_id, profiles)}
        className="grid grid-cols-1 gap-4"
      >
        <Input name="ign" />

        <ProfilesAutocomplete profiles={profiles} />

        <Button aria-label="Submit" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export const register =
  (tournament_id: number, profiles: Profile[]) =>
  async (formData: FormData) => {
    "use server";
    const in_game_name = formData.get("ign") as string;
    const profile = formData.get("profile") as string;
    const show_country_flag =
      (formData.get("country_flag") as string) === "true";

    const profile_id = profiles.find((p) => p.username == profile)?.id;

    if (profile_id) {
      await postTournamentRegistration({
        tournamentId: tournament_id,
        inGameName: in_game_name,
        profileId: profile_id,
        showCountryFlag: show_country_flag,
      });
    }
  };
