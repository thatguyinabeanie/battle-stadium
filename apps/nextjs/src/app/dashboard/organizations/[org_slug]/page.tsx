import { db } from "@battle-stadium/db";
import OrgDashboardContent from "./org-dashboard-content";

export const revalidate = 60;
export const dynamicParams = true;

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

export default async function OrganizationDashboardPage(
  props: OrganizationDashboardPageParams,
) {
  const { org_slug } = await props.params;
  return <OrgDashboardContent org_slug={org_slug} />;
}
