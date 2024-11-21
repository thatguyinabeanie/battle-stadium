import type { OrganizationTournamentProps } from "~/types";
import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return await generateOrganizationTournamentsStaticParams();
}

export default function Metagame(
  _props: Readonly<OrganizationTournamentProps>,
) {
  return <p>Metagame content</p>;
}
