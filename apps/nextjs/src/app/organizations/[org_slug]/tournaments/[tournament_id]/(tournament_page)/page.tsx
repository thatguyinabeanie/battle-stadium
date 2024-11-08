import {
  getTournament,
  getTournaments,
} from "~/app/server-actions/tournaments/actions";

import OrganizationHeader from "~/components/organizations/organization-header";
import type {OrganizationTournamentProps} from "~/types";

import Link from "next/link";
import Chip from "@battle-stadium/ui/chip";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata (
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const tournament = (await getTournament(params.tournament_id)).data;

  return { title: tournament?.name ?? "Tournament" };
}

export async function generateStaticParams () {
  const tournaments = (await getTournaments()).data?.data ?? [];

  return tournaments.map(({ organization, id }) => ({
    org_slug: organization.slug,
    tournament_id: id.toString(),
  }));
}

export default async function OrganizationTournament (
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;
  const tournament = (await getTournament(tournament_id)).data;

  if (!tournament) {
    return <div>404 - Not Found</div>;
  }

  const { organization } = tournament;

  return (
    <>
      <div className="pt-2" />
      <OrganizationHeader organization={ organization }>
        <div className="mx-4 flex h-full flex-col items-center justify-between text-center">
          <h1 className="text-2xl font-semibold">{ tournament.name }</h1>
          <h2 className="flex flex-row gap-1">
            <p className="font-bold">Presented By: </p>
            { organization.name }
          </h2>

          <div className="pt-2" />

          <p>Registration: { tournament.registration_start_at }</p>
          <p>Starts: { tournament.start_at }</p>
          <p>Check in opens: { tournament.check_in_start_at } </p>

          <div className="pt-2" />
        </div>

        <div className="pt-2" />

        <TournamentDetailChips
          org_slug={ org_slug }
          tournament_id={ tournament_id }
        />
      </OrganizationHeader>

      <div className="pt-2" />
      {/* <Divider /> */ }
      <div>
        <h2>TODO: Divider component</h2>
      </div>
      <div className="pt-2" />
    </>
  );
}

interface TournamentDetailChipsProps {
  org_slug: string;
  tournament_id: number;
}
function TournamentDetailChips (props: Readonly<TournamentDetailChipsProps>) {
  const { org_slug, tournament_id } = props;

  return (
    <div className="flex w-full flex-row items-center justify-center gap-1">
      <Chip variant="solid">Solid</Chip>
      <Chip variant="bordered">Bordered</Chip>
      <Chip variant="light">Light</Chip>
      <Chip variant="flat">Flat</Chip>
      <Link
        href={ `/organizations/${org_slug}/tournaments/${tournament_id}/register` }
      >
        <Chip>Register</Chip>
      </Link>
    </div>
  );
}
