"use server";

import type { FetchOptions } from "openapi-fetch";
import { revalidateTag } from "next/cache";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getProfiles(
  options?: FetchOptions<paths["/profiles"]["get"]>,
) {
  const profilesOptions = {
    ...defaultConfig("getPlayerProfiles"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/profiles", profilesOptions);
}

export async function getProfilesByAccountId(
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

export async function createProfile(
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
