"use server";

import { auth } from "@clerk/nextjs/server";

import type { Tokens } from "~/types";
import { getProfilesByClerkUserId } from "~/app/server-actions/profiles/actions";
import { postTournamentRegistration } from "~/app/server-actions/tournaments/actions";

export async function handleTournamentRegistration(
  formData: FormData,
  tournament_id: number,
  tokens: Tokens,
) {
  const inGameNameValue = formData.get("in_game_name");
  const in_game_name =
    typeof inGameNameValue === "string" ? inGameNameValue : "";

  const profileValue = formData.get("profile");
  const profile_username = typeof profileValue === "string" ? profileValue : "";

  const show_country_flag = formData.get("show_country_flag") === "on";
  const { userId } = await auth();
  const profiles = await getProfilesByClerkUserId(userId, tokens);
  const profile = profiles.find((p) => p.username === profile_username);
  const profile_id = profile?.id;

  if (!profile_id) {
    throw new Error("Profile not found");
  }

  return postTournamentRegistration(
    {
      tournamentId: tournament_id,
      inGameName: in_game_name,
      profileId: validateProfileId(profile_id),
      showCountryFlag: show_country_flag,
    },
    tokens,
  );
}

function validateProfileId(id: unknown): number {
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    throw new Error(`Invalid profile ID format: ${String(id)}`);
  }
  return numId;
}
