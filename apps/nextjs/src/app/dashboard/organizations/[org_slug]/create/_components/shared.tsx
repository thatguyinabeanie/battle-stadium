import React from "react";

import type { Organization } from "@battle-stadium/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@battle-stadium/ui";

import type { getGames } from "~/app/server-actions/games/actions";
import type { ChildrenProps } from "~/types";

export enum PairingSystem {
  Swiss = "swiss",
  SingleElimination = "single_elimination",
}

export enum BestOf {
  One = 1,
  Three = 3,
  Five = 5,
  Seven = 7,
}

export enum Advancement {
  Traditional = "traditional",
  MinimumPoint = "minimum-point",
  PointsMinPlayers = "points-min-players",
}

export interface Phase {
  name: string;
  pairingSystem: PairingSystem;
  bestOf: BestOf;
  roundTimer: boolean;
  roundTime: number;
  matchCheckIn: boolean;
  checkInTime: number;
  advancement: Advancement;
}

// TODO: refactor to use an enum for registrationType
export enum RegistrationType {
  Open = "open",
  EntryCode = "entry_code",
  SingleUseCode = "single_use_code",
  InviteOnly = "invite_only",
}

export interface TournamentForm {
  name: string;
  description: string;
  startDate?: Date;
  requireCheckIn: boolean;
  game: string;
  format: string;
  teamSheetRequired: boolean;
  openTeamSheet: boolean;
  registrationType: RegistrationType;
  playerCap: boolean;
  maxPlayers: number;
  lateRegistration: boolean;
  lateTeamSheet: boolean;
  lateCheckIn: boolean;
  phases: Phase[];
}

export interface OrganizationDashboardPageProps {
  org: Organization;
  games: Awaited<ReturnType<typeof getGames>>;
}

export type CardClassNames = Partial<
  Record<"card" | "header" | "title" | "content" | "footer", string>
>;

export interface CardWrapperProps extends ChildrenProps {
  disableCardContentWrapper?: boolean;
  title: string;
  classNames?: CardClassNames;
  footer?: React.ReactNode;
}

export function CardWrapper({
  title,
  classNames,
  children,
  disableCardContentWrapper,
}: CardWrapperProps) {
  return (
    <Card className={`space-y-0 ${classNames?.card}`}>
      <CardHeader className={`flex pb-0 ${classNames?.header}`}>
        <CardTitle className={`text-lg font-bold ${classNames?.title}`}>
          {title}
        </CardTitle>
      </CardHeader>

      {!disableCardContentWrapper && (
        <CardContent className={`space-y-4 ${classNames?.content}`}>
          {children}
        </CardContent>
      )}

      {disableCardContentWrapper && <>{children} </>}
    </Card>
  );
}

export interface SelectOptionItem<T> {
  label: string;
  id: T;
  disabled?: boolean;
}
