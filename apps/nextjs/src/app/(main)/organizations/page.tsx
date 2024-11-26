import type { Metadata } from "next";
import { Suspense } from "react";

import OrganizationsTable from "~/app/components/organizations/organizations-table";
import PartneredOrganizations from "~/app/components/organizations/partnered-organizations";
import { getOrganizations } from "~/app/server-actions/organizations/actions";

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
