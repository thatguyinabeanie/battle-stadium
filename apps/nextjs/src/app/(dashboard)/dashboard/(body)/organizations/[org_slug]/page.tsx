import { db } from "@battle-stadium/db";

interface OrganizationDashboardPageParams {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  return (await db.query.organizations.findMany())
  .filter(({slug})=> slug !== null)
  .map((org) => ({
    org_slug: org.slug,
  }));
}

export default async function OrganizationDashboard({params}: OrganizationDashboardPageParams) {
  "use cache";

  const { org_slug } = await params;
  return (
    <div>
      <h1>Organization Dashboard</h1>
      <p>Organization: {org_slug}</p>
    </div>
  );
}
