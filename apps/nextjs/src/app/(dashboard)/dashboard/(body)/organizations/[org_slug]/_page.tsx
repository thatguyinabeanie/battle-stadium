import { db } from "@battle-stadium/db";
import { Suspense } from "react";

interface OrganizationDashboardPageParams {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  return (await db.query.organizations.findMany({where: (org, {isNotNull}) => (isNotNull(org.slug))}))
    .map((org) => ({
      org_slug: org.slug,
    }));
}

export default function OrganizationDashboardPage ({params}: OrganizationDashboardPageParams){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrganizationDashboard params={params} />
    </Suspense>
  )
};

async function OrganizationDashboard({
  params,
}: OrganizationDashboardPageParams) {
  const { org_slug } = await params;
  return <OrgDashboardContent org_slug={org_slug} />;
}

function OrgDashboardContent({ org_slug }: { org_slug: string }) {

  return (
    <div>
      <h1>Organization Dashboard</h1>
      <p>Organization: {org_slug}</p>
    </div>
  );
}
