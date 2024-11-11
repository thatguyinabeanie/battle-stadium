import type { Profile } from "@battle-stadium/db/schema";
import { Button, Input } from "@battle-stadium/ui";

import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";
import ProfilesAutocomplete from "./profiles-autocomplete";

interface RegistrationCardProps {
  org_slug: string;
  tournament_id: bigint;
  profiles: Profile[];
}

export default function RegistrationCard({
  profiles,
  org_slug,
  tournament_id,
}: Readonly<RegistrationCardProps>) {
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
        Register for {org_slug} tournament {tournament_id}
      </div>

      <div>
        <form action={registerForTournament} className="grid grid-cols-1 gap-4">
          {/* <Input label="In Game Name" name="ign" variant="underlined" /> */}
          <Input name="ign" />

          <ProfilesAutocomplete profiles={profiles} />
          {/*
          <Checkbox defaultSelected aria-label="Show your country flag?" name="country_flag" size="sm" value="true">
            Show your country flag?
          </Checkbox> */}

          <Button aria-label="Submit" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
