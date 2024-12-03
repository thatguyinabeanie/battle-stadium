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

export default async function OrganizationDashboardPage(props: OrganizationDashboardPageParams) {
  const { org_slug } = await props.params;
  return <OrgDashboardContent org_slug={ org_slug } />;
}

function OrgDashboardContent({ org_slug }: { org_slug: string }) {
  return (
    <div>
      <h1>Organization Dashboard</h1>
      <p>Organization: {org_slug}</p>
    </div>
  );
}
