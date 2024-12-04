"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Organization } from "@battle-stadium/db/schema";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Label,
  Select,
  Switch,
  Textarea,
} from "@battle-stadium/ui";

const STEPS = [
  { id: 1, title: "Tournament Information" },
  { id: 2, title: "Game Information" },
  { id: 3, title: "Registration" },
  { id: 4, title: "Late Players" },
  { id: 5, title: "Phases" },
];

// TODO: refactor to use enums for pairingSystem, bestOf, and advancement
interface Phase {
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
interface TournamentForm {
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

interface OrganizationDashboardPageProps {
  org: Organization;
}

export default function CreateTournament({
  org,
}: OrganizationDashboardPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  // TODO: replace with form library like react-hook-form
  const [formData, setFormData] = useState<TournamentForm>({
    name: "",
    description: "",
    startDate: new Date(),
    requireCheckIn: false,
    game: "",
    format: "",
    teamSheetRequired: true,
    openTeamSheet: true,
    registrationType: "Open",
    playerCap: false,
    maxPlayers: 0,
    allowLateRegistration: false,
    allowLateTeamSheet: false,
    allowLateCheckIn: false,
    phases: [],
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const addPhase = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phases: [
        ...prevFormData.phases,
        {
          name: "",
          pairingSystem: "Swiss",
          bestOf: 1,
          roundTimer: false,
          roundTime: 0,
          matchCheckIn: false,
          checkInTime: 0,
          advancement: "traditional",
        },
      ],
    }));
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold">Create Tournament for {org.name}</h1>

      {/* Step Progress */}
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

      {/* Step Content */}
      <div className="py-4">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Tournament Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Start Date and Time</Label>

              <DatePicker
                date={formData.startDate}
                setDate={(date) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    startDate: date,
                  }))
                }
              />
            </div>
            <div>
              <Label>Require Check-In</Label>
              <Switch
                checked={formData.requireCheckIn}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, requireCheckIn: checked })
                }
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="game">Game</Label>
              <Select
                name="game"
                value={formData.game}
                onValueChange={(value) =>
                  setFormData({ ...formData, game: value })
                }
              >
                <option value="game1">Game 1</option>
                <option value="game2">Game 2</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select
                name="format"
                value={formData.format}
                onValueChange={(value) =>
                  setFormData({ ...formData, format: value })
                }
              >
                <option value="single-elimination">Single Elimination</option>
                <option value="double-elimination">Double Elimination</option>
              </Select>
            </div>
            <div>
              <Label>Team Sheet Submission Required</Label>
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
            <div>
              <Label>Open Team Sheet</Label>
              <Switch
                checked={formData.openTeamSheet}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, openTeamSheet: checked })
                }
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="registrationType">Registration Type</Label>
              <Select
                name="registrationType"
                value={formData.registrationType}
                onValueChange={(value) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    registrationType: value,
                  }))
                }
              >
                <option value="Open">Open Registration</option>
                <option value="Entry Code">Entry Code</option>
                <option value="Single-Use Code">Single-Use Code</option>
                <option value="Invite Only">Invite Only</option>
              </Select>
            </div>
            <div>
              <Label>Player Cap</Label>
              <Switch
                checked={formData.playerCap}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, playerCap: checked })
                }
              />
            </div>
            {formData.playerCap && (
              <div>
                <Label htmlFor="maxPlayers">Max Players</Label>
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
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <Checkbox
                checked={formData.allowLateRegistration}
                onChange={() =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    allowLateRegistration: !prevFormData.allowLateRegistration,
                  }))
                }
              />
              <Label>Allow Late Registration</Label>
            </div>
            <div>
              <Checkbox
                checked={formData.allowLateTeamSheet}
                onChange={() =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    allowLateTeamSheet: !prevFormData.allowLateTeamSheet,
                  }))
                }
              />
              <Label>Allow Late Team Sheet Submission</Label>
            </div>
            <div>
              <Checkbox
                checked={formData.allowLateCheckIn}
                onChange={() =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    allowLateCheckIn: !prevFormData.allowLateCheckIn,
                  }))
                }
              />
              <Label>Allow Late Check-In</Label>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
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
                      <option value="minimum-point">
                        Minimum Point Requirement
                      </option>
                      <option value="points-min-players">
                        Points + Min Players
                      </option>
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
                  <Label htmlFor={`pairing-system-${index}`}>
                    Pairing System
                  </Label>
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
                    <option value="Single Elimination">
                      Single Elimination
                    </option>
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
                            i === index
                              ? { ...p, roundTime: +e.target.value }
                              : p,
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
                    <Label htmlFor={`check-in-time-${index}`}>
                      Check-In Time
                    </Label>
                    <Input
                      id={`check-in-time-${index}`}
                      type="number"
                      value={phase.checkInTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phases: formData.phases.map((p, i) =>
                            i === index
                              ? { ...p, checkInTime: +e.target.value }
                              : p,
                          ),
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            <Button onClick={addPhase}>Add Phase</Button>
          </div>
        )}
      </div>

      {/* Navigation */}
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
    </div>
  );
}
