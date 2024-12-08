import { Button, CardFooter } from "@battle-stadium/ui";

import type { TournamentFormProps } from "./zod-schema";
// import type { Phase } from "./shared";
import { CardWrapper } from "./shared";

// interface PhaseFormProps extends TournamentFormProps {
//   index: number;
//   phase: Phase;
// }

export function TournamentPhases({ form }: TournamentFormProps) {
  console.log("form", form.getValues());
  return (
    <CardWrapper
      disableCardContentWrapper
      title="Phases"
      classNames={{
        header: "pb-4",
      }}
    >
      {/*       
      { > 0 && (
        <CardContent className="space-y-4">
          {props.formData.phases.map((phase, index) => (
            <PhaseDetailsNestedCard
              {...props}
              phase={phase}
              index={index}
              key={phase.name}
            />
          ))}
        </CardContent>
      )} */}

      <CardFooter className="flex w-full justify-end p-4">
        <Button variant="outline">Add Phase</Button>
      </CardFooter>
    </CardWrapper>
  );
}

// function PhaseDetailsNestedCard(props: PhaseFormProps) {
//   const { index, phase } = props;

//   return (
//     <CardWrapper
//       key={phase.name}
//       title={`Phase ${index}`}
//       classNames={{
//         card: cn("rounded-none border-x-0", {
//           "border-t-1 !my-0": index > 0,
//         }),
//         header: "pt-2",
//       }}
//     >
//       <PhaseNameInput {...props} />

//       <PairingSystemSelect {...props} />

//       <BestOfSelect {...props} />

//       <RoundTimerSwitch {...props} />

//       <RoundTimerInput {...props} />

//       <MatchCheckIn {...props} />

//       <MatchCheckinTimerInput {...props} />
//     </CardWrapper>
//   );
// }

// function AdditionalPhase({index, formData, setFormData, phase}: AdditionalPhaseProps) {
//   return (
//     <InputWrapper label={`Phase ${index}`} htmlFor="">
//     <div id={`phase-${index}`}>
//       <Select
//         name={`advancement-${index}`}
//         value={phase.advancement}
//         onValueChange={(value) =>
//           setFormData({
//             ...formData,
//             phases: formData.phases.map((p, i) =>
//               i === index ? { ...p, advancement: value } : p,
//             ),
//           })
//         }
//       >
//         <option value="traditional">Traditional Cut</option>
//         <option value="minimum-point">
//           Minimum Points Requirement
//         </option>
//         <option value="points-min-players">Points + Min Players</option>
//       </Select>
//     </div>
//   </InputWrapper>
//   )
// }

// function PhaseNameInput({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
//   return (
//       <Input
//         id={`phase-${index}-name`}
//         value={phase.name}
//         onChange={({ target: { value } }) =>
//           setPhaseKeyValue(index, "name")(value)
//         }
//       />
//   );
// }

// const pairing_system_options: SelectOptionItem[] = [
//   { value: "swiss", label: "Swiss" },
//   { value: "single_elimination_bracket", label: "Single Elimination Bracket" },
//   // { value: "double_elimination_bracket", label: "Double Elimination Bracket" },
//   // { value: "round_robin", label: "Round Robin" },
// ];

// function PairingSystemSelect({
//   index,
//   phase,

// }: PhaseFormProps) {
//   return (
//       <Select
//         id={`phase-${index}-pairing-system`}
//         placeholder="Select Pairing System"
//         options={pairing_system_options}
//         value={phase.pairingSystem}
//         onValueChange={setPhaseKeyValue(index, "pairingSystem")}
//       />
//   );
// }

// function BestOfSelect({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
//   return (
//       <Select
//         id={`phase-${index}-best-of`}
//         placeholder="Select Best Of..."
//         options={[
//           { value: "one", label: "1" },
//           { value: "three", label: "3" },
//         ]}
//         value={String(phase.bestOf)}
//         onValueChange={(value) =>
//           setPhaseKeyValue(index, "bestOf")(Number.parseInt(value, 10))
//         }
//       />
//   );
// }

// function RoundTimerSwitch({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
//   return (
//       <Switch
//         id={`phase-${index}-round-timer`}
//         checked={phase.roundTimer}
//         onCheckedChange={setPhaseKeyValue(index, "roundTimer")}
//       />
//   );
// }

// function RoundTimerInput({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
//   return (
//       <Input
//         id={`phase-${index}-round-time`}
//         disabled={!phase.roundTimer}
//         type="number"
//         min={20}
//         value={phase.roundTime}
//         className={cn("", { "text-muted": !phase.roundTimer })}
//         onChange={({ target: { value } }) =>
//           setPhaseKeyValue(index, "roundTime")(value)
//         }
//       />
//   );
// }

// function MatchCheckIn({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
//   return (
//       <Switch
//         id={`phase-${index}-match-checkin`}
//         checked={phase.matchCheckIn}
//         onCheckedChange={setPhaseKeyValue(index, "matchCheckIn")}
//       />
//   );
// }

// function MatchCheckinTimerInput({
//   index,
//   phase,
// }: PhaseFormProps) {
//   return (
//       <Input
//         id={`phase-${index}-match-checkin-timer`}
//         disabled={!phase.matchCheckIn}
//         type="number"
//         min={5}
//         value={phase.checkInTime}
//         className={cn("", { "text-muted": !phase.matchCheckIn })}
//         onChange={({ target: { value } }) =>
//           setPhaseKeyValue(index, "checkInTime")(value)
//         }
//       />
//   );
// }
