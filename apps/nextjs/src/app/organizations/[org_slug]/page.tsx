import { notFound } from "next/navigation";

import {
  getOrganization,
  getOrganizations,
} from "~/app/server-actions/organizations/actions";
import { getSingleOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";
import { SingleOrganizationTournamentsTable } from "~/components/tournaments/single-organization-tournaments-table";

export const revalidate = 200;
export const dynamicParams = true;

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

export async function generateMetadata(
  props: Readonly<OrganizationDetailPageProps>,
) {
  const { org_slug } = await props.params;
  let org;
  try {
    org = await getOrganization(org_slug);
  } catch (error) {
    console.error("Failed to fetch organization:", error);
    org = null;
  }
  return { title: org?.name ?? "Organization" };
}

export async function generateStaticParams() {
  const orgs = await getOrganizations();

  return orgs.filter((org) => org.slug).map((org) => ({ org_slug: org.slug }));
}

export default async function OrganizationDetailPage(
  props: Readonly<OrganizationDetailPageProps>,
) {
  const params = await props.params;
  const { organization, tournaments } = await getSingleOrganizationTournaments(
    params.org_slug,
  );

  if (!organization) {
    notFound();
  } else {
    return (
      <>
        <OrganizationHeader
          organization={organization}
          classNames={{ wrapper: "my-8" }}
        >
          <div className="mx-4 flex h-full w-full flex-col items-center justify-between py-2 text-center">
            <h1 className="text-2xl font-semibold">{organization.name}</h1>
            <p>{organization.description}</p>
          </div>
        </OrganizationHeader>

        <SingleOrganizationTournamentsTable
          className="w-full px-4"
          data={tournaments}
          organization={organization}
        />
      </>
    );
  }
}
