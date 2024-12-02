"use server";

import type { FetchOptions } from "openapi-fetch";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { db, eq } from "@battle-stadium/db";
import { accounts, profiles } from "@battle-stadium/db/schema";

import type { paths } from "~/lib/api/openapi-v1";
import type { Tokens } from "~/types";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getAccounts() {
  "use cache";
  cacheTag("getAccounts");
  cacheLife("minutes");
  // TODO: revalidate on account creation

  return db.query.accounts.findMany();
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
  cacheLife("hours");
  // TODO - revalidate on account creation

  return db.query.accounts.findFirst({
    where: eq(accounts.id, id),
  });
}

async function findProfilesByUsername(username: string) {
  "use cache";
  cacheTag(`findProfileByUsername(${username})`);
  cacheLife("hours");
  // TODO - revalidate on profile creation

  return db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });
}

export async function getAccount(
  userId: string | null,
  tokens: Tokens,
  options?: FetchOptions<paths["/accounts/me"]["get"]>,
) {
  "use cache";
  cacheTag(`getAccount(${userId})`);
  cacheLife("hours");
  // TODO: revalidate on account creation

  const accountMeOptions = {
    // Cache key includes userId to prevent cross-user cache conflicts
    ...defaultConfig(`getAccount-${userId}`),
    ...options,
  };

  const resp = await BattleStadiumApiClient(tokens).GET(
    "/accounts/me",
    accountMeOptions,
  );
  return resp.data;
}
