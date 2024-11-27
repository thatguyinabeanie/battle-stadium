"use server";

import { eq } from "@battle-stadium/db";
import { db, inArray } from "@battle-stadium/db/client";
import { organizations } from "@battle-stadium/db/schema";

import { getAccountMe } from "../accounts/actions";

export async function getOrganizations() {
  const orgs = await db.query.organizations.findMany();
  return orgs;
}

export async function getPartneredOrganizations() {
  const orgs = await db.query.organizations.findMany({
    where: eq(organizations.partner, true),
  });

  return orgs;
}

export async function getOrganization(slug: string) {
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
  });
  return org;
}

export async function getMyOrganizations() {
  const me = await getAccountMe();

  if (!me) {
    return {
      own: [],
      member: [],
    };
  }

  const own_orgs = await db.query.organizations.findMany({
    where: eq(organizations.ownerId, me.id),
  });
  const own_orgs_ids = own_orgs.map((org) => org.id);

  const org_staff = await db.query.organizationStaffMembers.findMany({
    where: (organizationStaffMembers, { eq }) =>
      eq(organizationStaffMembers.accountId, me.id),
  });

  const org_staff_org_ids = org_staff
    .map((staff) => staff.organizationId)
    .filter((id) => !own_orgs_ids.includes(id));

  const member_orgs = await db.query.organizations.findMany({
    where: inArray(organizations.id, org_staff_org_ids),
  });

  return {
    own: own_orgs,
    member: member_orgs,
  };
}
