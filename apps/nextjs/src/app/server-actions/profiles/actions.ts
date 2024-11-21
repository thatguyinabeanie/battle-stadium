"use server";

import "server-only";

import type { FetchOptions } from "openapi-fetch";
import { redirect } from "next/navigation";

import { db, eq } from "@battle-stadium/db";
import { profiles } from "@battle-stadium/db/schema";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";
import { getAccountMe } from "../accounts/actions";

export async function getProfiles() {
  return await db.query.profiles.findMany();
}

export async function getProfile(username: string) {
  return await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });
}

export async function getProfilesByAccountId(id: number) {
  return await db.query.profiles.findMany({
    where: eq(profiles.accountId, id),
  });
}

type RedirectUrl = `/${string}`;
export async function getProfilesMe({
  redirectTo,
}: { redirectTo?: RedirectUrl } = {}) {
  const me = await getAccountMe();
  if (!me) {
    redirect(redirectTo ?? "/sign-in");
  }
  return getProfilesByAccountId(me.id);
}

export async function createProfile(
  username: string,
  options?: FetchOptions<paths["/profiles"]["post"]>,
) {
  const profileOptions: FetchOptions<paths["/profiles"]["post"]> = {
    ...defaultConfig("postPlayerProfile"),
    ...options,
    params: {
      query: {
        user_name: username,
      },
    },
  };

  const resp = (
    await BattleStadiumApiClient().POST("/profiles", profileOptions)
  ).data;

  return { success: true, resp };
}
