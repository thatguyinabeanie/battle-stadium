import type { Metadata } from "next";

import type { Tournament } from "~/lib/api";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { getOrganizations } from "../server-actions/organizations/actions";

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
      <div className="mt-4">
        <PartneredOrganizations />
      </div>

      <div>
        <h2>TODO: Organizations Table</h2>
        {orgs.map((org) => (
          <div key={org.id}>
            <h3>{org.name}</h3>
            <p>{org.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
