import { db } from "@battle-stadium/db";
import { Suspense } from "react";

interface OrganizationDashboardPageParams {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  return (await db.query.organizations.findMany()).map((org) =>  ({ org_slug: org.slug }));
}

export default function OrganizationDashboardPage(
  { params }: OrganizationDashboardPageParams,
) {
  return (
    <OrganizationDashboardShrug params={params} />
  );
}

function OrganizationDashboardShrug (
  { params }: OrganizationDashboardPageParams,
) {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <OrganizationDashboard params={ params } />
    </Suspense>
  );
}

async function OrganizationDashboard (props: OrganizationDashboardPageParams) {
  const { org_slug } = await props.params;
  return (
    <div>
      <h1>Organization Dashboard</h1>
      <p>Organization: {org_slug}</p>
    </div>
  );
}
