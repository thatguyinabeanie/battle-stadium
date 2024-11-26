import type { Metadata } from "next";
import { Suspense } from "react";

import { getOrganizations } from "~/app/server-actions/organizations/actions";
import OrganizationsTable from "~/components/organizations/organizations-table";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <>
      <PartneredOrganizations />
      <OrganizationsTableSuspenseWrapper />
    </>
  );
}

function OrganizationsTableSuspenseWrapper() {
  // TODO: Implement a proper skeleton for OrganizationsTable
  return (
    <Suspense fallback={<div>Loading organizations...</div>}>
      <OrganizationsTableServerComponent />
    </Suspense>
  );
}

async function OrganizationsTableServerComponent() {
  const orgs = await getOrganizations();
  return <OrganizationsTable orgs={orgs} />;
}
