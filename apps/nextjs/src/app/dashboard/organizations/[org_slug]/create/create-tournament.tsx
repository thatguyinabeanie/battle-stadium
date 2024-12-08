"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, useToast } from "@battle-stadium/ui";

import type { OrganizationDashboardPageProps } from "./_components/shared";
import { GameInformation } from "./_components/game-info";
import { TournamentPhases } from "./_components/phases-info";
import { Registration } from "./_components/registration-info";
// import { RegistrationType } from "./_components/shared";
import { TournamentInformation } from "./_components/tournament-info";
import { TournamentFormSchema } from "./_components/zod-schema";

export default function CreateTournament({
  org,
}: OrganizationDashboardPageProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof TournamentFormSchema>>({
    resolver: zodResolver(TournamentFormSchema),
  });

  function onSubmit(data: z.infer<typeof TournamentFormSchema>) {
    console.log("data", data);
    toast({
      title: "Tournament Created Successfully!",
      description: "Your tournament has been created and saved.",
    });
  }

  return (
    <div className="flex max-h-dvh w-full flex-col items-center space-y-6 p-6">
      {/* <StepWizardProgress currentStep={currentStep} /> */}

      {/* Step Content */}
      <div className="space-y-4 backdrop-filter-none">
        <h1 className="text-3xl font-bold">Create Tournament for {org.name}</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TournamentInformation form={form} />
            <GameInformation form={form} />
            <Registration form={form} />
            <TournamentPhases form={form} />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
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

// export function StepWizardProgress({ currentStep }: { currentStep: number }) {
//   return (
//     <div className="mb-6 flex justify-between">
//       {STEPS.map((step) => (
//         <div
//           key={step.id}
//           className={`flex items-center ${
//             step.id === currentStep ? "text-primary" : "text-muted-foreground"
//           }`}
//         >
//           <div className="flex flex-col items-center">
//             <div
//               className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
//                 step.id === currentStep ? "border-primary" : "border-muted"
//               }`}
//             >
//               {step.id}
//             </div>
//             <span className="mt-1 text-xs">{step.title}</span>
//           </div>
//           {step.id !== STEPS.length && (
//             <ChevronRight className="mx-2 h-4 w-4" />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export function Navigation({
//   currentStep,
//   handleNext,
//   handleBack,
//   handleSubmit,
// }: TournamentFormProps) {
//   return (
//     <div className="mt-6 flex justify-between">
//       <Button
//         variant="outline"
//         onClick={handleBack}
//         disabled={currentStep === 1}
//       >
//         <ChevronLeft className="mr-2 h-4 w-4" />
//         Back
//       </Button>
//       {currentStep === STEPS.length ? (
//         <Button onClick={handleSubmit}>Create Tournament</Button>
//       ) : (
//         <Button onClick={handleNext}>
//           Next
//           <ChevronRight className="ml-2 h-4 w-4" />
//         </Button>
//       )}
//     </div>
//   );
// }
