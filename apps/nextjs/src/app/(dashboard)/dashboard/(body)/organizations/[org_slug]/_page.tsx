import { Suspense } from "react";

interface OrganizationDashboardPageProps {
  params: Promise<{ org_slug: string }>;
}
// export async function generateStaticParams () {
//   return (await getOrganizations()).map((org) => ({
//     params: { org_slug: org.slug },
//   }));
// }

export default function OrganizationDashboardPage(
  props: OrganizationDashboardPageProps,
) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrganizationDashboard {...props} />
    </Suspense>
  );
}

async function OrganizationDashboard(props: OrganizationDashboardPageProps) {
  const { org_slug } = await props.params;
  return (
    <div>
      <h1>Organization Dashboard</h1>
      <p>Organization: {org_slug}</p>
    </div>
  );
}
