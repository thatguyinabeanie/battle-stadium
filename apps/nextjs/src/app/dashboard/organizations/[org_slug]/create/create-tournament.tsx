"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@battle-stadium/ui";

import type {
  OrganizationDashboardPageProps,
  TournamentFormProps,
} from "./_components/shared";
import { GameInformation } from "./_components/game-info";
import { TournamentPhases } from "./_components/phases-info";
import { Registration } from "./_components/registration-info";
import { TournamentInformation } from "./_components/tournament-info";
import { STEPS, useCreateTournamentForm } from "./use-create-tournament-form";

export default function CreateTournament({
  org,
}: OrganizationDashboardPageProps) {
  const { formData, setFormData, addPhase } = useCreateTournamentForm();
  console.log("org", org);

  return (
    <div className="flex max-h-dvh w-full flex-col items-center space-y-6 p-6">
      {/* <StepWizardProgress currentStep={currentStep} /> */}

      {/* Step Content */}
      <div className="space-y-4">
        {/* <h1 className="text-3xl font-bold">Create Tournament for {org.name}</h1> */}

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
