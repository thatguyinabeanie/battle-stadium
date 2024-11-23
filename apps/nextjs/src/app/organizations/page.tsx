import type { Metadata } from "next";

import type { Tournament } from "~/lib/api";
import OrganizationsTable from "~/components/organizations/organizations-table";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { getOrganizations } from "../(server-actions)/organizations/actions";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Tournament[];
}

export default async function OrganizationsPage() {
  const orgs = await getOrganizations();
  return (
    <>
      <PartneredOrganizations />
      <OrganizationsTable orgs={orgs} />
    </>
  );
}
