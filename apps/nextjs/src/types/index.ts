import type { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ChildrenProps {
  children?: ReactNode;
}

export interface PageTitleProps {
  title: string;
}

export interface DashboardLayoutSlots extends ChildrenProps {
  profiles: ReactNode;
  pokemon: ReactNode;
  tournament_history: ReactNode;
  settings: ReactNode;
  organizations: ReactNode;
  admin: ReactNode;
}

export interface OrganizationSlugProps {
  org_slug: string;
}

export interface OrganizationSlugParams {
  params: Promise<OrganizationSlugProps>;
}

export interface OrganizationTournamentProps {
  org_slug: string;
  tournament_id: number;
}

export interface OrganizationTournamentParams {
  params: Promise<OrganizationTournamentProps>;
}

/**
 * Configuration for tournament page navigation tabs
 * @property value - Unique identifier for the tab
 * @property title - Display text for the tab (optional)
 */
export interface TabConfig {
  value: string;
  title?: string;
  classNames?: {
    tabsTrigger?: string;
    badge?: string;
  };
}

/**
 * Interface for managing authentication tokens
 * @property oidc - OpenID Connect token for authentication
 * @property clerk - Clerk authentication token
 */
export interface Tokens {
  oidc: string | null;
  clerk: string | null;
}
