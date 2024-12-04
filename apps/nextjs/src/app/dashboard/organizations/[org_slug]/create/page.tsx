import { db } from "@battle-stadium/db";

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

  return <h1>Create TOurnament - {org_slug}</h1>;
}
