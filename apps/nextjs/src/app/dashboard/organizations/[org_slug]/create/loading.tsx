import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Button,
  DatePicker,
  Input,
  Label,
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

const formData: TournamentForm = {
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
};

const currentStep = 1;
export default function CreateTournamentLoadingSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold">Create Tournament for </h1>

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
        {
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Tournament Name</Label>
              <Input name="name" disabled />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" disabled />
            </div>
            <div>
              <Label>Start Date and Time</Label>
              <DatePicker date={formData.startDate} />
            </div>
            <div>
              <Label>Require Check-In</Label>
              <Switch disabled />
            </div>
          </div>
        }
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {currentStep === STEPS.length ? (
          <Button disabled>Create Tournament</Button>
        ) : (
          <Button disabled>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
