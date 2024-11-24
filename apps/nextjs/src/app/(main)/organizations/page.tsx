import type { Metadata } from "next";
import { Suspense } from "react";

import type { Tournament } from "~/lib/api";
import { getOrganizations } from "~/app/(main)/server-actions/organizations/actions";
import { MainSection } from "~/components/main-section";
import OrganizationsTable from "~/components/organizations/organizations-table";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Tournament[];
}

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
  return (
    <MainSection>
      <OrganizationsTable orgs={orgs} />
    </MainSection>
  );
}
