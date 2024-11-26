import { Suspense } from "react";
import { notFound } from "next/navigation";

import { SingleOrgTournamentsTable } from "~/app/(main)/organizations/[org_slug]/_components/tournaments-table";
import OrganizationHeader from "~/app/components/organizations/organization-header";
import { getOrganizations } from "~/app/server-actions/organizations/actions";
import { getSingleOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  const orgs = await getOrganizations();

  return orgs.filter((org) => org.slug).map((org) => ({ org_slug: org.slug }));
}

export default function OrganizationDetailPage(
  props: Readonly<OrganizationDetailPageProps>,
) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrganizationDetails {...props} />
    </Suspense>
  );
}

async function OrganizationDetails(
  props: Readonly<OrganizationDetailPageProps>,
) {
  const params = await props.params;
  const { organization, tournaments } = await getSingleOrganizationTournaments(
    params.org_slug,
  );

  if (!organization) {
    notFound();
  }

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

      <SingleOrgTournamentsTable
        className="w-full px-4"
        data={tournaments}
        organization={organization}
      />
    </>
  );
}
