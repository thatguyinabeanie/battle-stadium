"use server";

import type { FetchOptions } from "openapi-fetch";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { db, eq } from "@battle-stadium/db";
import { accounts, profiles } from "@battle-stadium/db/schema";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getAccounts() {
  "use cache";
  cacheTag("getAccounts");
  return await db.query.accounts.findMany();
}

export async function getAccountByProfileUsername(username: string) {
  const profile = await findProfilesByUsername(username);

  if (profile?.accountId) {
    return await findAccountById(profile.accountId);
  }

  return null;
}

async function findAccountById(id: number) {
  "use cache";
  cacheTag(`findAccountById(${id})`);

  return await db.query.accounts.findFirst({
    where: eq(accounts.id, id),
  });
}

async function findProfilesByUsername(username: string) {
  "use cache";
  cacheTag(`findProfileByUsername(${username})`);

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });

  return profile;
}

export async function getAccount(
  userId: string | null,
  options?: FetchOptions<paths["/accounts/me"]["get"]>,
) {
  "use cache";
  cacheTag(`getAccount(${userId})`);


  const accountMeOptions = {
    // Cache key includes userId to prevent cross-user cache conflicts
    ...defaultConfig(`getAccount-${userId}`),
    ...options,
  };

  const resp = await BattleStadiumApiClient().GET(
    "/accounts/me",
    accountMeOptions,
  );
  return resp.data;
}
