import type { Metadata } from "next";

import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import {
  OrganizationsGridSkeleton,
} from "./_components/client-components";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <>
      <PartneredOrganizations />
      <OrganizationsGridSkeleton />
    </>
  );
}
