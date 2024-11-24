// server-actions/registration/actions.ts
"use server";

import { getProfilesMe } from "~/app/server-actions/profiles/actions";
import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";

export async function getProfiles () {
  "use cache";
  return getProfilesMe();
}

export async function handleTournamentRegistration (formData: FormData, tournament_id: number) {
  const in_game_name = formData.get("in_game_name")?.toString() ?? "";
  const profile_username = formData.get("profile")?.toString() ?? "";
  const show_country_flag = formData.get("show_country_flag") === "on";

  const profiles = await getProfiles();
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
}

