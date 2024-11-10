"use server";

import type { FetchOptions } from "openapi-fetch";
import { revalidateTag } from "next/cache";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";
import { db, eq } from "@battle-stadium/db";
import { profiles } from "@battle-stadium/db/schema";

export async function getProfiles () {
  return await db.query.profiles.findMany();
}

export async function getProfile (username: string) {
  return await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });
}

export async function getProfilesByAccountId (
  id: number,
  options?: FetchOptions<paths["/profiles"]["get"]>,
) {
  const profileOptions = {
    ...defaultConfig(`getPlayerProfileByAccountId-${id}`),
    ...options,
    params: {
      query: {
        account_id: id,
      },
    },
  };

  const profiles =
    (await BattleStadiumApiClient().GET("/profiles", profileOptions)).data ??
    [];

  return profiles;
}

export async function createProfile (
  username: string,
  accountId: number,
  options?: FetchOptions<paths["/profiles"]["post"]>,
) {
  const profileOptions = {
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

  revalidateTag(`getPlayerProfileByAccountId-${accountId}`);

  return { success: true, resp };
}
