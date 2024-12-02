"use server";

import "server-only";

import type { FetchOptions } from "openapi-fetch";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

// import { redirect } from "next/navigation";

import { db, eq } from "@battle-stadium/db";
import { profiles } from "@battle-stadium/db/schema";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";
import { getAccount } from "../accounts/actions";
import type { Tokens } from "~/types";

export async function getAllProfiles() {
  "use cache";
  cacheTag("getAllProfiles");
  cacheLife("hours");
  // TODO: revalidate on profile creation

  return await db.query.profiles.findMany();
}

export async function getProfile(username: string) {
  "use cache";
  cacheTag(`getProfile(${username})`);
  cacheLife("hours");
  // TODO: revalidate on profile update

  return await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });
}

export async function getProfilesByAccountId(id: number) {
  "use cache";
  cacheTag(`getProfilesByAccountId(${id})`);
  cacheLife("hours");
  // TODO: revalidate on profile creation

  return await db.query.profiles.findMany({
    where: eq(profiles.accountId, id),
  });
}

export async function getProfiles(userId: string | null, tokens: Tokens) {
  const me = await getAccount(userId, tokens);
  if (!me) {
    return [];
  }

  try {
    return await getProfilesByAccountId(me.id);
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    throw new Error("Unable to retrieve profiles. Please try again later.");
  }
}

export async function createProfile(
  username: string,
  tokens: Tokens,
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
    await BattleStadiumApiClient(tokens).POST("/profiles", profileOptions)
  ).data;

  return { success: true, resp };
}
