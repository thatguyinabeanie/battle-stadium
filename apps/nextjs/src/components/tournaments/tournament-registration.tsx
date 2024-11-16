import type { Profile } from "@battle-stadium/db/schema";
import { Button, Input } from "@battle-stadium/ui";

import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";
import ProfilesAutocomplete from "./profiles-autocomplete";

interface TournamentRegistrationProps {
  org_slug: string;
  tournament_id: number;
  profiles: Profile[];
}

export default function TournamentRegistration ({
  org_slug,
  tournament_id,
  profiles,
}: Readonly<TournamentRegistrationProps>) {
  const registerForTournament = async (formData: FormData) => {
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

  return (
    <div className="border-small m-20 inline-block max-w-fit justify-center rounded-3xl border-neutral-500/40 bg-transparent p-10 text-center backdrop-blur">
      <div>
        Register for { org_slug } tournament { tournament_id }
      </div>


      <form action={ registerForTournament } className="grid grid-cols-1 gap-4">
        <Input name="ign" />

        <ProfilesAutocomplete profiles={ profiles } />

        <Button aria-label="Submit" color="primary" type="submit">
          Submit
        </Button>
      </form>

    </div>
  );
}
