import { useState } from "react";

import type { TournamentForm } from "./_components/shared";

export const STEPS = [
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
          name: `Phase ${prevFormData.phases.length}`,
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

  return {
    currentStep,
    formData,
    setFormData,
    handleNext,
    handleBack,
    handleSubmit,
    addPhase,
  };
}
