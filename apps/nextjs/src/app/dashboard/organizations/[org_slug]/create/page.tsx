import { db } from "@battle-stadium/db";
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

export default async function CreateTournamentPage({
  params,
}: OrganizationDashboardPageParams) {
  const { org_slug } = await params;

  return (
    <CreateTournament org_slug={org_slug} />
  )
}
