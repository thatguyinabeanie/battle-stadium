import Link from "next/link";
import { format, parseISO } from "date-fns";

import type { Organization, Tournament } from "@battle-stadium/db/schema";
import { Chip } from "@battle-stadium/ui";

import type { OrganizationTournamentProps } from "~/types";
import {
  getOrganizationTournaments,
  getSingleOrganizationSingleTournament,
} from "~/app/server-actions/organizations/tournaments/actions";
import { getTournament } from "~/app/server-actions/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const result = await getTournament(params.tournament_id);

  return { title: result?.tournament.name ?? "Tournament" };
}

export async function generateStaticParams() {
  const results = await getOrganizationTournaments(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
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
          wrapper: "border border-1 w-11/12 border-x-0 border-t-0",
        }}
      >
        <TournamentDetails
          tournament={tournament}
          organization={organization}
        />
      </OrganizationHeader>

      <TournamentDetailChips
        org_slug={org_slug}
        tournament_id={tournament_id}
      />
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
      <p className="text-right">{left}</p>
      <p className="text-left">{right}</p>
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
function TournamentDetailChips(props: Readonly<TournamentDetailChipsProps>) {
  const { org_slug, tournament_id } = props;

  return (
    <div className="flex w-full flex-row items-center justify-center gap-1">
      <Chip variant="solid">Solid</Chip>
      <Chip variant="bordered">Bordered</Chip>
      <Chip variant="light">Light</Chip>
      <Chip variant="flat">Flat</Chip>
      <Link
        prefetch={true}
        href={`/organizations/${org_slug}/tournaments/${tournament_id}/register`}
      >
        <Chip>Register</Chip>
      </Link>
    </div>
  );
}
