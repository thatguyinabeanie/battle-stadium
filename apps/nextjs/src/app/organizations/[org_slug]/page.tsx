// import TournamentsTable from "~/components/tournaments-table";
import {
  getOrganization,
  getOrganizations,
} from "~/app/server-actions/organizations/actions";
import { getOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

export const revalidate = 200;
export const dynamicParams = true;

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

export async function generateMetadata(
  props: Readonly<OrganizationDetailPageProps>,
) {
  const params = await props.params;
  const org = await getOrganization(params.org_slug);

  return { title: org?.name ?? "Organization" };
}

export async function generateStaticParams() {
  const orgs = await getOrganizations();

  return orgs.map(({ slug }) => ({ org_slug: slug }));
}

// const columns = [
//   {
//     key: "start_at",
//     label: "DATE",
//   },
//   {
//     key: "name",
//     label: "NAME",
//   },

//   {
//     key: "players",
//     label: "PLAYERS",
//   },
//   {
//     key: "registration",
//     label: "REGISTRATION",
//   },
//   {
//     key: "game",
//     label: "GAME",
//   },
//   {
//     key: "format",
//     label: "FORMAT",
//   },
// ];

export default async function OrganizationDetailPage(
  props: Readonly<OrganizationDetailPageProps>,
) {
  const params = await props.params;
  const organization = await getOrganization(params.org_slug);

  if (!organization) {
    return <div>404 - Not Found</div>;
  }

  const tournaments = await getOrganizationTournaments(params.org_slug);

  return (
    <>
      <OrganizationHeader organization={organization}>
        <div className="mx-4 flex h-full w-full flex-col items-center justify-between py-2 text-center">
          <h1 className="text-2xl font-semibold">{organization.name}</h1>
          <p>{organization.description}</p>
        </div>
      </OrganizationHeader>

      <div>
        <h2>TODO: tournament table</h2>
        {tournaments.map((tournament) => (
          <div key={tournament.id}>
            <h3>{tournament.name}</h3>
            <p>{tournament.start_at}</p>
          </div>
        ))}
      </div>
      {/* <Divider /> */}

      {/* <TournamentsTable columns={columns} data={tournaments} /> */}
    </>
  );
}
