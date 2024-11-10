"use server";

import { eq } from "@battle-stadium/db";
import { db } from "@battle-stadium/db/client";
import { organizations } from "@battle-stadium/db/schema";

export async function getOrganizations () {
  const orgs = await db.query.organizations.findMany();
  return orgs;
}

export async function getPartneredOrganizations () {
  const orgs = await db.query.organizations.findMany({
    where: eq(organizations.partner, true),
  });
  return orgs;
}

export async function getOrganization (slug: string) {
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
  });
  return org;
}
