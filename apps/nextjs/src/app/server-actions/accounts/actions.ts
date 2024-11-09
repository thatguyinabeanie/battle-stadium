"use server";

import type { FetchOptions } from "openapi-fetch";
import { auth } from "@clerk/nextjs/server";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getAccounts (
  options?: FetchOptions<paths["/accounts"]["get"]>,
) {
  const usersOptions = {
    ...defaultConfig("listUsers"),
    ...options,
  };
  const skipClerkAuth = true;

  return BattleStadiumApiClient(skipClerkAuth).GET("/accounts", usersOptions);
}

export async function getAccount (
  username: string,
  options?: FetchOptions<paths["/accounts/{username}"]["get"]>,
) {
  const userOptions = {
    ...defaultConfig(`getUser-${username}`),
    ...options,
    params: { path: { username } },
  };

  return BattleStadiumApiClient().GET("/accounts/{username}", userOptions);
}

export async function getAccountMe (
  options?: FetchOptions<paths["/accounts/me"]["get"]>,
) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userMeOptions = {
    ...defaultConfig(`getAccountMe(${userId})`),
    ...options,
  };

  return BattleStadiumApiClient().GET("/accounts/me", userMeOptions);
}
