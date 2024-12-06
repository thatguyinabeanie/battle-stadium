import { useState } from "react";

import type { Phase, TournamentForm } from "./_components/shared";
import type { ValueOf } from "~/types";
import {
  Advancement,
  BestOf,
  PairingSystem,
  RegistrationType,
} from "./_components/shared";
interface FormStep {
  id: number;
  title: string;
}

export const STEPS: FormStep[] = [
  { id: 1, title: "Tournament Information" },
  { id: 2, title: "Game Information" },
  { id: 3, title: "Registration" },
  { id: 4, title: "Late Players" },
  { id: 5, title: "Phases" },
];

export function useCreateTournamentForm() {
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
    registrationType: RegistrationType.Open,
    playerCap: false,
    maxPlayers: 0,
    allowLateRegistration: false,
    allowLateTeamSheet: false,
    allowLateCheckIn: false,
    phases: [],
  });

  const setFormKeyValue =
    (key: keyof TournamentForm) => (value: ValueOf<TournamentForm>) =>
      setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));

  const setPhaseKeyValue =
    (phase_index: number, key: keyof Phase) => (value: ValueOf<Phase>) => {
      if (phase_index < 0 || phase_index >= formData.phases.length) {
        console.error("Invalid phase index");
        return;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        phases: formData.phases.map((phase, index) =>
          index === phase_index ? { ...phase, [key]: value } : phase,
        ),
      }));
    };

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
          name: `Phase ${prevFormData.phases.length}`,
          pairingSystem: PairingSystem.Swiss,
          bestOf: BestOf.One,
          roundTimer: false,
          roundTime: 0,
          matchCheckIn: false,
          checkInTime: 0,
          advancement: Advancement.Traditional,
        },
      ],
    }));
  };

  return {
    currentStep,
    formData,
    setFormData,
    setFormKeyValue,
    setPhaseKeyValue,
    handleNext,
    handleBack,
    handleSubmit,
    addPhase,
  };
}
