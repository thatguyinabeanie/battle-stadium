import type { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ChildrenProps {
  children: ReactNode;
}

export interface PageTitleProps {
  title: string;
}

export interface DashboardLayoutProps extends ChildrenProps {
  profiles: ReactNode;
  pokemon: ReactNode;
  tournament_history: ReactNode;
  settings: ReactNode;
  organizations: ReactNode;
  admin: ReactNode;
}

export interface OrganizationTournamentProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>;
}
