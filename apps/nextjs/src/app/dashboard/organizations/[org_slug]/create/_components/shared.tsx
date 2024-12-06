import type { Dispatch, SetStateAction } from "react";
import React from "react";

import type { Organization } from "@battle-stadium/db/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UiSelect,
} from "@battle-stadium/ui";

import type { ChildrenProps } from "~/types";

// TODO: refactor to use enums for pairingSystem, bestOf, and advancement
export interface Phase {
  name: string;
  pairingSystem: string; // "Swiss" | "Single Elimination";
  bestOf: number; //1 | 3 | 5 | 7;
  roundTimer: boolean;
  roundTime: number;
  matchCheckIn: boolean;
  checkInTime: number;
  advancement: string; //"traditional" | "minimum-point" | "points-min-players";
}

// TODO: refactor to use an enum for registrationType
export interface TournamentForm {
  name: string;
  description: string;
  startDate?: Date;
  requireCheckIn: boolean;
  game: string;
  format: string;
  teamSheetRequired: boolean;
  openTeamSheet: boolean;
  registrationType: string; //| "Open" | "Entry Code" | "Single-Use Code" | "Invite Only",
  playerCap: boolean;
  maxPlayers: number;
  allowLateRegistration: boolean;
  allowLateTeamSheet: boolean;
  allowLateCheckIn: boolean;
  phases: Phase[];
}

export interface OrganizationDashboardPageProps {
  org: Organization;
}

export interface TournamentFormProps {
  currentStep?: number;
  addPhase?: () => void;
  handleNext?: () => void;
  handleBack?: () => void;
  handleSubmit?: () => void;
  formData: TournamentForm;
  setFormData: Dispatch<SetStateAction<TournamentForm>>;
}

export interface InputWrapperProps extends ChildrenProps {
  htmlFor: string;
  label: string;
}

export function InputWrapper({ children, htmlFor, label }: InputWrapperProps) {
  return (
    <div className="grid w-full grid-cols-3 items-center gap-2">
      <Label
        htmlFor={htmlFor}
        className="col-span-1 text-right text-muted-foreground"
      >
        {label}
      </Label>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

export interface CardWrapperProps extends ChildrenProps {
  disableCardContentWrapper?: boolean;
  title: string;
  classNames?: {
    card?: string;
    header?: string;
    title?: string;
    content?: string;
    footer?: string;
  };
  footer?: React.ReactNode;
}

export function CardWrapper({
  title,
  classNames,
  children,
  disableCardContentWrapper,
}: CardWrapperProps) {
  return (
    <Card className={`space-y-0 p-4 ${classNames?.card}`}>
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

export interface SelectOptionItem {
  label: string;
  value: string;
}

export interface SelectProps {
  id: string;
  placeholder: string;
  options: SelectOptionItem[];
}
export function Select({ id, placeholder, options }: SelectProps) {
  return (
    <div id={id}>
      <UiSelect>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-black p-3">
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </UiSelect>
    </div>
  );
}
