import Link from "next/link";
import { format, parseISO } from "date-fns";

import type { Organization, Tournament } from "@battle-stadium/db/schema";
import { Chip } from "@battle-stadium/ui";

import type { OrganizationTournamentProps } from "~/types";
import { getSingleOrganizationSingleTournament } from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return await generateOrganizationTournamentsStaticParams();
}

export default async function OrganizationTournamentHeader(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;
  const { organization, tournament } =
    await getSingleOrganizationSingleTournament(org_slug, tournament_id);

  if (!organization || !tournament) {
    return <div>404 - Not Found</div>;
  }

  return (
    <>
      <OrganizationHeader
        organization={organization}
        classNames={{
          wrapper: "w-11/12 border border-1 border-x-0 border-t-0 my-4",
        }}
      >
        <TournamentDetails
          tournament={tournament}
          organization={organization}
        />

        <TournamentDetailChips
          org_slug={org_slug}
          tournament_id={tournament_id}
        />
      </OrganizationHeader>
    </>
  );
}
interface TournamentDetailsProps {
  tournament: Tournament;
  organization: Organization;
}

function TournamentDetails({
  tournament,
  organization,
}: Readonly<TournamentDetailsProps>) {
  return (
    <div className="mx-4 flex h-full w-full flex-col items-center justify-between text-center">
      <h1 className="w-full text-2xl font-semibold">{tournament.name}</h1>

      <div className="pt-2" />

      <div className="grid w-full grid-cols-2 justify-center gap-2">
        <LeftRightGrid left="Presented By:" right={organization.name} />
        <LeftRightGrid
          left="Date:"
          right={formatTimestamp(tournament.startAt, "PP")}
        />
        <LeftRightGrid
          left="Start Time:"
          right={formatTimestamp(tournament.startAt, "p")}
        />
        <LeftRightGrid
          left="Check In:"
          right={formatTimestamp(tournament.checkInStartAt, "p")}
        />
        <LeftRightGrid left="Rounds:" right={9} />
      </div>
    </div>
  );
}

function LeftRightGrid({
  left,
  right,
}: {
  left: string | null;
  right?: string | number | null;
}) {
  return (
    <>
      <p className="md:text-md text-right text-sm">{left}</p>
      <p className="md:text-md text-left text-sm">{right}</p>
    </>
  );
}
function formatTimestamp(timestamp?: string | null, formatStr = "PPp") {
  if (!timestamp) {
    return "N/A";
  }
  return format(parseISO(timestamp), formatStr);
}

interface TournamentDetailChipsProps {
  org_slug: string;
  tournament_id: number;
}
export function TournamentDetailChips(
  props: Readonly<TournamentDetailChipsProps>,
) {
  const { org_slug, tournament_id } = props;

  return (
    <div className="flex w-full flex-row items-center justify-center gap-1">
      <Link
        prefetch={true}
        href={`/organizations/${org_slug}/tournaments/${tournament_id}/register`}
      >
        <Chip variant="light">Register</Chip>
      </Link>
    </div>
  );
}
