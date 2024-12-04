import { notFound } from "next/navigation";

import { db } from "@battle-stadium/db";

import { getOrganizationBySlug } from "~/app/server-actions/organizations/actions";
import CreateTournament from "./create-tournament";

interface OrganizationDashboardPageParams {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  return (
    await db.query.organizations.findMany({
      where: (org, { isNotNull }) => isNotNull(org.slug),
    })
  ).map((org) => ({
    org_slug: org.slug,
  }));
}

// TODO: Add a check for the user's permissions to create a tournament
export default async function CreateTournamentPage({
  params,
}: OrganizationDashboardPageParams) {
  const { org_slug } = await params;

  const org = await getOrganizationBySlug(org_slug);

  if (!org) {
    notFound();
  }

  return <CreateTournament org={org} />;
}
