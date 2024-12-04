"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

import {
  Button,
  // DatePicker,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@battle-stadium/ui";

const STEPS = [
  { id: 1, title: "Tournament Details" },
  { id: 2, title: "Rules & Format" },
  { id: 3, title: "Prize Structure" },
  { id: 4, title: "Registration" },
];

export default function CreateTournamentDialog() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // TODO: Replace with actual form state.  Using a form validation library like zod:
  const [formData, setFormData] = useState({
    name: "",
    format: "single-elimination",
    startDate: new Date(),
    entryFee: 0,
    maxPlayers: 32,
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
    setOpen(false);
    setCurrentStep(1);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Trophy className="mr-2 h-4 w-4" />
          Create Tournament
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Tournament</DialogTitle>
        </DialogHeader>

        {/* Step Progress */}
        <div className="mb-6 flex justify-between">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`flex items-center ${
                step.id === currentStep
                  ? "text-primary"
                  : "text-muted-foreground"
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
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Tournament Format</Label>
                <RadioGroup
                  value={formData.format}
                  onValueChange={(value) =>
                    setFormData({ ...formData, format: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single-elimination" id="single" />
                    <Label htmlFor="single">Single Elimination</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="double-elimination" id="double" />
                    <Label htmlFor="double">Double Elimination</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="swiss" id="swiss" />
                    <Label htmlFor="swiss">Swiss</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Start Date</Label>
                {/* <DatePicker /> */}
              </div>
            </div>
          )}

          {/* Add other steps here */}
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
      </DialogContent>
    </Dialog>
  );
}
