import type { ComponentProps, Dispatch, SetStateAction } from "react";
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

import type { ChildrenProps, ValueOf } from "~/types";

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
  setFormKeyValue: (
    key: keyof TournamentForm,
  ) => (value: ValueOf<TournamentForm>) => void;
  setPhaseKeyValue: (
    phase_index: number,
    key: keyof Phase,
  ) => (value: ValueOf<Phase>) => void;
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

export interface SelectOptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends ComponentProps<typeof UiSelect> {
  id: string;
  placeholder: string;
  options: SelectOptionItem[];
}
export function Select({ id, placeholder, options, ...props }: SelectProps) {
  return (
    <div id={id}>
      <UiSelect {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-black p-3">
          {options.map(({ value, label, disabled }) => (
            <SelectItem key={value} value={value} disabled={disabled}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </UiSelect>
    </div>
  );
}
