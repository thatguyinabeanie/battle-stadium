"use server";

import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import SqlString from "sqlstring";

import { eq, lower } from "@battle-stadium/db";
import { db, inArray } from "@battle-stadium/db/client";
import { organizations } from "@battle-stadium/db/schema";

import type { Tokens } from "~/types";
import { getAccount } from "../accounts/actions";

export async function getOrganizations() {
  "use cache";
  cacheTag("getOrganizations");
  cacheLife("hours");
  // TODO: revalidate on organization creation

  return db.query.organizations.findMany();
}

export async function searchOrganizations(query: string) {
  "use cache";
  cacheTag(`searchOrganizations(${query})`);
  cacheLife("hours");
  // TODO: revalidate on organization creation

  const sanitizedQuery = SqlString.escape(query).toLowerCase();
  return db.query.organizations.findMany({
    where: (organizations, { or, like }) =>
      or(
        like(lower(organizations.name), `%${sanitizedQuery}%`),
        like(lower(organizations.slug), `%${sanitizedQuery}%`),
      ),
  });
}

export async function getPartneredOrganizations() {
  "use cache";
  cacheTag("getPartneredOrganizations");
  cacheLife("days");
  // TODO: revalidate on organization update => partner

  return db.query.organizations.findMany({
    where: eq(organizations.partner, true),
  });
}

export async function findOrganizationBySlug(slug: string) {
  "use cache";
  cacheTag(`findOrganizationBySlug(${slug})`);
  cacheLife("days");
  // TODO: revalidate on organization update

  return db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
  });
}

export async function getUserOrganizations(userId: string, tokens: Tokens) {
  "use cache";
  cacheTag(`getUserOrganizations(${userId})`);
  cacheLife("hours");
  // TODO: revalidate on organization creation

  const me = await getAccount(userId, tokens);

  if (!me) {
    return {
      own: [],
      member: [],
    };
  }

  const own_org = await db.query.organizations.findFirst({
    where: eq(organizations.ownerId, me.id),
  });

  const org_staff = await db.query.organizationStaffMembers.findMany({
    where: (organizationStaffMembers, { eq }) =>
      eq(organizationStaffMembers.accountId, me.id),
  });

  const org_staff_org_ids = org_staff
    .map((staff) => staff.organizationId)
    .filter((id) => own_org?.id !== id);

  const member_orgs = await db.query.organizations.findMany({
    where: inArray(organizations.id, org_staff_org_ids),
  });

  return {
    own: own_org ? [own_org] : [],
    member: member_orgs,
  };
}
