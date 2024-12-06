"use client";

import type { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Organization } from "@battle-stadium/db/schema";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  DatePicker,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@battle-stadium/ui";

import type { TournamentForm } from "./tournament-form";
import type { ChildrenProps } from "~/types";
import { STEPS, useCreateTournamentForm } from "./use-create-tournament-form";

export interface OrganizationDashboardPageProps {
  org: Organization;
}

interface TournamentFormProps {
  currentStep?: number;
  addPhase?: () => void;
  handleNext?: () => void;
  handleBack?: () => void;
  handleSubmit?: () => void;
  formData: TournamentForm;
  setFormData: Dispatch<SetStateAction<TournamentForm>>;
}

export default function CreateTournament({
  org,
}: OrganizationDashboardPageProps) {
  const { formData, setFormData, addPhase } = useCreateTournamentForm();

  return (
    <div className="container mx-auto max-h-dvh space-y-6 p-6">
      <h1 className="text-3xl font-bold">Create Tournament for {org.name}</h1>

      {/* <StepWizardProgress currentStep={currentStep} /> */}

      {/* Step Content */}
      <div className="space-y-4 overflow-y-auto">
        <TournamentInformation formData={formData} setFormData={setFormData} />

        <GameInformation formData={formData} setFormData={setFormData} />

        <Registration formData={formData} setFormData={setFormData} />

        <TournamentPhases
          formData={formData}
          setFormData={setFormData}
          addPhase={addPhase}
        />
      </div>

      {/* <Navigation 
        currentStep={currentStep} 
        handleNext={handleNext} 
        handleBack={handleBack} 
        handleSubmit={handleSubmit} 
        formData={formData} 
        setFormData={setFormData} 
      /> */}
    </div>
  );
}

export function StepWizardProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6 flex justify-between">
      {STEPS.map((step) => (
        <div
          key={step.id}
          className={`flex items-center ${
            step.id === currentStep ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step.id === currentStep ? "border-primary" : "border-muted"
              }`}
            >
              {step.id}
            </div>
            <span className="mt-1 text-xs">{step.title}</span>
          </div>
          {step.id !== STEPS.length && (
            <ChevronRight className="mx-2 h-4 w-4" />
          )}
        </div>
      ))}
    </div>
  );
}

interface ShrugProps extends ChildrenProps {
  title: string;
  classNames?: {
    card?: string;
    header?: string;
    title?: string;
    content?: string;
  };
}

function CardWrapper({ title, classNames, children }: ShrugProps) {
  return (
    <Card className={`space-y-4 ${classNames?.card}`}>
      <CardHeader className={`flex pb-0 ${classNames?.header}`}>
        <CardTitle className={`text-lg font-bold ${classNames?.title}`}>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className={`space-y-4 ${classNames?.content}`}>
        {children}
      </CardContent>
    </Card>
  );
}

interface InputWrapperProps extends ChildrenProps {
  htmlFor: string;
  label: string;
}

function InputWrapper({ children, htmlFor, label }: InputWrapperProps) {
  return (
    <div className="grid w-full grid-cols-3 items-center gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function TournamentInformation({ formData, setFormData }: TournamentFormProps) {
  return (
    <CardWrapper title="Tournament Information">
      <InputWrapper htmlFor="tournament_name" label="Tournament Name">
        <Input
          id="tournament_name"
          type="text"
          placeholder="Enter Tournament Name..."
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </InputWrapper>

      <InputWrapper label="Start Date and Time" htmlFor="start_date">
        <DatePicker
          id="start_date"
          date={formData.startDate}
          setDate={(date) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              startDate: date,
            }))
          }
        />
      </InputWrapper>

      <InputWrapper htmlFor="require_check_in" label="Require Check In">
        <div id="require_check_in">
          <Switch
            checked={formData.requireCheckIn}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, requireCheckIn: checked })
            }
          />
        </div>
      </InputWrapper>
    </CardWrapper>
  );
}

function GameInformation({ formData, setFormData }: TournamentFormProps) {
  return (
    <CardWrapper title="Tournament Information">
      <InputWrapper htmlFor="game" label="Game">
        <div id="game">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Game..." />
            </SelectTrigger>
            <SelectContent className="bg-black p-2">
              <SelectItem value="sv">Scarlet and Violet</SelectItem>
              <SelectItem value="swsh">Sword and Shield</SelectItem>
              <SelectItem value="system">Sun and Moon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="format" label="Format">
        <div id="format">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Format..." />
            </SelectTrigger>
            <SelectContent className="bg-black p-2">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </InputWrapper>

      <InputWrapper
        htmlFor="team-sheet-required"
        label="Require Team Sheet Submission?"
      >
        <div id="team-sheet-required">
          <Switch
            checked={formData.teamSheetRequired}
            onCheckedChange={(checked) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                teamSheetRequired: checked,
              }))
            }
          />
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="open-team-sheet" label="Open Team Sheet">
        <div id="open-team-sheet">
          <Switch
            checked={formData.openTeamSheet}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, openTeamSheet: checked })
            }
          />
        </div>
      </InputWrapper>
    </CardWrapper>
  );
}

function Registration({ formData, setFormData }: TournamentFormProps) {
  return (
    <CardWrapper title="Registration">
      <InputWrapper htmlFor="registration_type" label="Registration Type">
        <div id="registration_type">
          <Select
            onValueChange={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                registrationType: value,
              }))
            }
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Registration..." />
            </SelectTrigger>
            <SelectContent className="bg-black p-2">
              <SelectItem value="open-registration">
                Open Registration
              </SelectItem>
              <SelectItem value="entry_code" disabled>
                Entry Code (Coming Soon)
              </SelectItem>
              <SelectItem value="single_use_code" disabled>
                Single-Use Code (Coming Soon)
              </SelectItem>
              <SelectItem value="invite-only" disabled>
                Invite Only (Coming Soon)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="player_cap" label="Player Cap">
        <div id="player_cap">
          <Switch
            checked={formData.playerCap}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, playerCap: checked })
            }
          />
        </div>
      </InputWrapper>

      {formData.playerCap && (
        <InputWrapper htmlFor="max_players" label="Max Players">
          <Input
            name="maxPlayers"
            type="number"
            value={formData.maxPlayers}
            onChange={(e) =>
              setFormData({
                ...formData,
                maxPlayers: Number.parseInt(e.target.value, 10),
              })
            }
          />
        </InputWrapper>
      )}

      <InputWrapper
        htmlFor="allow_late_registration"
        label="Allow Late Registration"
      >
        <Checkbox
          id="allow_late_registration"
          checked={formData.allowLateRegistration}
          onChange={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              allowLateRegistration: !prevFormData.allowLateRegistration,
            }))
          }
        />
      </InputWrapper>

      <InputWrapper
        htmlFor="allow_late_team_sheet"
        label="Allow Late Team Sheet Submission"
      >
        <Checkbox
          id="allow_late_team_sheet"
          checked={formData.allowLateTeamSheet}
          onChange={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              allowLateTeamSheet: !prevFormData.allowLateTeamSheet,
            }))
          }
        />
      </InputWrapper>

      <InputWrapper htmlFor="allow_late_check_in" label="Allow Late Check-In">
        <Checkbox
          id="allow_late_check_in"
          checked={formData.allowLateCheckIn}
          onChange={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              allowLateCheckIn: !prevFormData.allowLateCheckIn,
            }))
          }
        />
      </InputWrapper>
    </CardWrapper>
  );
}

function TournamentPhases({
  formData,
  setFormData,
  addPhase,
}: TournamentFormProps) {
  return (
    <CardWrapper title="Phases">
      {formData.phases.map((phase, index) => (
        <div key={index} className="space-y-4">
          {index > 0 && (
            <div>
              <Label htmlFor={`advancement-${index}`}>Advancement</Label>
              <Select
                name={`advancement-${index}`}
                value={phase.advancement}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    phases: formData.phases.map((p, i) =>
                      i === index ? { ...p, advancement: value } : p,
                    ),
                  })
                }
              >
                <option value="traditional">Traditional Cut</option>
                <option value="minimum-point">Minimum Point Requirement</option>
                <option value="points-min-players">Points + Min Players</option>
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor={`phase-name-${index}`}>Phase Name</Label>
            <Input
              id={`phase-name-${index}`}
              value={phase.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phases: formData.phases.map((p, i) =>
                    i === index ? { ...p, name: e.target.value } : p,
                  ),
                })
              }
            />
          </div>
          <div>
            <Label htmlFor={`pairing-system-${index}`}>Pairing System</Label>
            <Select
              name={`pairing-system-${index}`}
              value={phase.pairingSystem}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  phases: formData.phases.map((p, i) =>
                    i === index ? { ...p, pairingSystem: value } : p,
                  ),
                })
              }
            >
              <option value="Swiss">Swiss Rounds</option>
              <option value="Single Elimination">Single Elimination</option>
            </Select>
          </div>
          <div>
            <Label htmlFor={`best-of-${index}`}>Best Of</Label>
            <Select
              name={`best-of-${index}`}
              value={String(phase.bestOf)}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  phases: formData.phases.map((p, i) =>
                    i === index ? { ...p, bestOf: Number(value) } : p,
                  ),
                })
              }
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={7}>7</option>
            </Select>
          </div>
          <div>
            <Label>Round Timer</Label>
            <Switch
              checked={phase.roundTimer}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  phases: formData.phases.map((p, i) =>
                    i === index ? { ...p, roundTimer: checked } : p,
                  ),
                })
              }
            />
          </div>
          {phase.roundTimer && (
            <div>
              <Label htmlFor={`round-time-${index}`}>Round Time</Label>
              <Input
                id={`round-time-${index}`}
                type="number"
                value={phase.roundTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: formData.phases.map((p, i) =>
                      i === index ? { ...p, roundTime: +e.target.value } : p,
                    ),
                  })
                }
              />
            </div>
          )}
          <div>
            <Label>Match Check-In</Label>
            <Switch
              checked={phase.matchCheckIn}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  phases: formData.phases.map((p, i) =>
                    i === index ? { ...p, matchCheckIn: checked } : p,
                  ),
                })
              }
            />
          </div>
          {phase.matchCheckIn && (
            <div>
              <Label htmlFor={`check-in-time-${index}`}>Check-In Time</Label>
              <Input
                id={`check-in-time-${index}`}
                type="number"
                value={phase.checkInTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: formData.phases.map((p, i) =>
                      i === index ? { ...p, checkInTime: +e.target.value } : p,
                    ),
                  })
                }
              />
            </div>
          )}
        </div>
      ))}
      <Button onClick={addPhase}>Add Phase</Button>
    </CardWrapper>
  );
}

export function Navigation({
  currentStep,
  handleNext,
  handleBack,
  handleSubmit,
}: TournamentFormProps) {
  return (
    <div className="mt-6 flex justify-between">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      {currentStep === STEPS.length ? (
        <Button onClick={handleSubmit}>Create Tournament</Button>
      ) : (
        <Button onClick={handleNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
