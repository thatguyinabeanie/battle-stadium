import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";

import type { Organization, Tournament } from "@battle-stadium/db/schema";
import { Chip } from "@battle-stadium/ui";

import type {
  OrganizationTournamentParams,
  OrganizationTournamentProps,
} from "~/types";
import {
  getOrganizationTournamentsRaw,
  getSingleOrganizationSingleTournament,
} from "~/app/server-actions/organizations/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

export async function generateStaticParams() {
  try {
    const data = await getOrganizationTournamentsRaw();
    return data.map(({ tournaments, organizations }) => ({
      org_slug: organizations?.slug,
      tournament_id: tournaments.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function OrganizationTournamentHeaderSlot(props: Readonly<OrganizationTournamentParams>) {
  const { org_slug, tournament_id } = await props.params;

  return (
    <OrganizationTournamentHeaderWrapped
      org_slug={ org_slug }
      tournament_id={ tournament_id }
    />
  );
}

async function OrganizationTournamentHeaderWrapped({
  org_slug,
  tournament_id,
}: Readonly<OrganizationTournamentProps>) {
  "use cache";

  const { organization, tournament } =
    await getSingleOrganizationSingleTournament(org_slug, tournament_id);

  if (!organization) {
    notFound();
  }
  if (!tournament) {
    notFound();
  }

  return (
    <>
      <OrganizationHeader
        organization={organization}
        classNames={{
          wrapper: "w-11/12 my-4",
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
      <p className="md:text-md text-md text-right">{left}</p>
      <p className="md:text-md text-md text-left">{right}</p>
    </>
  );
}

function formatTimestamp(timestamp?: string | null, formatStr = "PPp") {
  if (!timestamp) {
    return "N/A";
  }
  return format(parseISO(timestamp), formatStr);
}

function TournamentDetailChips({
  org_slug,
  tournament_id,
}: Readonly<OrganizationTournamentProps>) {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-1">
      <Link
        prefetch={true}
        href={`/organizations/${org_slug}/tournaments/${tournament_id}/register`}
        aria-label="Register for tournament"
      >
        <Chip variant="light">Register</Chip>
      </Link>
    </div>
  );
}
