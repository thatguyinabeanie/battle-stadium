import type { Metadata } from "next";

import {
  getOrganizations,
  searchOrganizations,
} from "~/app/server-actions/organizations/actions";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { OrganizationsGrid } from "./_components/client-components";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <>
      <PartneredOrganizations />
      <OrganizationsGrid
        getOrSearchOrganizationsAction={getOrSearchOrganizationsAction}
      />
    </>
  );
}

export async function getOrSearchOrganizationsAction(formData?: FormData) {
  "use server";
  if (formData) {
    const query = formData.get("query") as string;
    if (!query.trim()) {
      return await getOrganizations();
    }
    return await searchOrganizations(query);
  }

  return await getOrganizations();
}
