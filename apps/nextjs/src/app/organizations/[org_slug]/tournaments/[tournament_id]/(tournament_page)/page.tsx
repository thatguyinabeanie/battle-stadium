import Link from "next/link";
import { format, parseISO } from "date-fns";

import { Chip, Separator } from "@battle-stadium/ui";

import type { OrganizationTournamentProps } from "~/types";
import {
  getOrganizationTournaments,
  getSingleOrganizationSingleTournament,
} from "~/app/server-actions/organizations/tournaments/actions";
import { getTournament } from "~/app/server-actions/tournaments/actions";
import OrganizationHeader from "~/components/organizations/organization-header";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata (
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const result = await getTournament(params.tournament_id);

  return { title: result?.tournament.name ?? "Tournament" };
}

export async function generateStaticParams () {
  const results = await getOrganizationTournaments(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}

export default function OrganizationTournament (
  _props: Readonly<OrganizationTournamentProps>,
) {
  return null;
}
