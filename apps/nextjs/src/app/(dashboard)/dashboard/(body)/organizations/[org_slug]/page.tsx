interface OrganizationDashboardPageProps {
  params: Promise<{ org_slug: string }>;
}
export default async function OrganizationDashboardPage({
  params,
}: OrganizationDashboardPageProps) {
  const { org_slug } = await params;
  return org_slug;
}
