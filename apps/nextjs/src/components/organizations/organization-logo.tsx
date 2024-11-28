import type { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import type { Organization } from "@battle-stadium/db/schema";

interface OrganizationLogoProps {
  altName?: string;
  src?: string;
  priority?: boolean;
  organization: Organization;
  className?: string;
  logoSize: number;
  blurDataURL?: string;
  placeholder?: PlaceholderValue;
  quality?: number;
}

const DEFAULT_ORG_IMAGE = "/images/pokemon/vgc.png";
export const DEFAULT_DATA_TABLE_IMAGE_SIZE = 30;

export default function OrganizationLogo({
  altName,
  priority,
  organization,
  className,
  logoSize,
  quality,
}: Readonly<OrganizationLogoProps>) {
  return (
    <div className="flex justify-center">
      <Image
        quality={quality}
        alt={altName ?? organization.name}
        aria-label={altName ?? organization.name}
        className={`${className} aspect-square`}
        priority={priority ?? false}
        src={organization.logoUrl ?? DEFAULT_ORG_IMAGE}
        height={logoSize}
        width={logoSize}
      />
    </div>
  );
}
