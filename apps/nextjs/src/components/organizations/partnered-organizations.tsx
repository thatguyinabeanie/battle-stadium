import { getOrganizations } from "~/app/server-actions/organizations/actions";
import OrganizationCard from "~/components/organizations/organization-card";

export default async function PartneredOrganizations() {
  const { partners } = await getOrganizations();

  return (
    <div className="flex h-full w-full flex-row items-center justify-center bg-transparent">
      {partners.map((organization) => (
        <OrganizationCard
          key={organization.id}
          aria-label={`organization-card-${organization.id}`}
          organization={organization}
        />
      ))}
    </div>
  );
}
