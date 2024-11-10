"use server";

import { auth } from "@clerk/nextjs/server";

import { db, eq } from "@battle-stadium/db";
import { accounts, clerkUsers, profiles } from "@battle-stadium/db/schema";

export async function getAccounts() {
  return await db.query.accounts.findMany();
}

export async function getAccount(username: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });

  if (!profile?.accountId) {
    return null;
  }

  return await db.query.accounts.findFirst({
    where: eq(accounts.id, BigInt(profile.accountId)),
  });
}

export async function getAccountMe() {
  const { userId } = await auth();

  console.log("userId", userId);
  if (!userId) {
    return null;
  }

  const clerkUser = await db.query.clerkUsers.findFirst({
    where: eq(clerkUsers.clerkUserId, userId),
  });

  console.log("clerkUser", clerkUser);
  if (!clerkUser?.accountId) {
    return null;
  }

  const account = await db.query.accounts.findFirst({
    where: eq(accounts.id, BigInt(clerkUser.accountId)),
  });

  console.log("account", account);
  return account;
}
