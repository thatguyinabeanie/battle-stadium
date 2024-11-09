import type { Metadata } from "next";

import type { Tournament } from "~/lib/api";
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
      <div className="mt-8 md:mt-20">
        <PartneredOrganizations />
      </div>

      <div>
        <h2>TODO: Organizations Table</h2>
      </div>
    </>
  );
}
