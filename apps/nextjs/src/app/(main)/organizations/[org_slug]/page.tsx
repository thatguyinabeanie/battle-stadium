import { notFound } from "next/navigation";

import { db } from "@battle-stadium/db";

import { SingleOrgTournamentsTable } from "~/app/(main)/organizations/[org_slug]/_components/tournaments-table";
import { getSingleOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

export const revalidate = 60;
export const dynamicParams = true;

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

export async function generateStaticParams() {
  return (
    await db.query.organizations.findMany({
      where: (organizations, { isNotNull }) => isNotNull(organizations.slug),
    })
  ).map((org) => ({ org_slug: org.slug }));
}

export default async function OrganizationDetailPage(
  props: OrganizationDetailPageProps,
) {
  const { org_slug } = await props.params;
  return <OrganizationContent org_slug={org_slug} />;
}

async function OrganizationContent({ org_slug }: { org_slug: string }) {
  const { organization, tournaments } =
    await getSingleOrganizationTournaments(org_slug);
  if (!organization) {
    notFound();
  }

  return (
    <>
      <section
        aria-label="Organization Header"
        className="z-0 m-4 mt-2 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
      >
        <OrganizationHeader
          organization={organization}
          classNames={{ wrapper: "w-11/12 my-4" }}
        >
          <div className="mx-4 flex h-full w-full flex-col items-center justify-between py-2 text-center">
            <h1 className="text-2xl font-semibold">{organization.name}</h1>
            <p>{organization.description}</p>
          </div>
        </OrganizationHeader>
      </section>

      <section
        aria-label="Organization Tournaments"
        className="z-0 m-4 mt-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
      >
        <SingleOrgTournamentsTable
          className="w-full px-4"
          data={tournaments}
          organization={organization}
        />
      </section>
    </>
  );
}
