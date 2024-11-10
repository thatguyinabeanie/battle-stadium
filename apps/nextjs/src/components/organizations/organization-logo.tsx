import type { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import type { Organization } from "@battle-stadium/db/schema";

interface OrganizationLogoProps {
  alt?: string;
  src?: string;
  priority?: boolean;
  organization: Organization;
  className?: string;
  logoSize: number;
  blurDataURL?: string;
  placeholder?: PlaceholderValue;
}

const DEFAULT_BLUR_DATA_URL = "/pokemon/vgc.png";

export default function OrganizationLogo({
  alt,
  priority,
  placeholder,
  organization,
  className,
  logoSize,
  blurDataURL,
}: Readonly<OrganizationLogoProps>) {
  return (
    <Image
      alt={organization.name ?? alt ?? ""}
      aria-label={organization.name ?? alt ?? ""}
      blurDataURL={blurDataURL ?? DEFAULT_BLUR_DATA_URL}
      className={className}
      height={logoSize}
      placeholder={placeholder ?? "blur"}
      priority={priority ?? false}
      src={organization.logoUrl ?? DEFAULT_BLUR_DATA_URL}
      width={logoSize}
    />
  );
}
