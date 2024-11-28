import { getOrganizations } from "~/app/server-actions/organizations/actions";

interface OrganizationDashboardPageProps {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  return (await getOrganizations()).map((org) => ({
    params: { org_slug: org.slug },
  }));
}

export default async function OrganizationDashboardPage({
  params,
}: OrganizationDashboardPageProps) {
  const { org_slug } = await params;
  return org_slug;
}
