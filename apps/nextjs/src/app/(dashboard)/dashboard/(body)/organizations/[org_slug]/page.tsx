// import { Suspense } from "react";

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

export default async function OrganizationDashboardPage({
  params,
}: OrganizationDashboardPageParams) {
  // return <OrganizationDashboardShrug params={params} />;
  const { org_slug } = await params;

  return (
    <div>
      <h1>Organization Dashboard</h1>
      <p>Organization: { org_slug }</p>
    </div>
  );
}

// function OrganizationDashboardShrug({
//   params,
// }: OrganizationDashboardPageParams) {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <OrganizationDashboard params={params} />
//     </Suspense>
//   );
// }

// async function OrganizationDashboard(props: OrganizationDashboardPageParams) {
//   const { org_slug } = await props.params;
//   return (
//     <div>
//       <h1>Organization Dashboard</h1>
//       <p>Organization: {org_slug}</p>
//     </div>
//   );
// }
