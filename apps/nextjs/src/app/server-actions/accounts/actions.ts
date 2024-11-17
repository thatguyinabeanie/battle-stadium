"use server";

import type { FetchOptions } from "openapi-fetch";
import { auth } from "@clerk/nextjs/server";

import { db, eq } from "@battle-stadium/db";
import { accounts, profiles } from "@battle-stadium/db/schema";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getAccounts () {
  return await db.query.accounts.findMany();
}

export async function getAccount (username: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });

  if (!profile?.accountId) {
    return null;
  }

  return await db.query.accounts.findFirst({
    where: eq(accounts.id, profile.accountId),
  });
}

export async function getAccountMe (
  options?: FetchOptions<paths["/accounts/me"]["get"]>,
) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const accountMeOptions = {
    ...defaultConfig(`getAccountMe-${userId}`),
    ...options,
  };

  try {
    const resp = await BattleStadiumApiClient().GET(
      "/accounts/me",
      accountMeOptions,
    );
    return resp.data;
  }
  catch (err) {
    console.error(err);
    return null;
  }
};
