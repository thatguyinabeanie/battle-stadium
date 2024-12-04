import { useState } from "react";
import { Button, Input, Textarea, Select, Checkbox, Toggle, Label, DatePicker, Switch } from "@battle-stadium/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@battle-stadium/ui";
import {ChevronRight, ChevronLeft} from "lucide-react";

const STEPS = [
  { id: 1, title: "Tournament Information" },
  { id: 2, title: "Game Information" },
  { id: 3, title: "Registration" },
  { id: 4, title: "Late Players" },
  { id: 5, title: "Phases" },
];

interface Phase  {
  name: string;
  pairingSystem: "Swiss" | "Single Elimination";
  bestOf: 1 | 3 | 5 | 7;
  roundTimer: boolean;
  roundTime: number;
  matchCheckIn: boolean;
  checkInTime: number;
  advancement: "traditional" | "minimum-point" | "points-min-players";
}

interface TournamentForm {
  name: string;
  description: string;
  startDate: Date;
  requireCheckIn: boolean;
  game: string;
  format: string;
  teamSheetRequired: true,
  openTeamSheet: true,
  registrationType: "Open" | "Entry Code" | "Single-Use Code" | "Invite Only",
  playerCap: boolean,
  maxPlayers: number,
  allowLateRegistration: boolean;
  allowLateTeamSheet: boolean;
  allowLateCheckIn: boolean;
  phases: Phase[],
}

export default function CreateTournamentPage() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleSubmit = async () => {
    // TODO: Implement tournament creation
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
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create Tournament</h1>

      {/* Step Progress */}
      <div className="flex justify-between mb-6">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={`flex items-center ${
              step.id === currentStep ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  step.id === currentStep ? "border-primary" : "border-muted"
                }`}
              >
                {step.id}
              </div>
              <span className="text-xs mt-1">{step.title}</span>
            </div>
            {step.id !== STEPS.length && (
              <ChevronRight className="w-4 h-4 mx-2" />
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
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Start Date and Time</Label>

              {/* <DatePicker
                date={formData.startDate}
                setDate={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
              /> */}
            </div>
            <div>
              <Label>Require Check-In</Label>
              <Toggle
                checked={formData.requireCheckIn}
                onChange={(checked) =>
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
                id="game"
                value={formData.game}
                onChange={(e) =>
                  setFormData({ ...formData, game: e.target.value })
                }
              >
                <option value="game1">Game 1</option>
                <option value="game2">Game 2</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select
                id="format"
                value={formData.format}
                onChange={(e) =>
                  setFormData({ ...formData, format: e.target.value })
                }
              >
                <option value="single-elimination">Single Elimination</option>
                <option value="double-elimination">Double Elimination</option>
              </Select>
            </div>
            <div>
              <Label>Team Sheet Submission Required</Label>
              <Toggle
                checked={formData.teamSheetRequired}
                onChange={(checked) =>
                  setFormData({ ...formData, teamSheetRequired: checked })
                }
              />
            </div>
            <div>
              <Label>Open Team Sheet</Label>
              <Toggle
                checked={formData.openTeamSheet}
                onChange={(checked) =>
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
                id="registrationType"
                value={formData.registrationType}
                onChange={(e) =>
                  setFormData({ ...formData, registrationType: e.target.value })
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
              <Toggle
                checked={formData.playerCap}
                onChange={(checked) =>
                  setFormData({ ...formData, playerCap: checked })
                }
              />
            </div>
            {formData.playerCap && (
              <div>
                <Label htmlFor="maxPlayers">Max Players</Label>
                <Input
                  id="maxPlayers"
                  type="number"
                  value={formData.maxPlayers}
                  onChange={(e) =>
                    setFormData({ ...formData, maxPlayers: +e.target.value })
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowLateRegistration: e.target.checked,
                  })
                }
              />
              <Label>Allow Late Registration</Label>
            </div>
            <div>
              <Checkbox
                checked={formData.allowLateTeamSheet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowLateTeamSheet: e.target.checked,
                  })
                }
              />
              <Label>Allow Late Team Sheet Submission</Label>
            </div>
            <div>
              <Checkbox
                checked={formData.allowLateCheckIn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowLateCheckIn: e.target.checked,
                  })
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
                    <Label htmlFor={`advancement-${index}`}>
                      Advancement
                    </Label>
                    <Select
                      id={`advancement-${index}`}
                      value={phase.advancement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phases: formData.phases.map((p, i) =>
                            i === index
                              ? { ...p, advancement: e.target.value }
                              : p
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
                          i === index ? { ...p, name: e.target.value } : p
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
                    // id={`pairing-system-${index}`}
                    value={phase.pairingSystem}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phases: formData.phases.map((p, i) =>
                          i === index
                            ? { ...p, pairingSystem: e.target.value }
                            : p
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
                    id={`best-of-${index}`}
                    value={phase.bestOf}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phases: formData.phases.map((p, i) =>
                          i === index ? { ...p, bestOf: +e.target.value } : p
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
                  <Toggle
                    checked={phase.roundTimer}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        phases: formData.phases.map((p, i) =>
                          i === index ? { ...p, roundTimer: checked } : p
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
                            i === index ? { ...p, roundTime: +e.target.value } : p
                          ),
                        })
                      }
                    />
                  </div>
                )}
                <div>
                  <Label>Match Check-In</Label>
                  <Toggle
                    checked={phase.matchCheckIn}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        phases: formData.phases.map((p, i) =>
                          i === index ? { ...p, matchCheckIn: checked } : p
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
                            i === index ? { ...p, checkInTime: +e.target.value } : p
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
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {currentStep === STEPS.length ? (
          <Button onClick={handleSubmit}>Create Tournament</Button>
        ) : (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
