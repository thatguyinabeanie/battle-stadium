import type { OrganizationTournamentProps } from "~/types";

// import { generateOrganizationTournamentsStaticParams } from "~/lib/organization-tournaments-static-params";
// export async function generateStaticParams () {
//   return await generateOrganizationTournamentsStaticParams();
// }
export default function Metagame(
  _props: Readonly<OrganizationTournamentProps>,
) {
  return <p>Metagame content</p>;
}
