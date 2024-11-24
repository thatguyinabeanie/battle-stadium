import type { OrganizationTournamentProps } from "~/types";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";

export async function generateStaticParams() {
  return await generateOrganizationTournamentsStaticParams();
}

export default function MatchPage(
  _props: Readonly<OrganizationTournamentProps>,
) {
  return (
    <>
      <p>Matches content</p>
    </>
  );
}
