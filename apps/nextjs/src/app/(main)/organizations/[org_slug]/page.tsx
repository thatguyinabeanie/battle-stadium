import { notFound } from "next/navigation";

// import { db } from "@battle-stadium/db";

// import { SingleOrgTournamentsTable } from "~/app/(main)/organizations/[org_slug]/_components/tournaments-table";
import { getSingleOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

// export async function generateStaticParams() {
//   return (
//     await db.query.organizations.findMany({
//       where: (organizations, { isNotNull }) => isNotNull(organizations.slug),
//     })
//   ).map((org) => ({ org_slug: org.slug }));
// }

export default async function OrganizationDetailPage({
  params,
}: OrganizationDetailPageProps) {
  const { org_slug } = await params;
  return <OrganizationContent org_slug={ org_slug } />;
}

async function OrganizationContent({ org_slug }: { org_slug: string }) {

  const { organization } = await getSingleOrganizationTournaments(org_slug);
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

      {/* <SingleOrgTournamentsTable
        className="w-full px-4"
        data={tournaments}
        organization={organization}
      /> */}
    </>
  );
}
