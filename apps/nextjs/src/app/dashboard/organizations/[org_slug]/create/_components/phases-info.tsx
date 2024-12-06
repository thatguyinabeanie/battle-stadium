import {
  Button,
  CardContent,
  CardFooter,
  cn,
  Input,
  Switch,
} from "@battle-stadium/ui";

import type { Phase, SelectOptionItem, TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper, Select } from "./shared";

interface PhaseFormProps extends TournamentFormProps {
  index: number;
  phase: Phase;
}

export function TournamentPhases({ addPhase, ...props }: TournamentFormProps) {
  return (
    <CardWrapper
      disableCardContentWrapper
      title="Phases"
      classNames={{
        header: "pb-4",
      }}
    >
      {props.formData.phases.length > 0 && (
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
      )}

      <CardFooter className="flex w-full justify-end p-4">
        <Button variant="outline" onClick={addPhase}>
          Add Phase
        </Button>
      </CardFooter>
    </CardWrapper>
  );
}

function PhaseDetailsNestedCard(props: PhaseFormProps) {
  const { index, phase } = props;

  return (
    <CardWrapper
      key={phase.name}
      title={`Phase ${index}`}
      classNames={{
        card: cn("rounded-none border-x-0", {
          "border-t-1 !my-0": index > 0,
        }),
        header: "pt-2",
      }}
    >
      <PhaseNameInput {...props} />

      <PairingSystemSelect {...props} />

      <BestOfSelect {...props} />

      <RoundTimerSwitch {...props} />

      <RoundTimerInput {...props} />

      <MatchCheckIn {...props} />

      <MatchCheckinTimerInput {...props} />
    </CardWrapper>
  );
}

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

function PhaseNameInput({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
  return (
    <InputWrapper htmlFor={`phase-${index}-name`} label="Phase Name">
      <Input
        id={`phase-${index}-name`}
        value={phase.name}
        onChange={({ target: { value } }) =>
          setPhaseKeyValue(index, "name")(value)
        }
      />
    </InputWrapper>
  );
}

const pairing_system_options: SelectOptionItem[] = [
  { value: "swiss", label: "Swiss" },
  { value: "single_elimination_bracket", label: "Single Elimination Bracket" },
  // { value: "double_elimination_bracket", label: "Double Elimination Bracket" },
  // { value: "round_robin", label: "Round Robin" },
];

function PairingSystemSelect({
  index,
  phase,
  setPhaseKeyValue,
}: PhaseFormProps) {
  return (
    <InputWrapper
      htmlFor={`phase-${index}-pairing-system`}
      label="Pairing System"
    >
      <Select
        id={`phase-${index}-pairing-system`}
        placeholder="Select Pairing System"
        options={pairing_system_options}
        value={phase.pairingSystem}
        onValueChange={setPhaseKeyValue(index, "pairingSystem")}
      />
    </InputWrapper>
  );
}

function BestOfSelect({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
  return (
    <InputWrapper htmlFor={`phase-${index}-best-of`} label="Best of">
      <Select
        id={`phase-${index}-best-of`}
        placeholder="Select Best Of..."
        options={[
          { value: "one", label: "1" },
          { value: "three", label: "3" },
        ]}
        value={String(phase.bestOf)}
        onValueChange={setPhaseKeyValue(index, "bestOf")}
      />
    </InputWrapper>
  );
}

function RoundTimerSwitch({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
  return (
    <InputWrapper htmlFor={`phase-${index}-round-timer`} label="Round Timer">
      <Switch
        id={`phase-${index}-round-timer`}
        checked={phase.roundTimer}
        onCheckedChange={setPhaseKeyValue(index, "roundTimer")}
      />
    </InputWrapper>
  );
}

function RoundTimerInput({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
  return (
    <InputWrapper htmlFor={`phase-${index}-round-time`} label="Round Time">
      <Input
        id={`phase-${index}-round-time`}
        disabled={!phase.roundTimer}
        type="number"
        min={20}
        value={phase.roundTime}
        className={cn("", { "text-muted": !phase.roundTimer })}
        onChange={({ target: { value } }) =>
          setPhaseKeyValue(index, "roundTime")(value)
        }
      />
    </InputWrapper>
  );
}

function MatchCheckIn({ index, phase, setPhaseKeyValue }: PhaseFormProps) {
  return (
    <InputWrapper
      htmlFor={`phase-${index}-match-checkin`}
      label="Match Check In"
    >
      <Switch
        id={`phase-${index}-match-checkin`}
        checked={phase.matchCheckIn}
        onCheckedChange={setPhaseKeyValue(index, "matchCheckIn")}
      />
    </InputWrapper>
  );
}

function MatchCheckinTimerInput({
  index,
  phase,
  setPhaseKeyValue,
}: PhaseFormProps) {
  return (
    <InputWrapper
      htmlFor={`phase-${index}-match-checkin-timer`}
      label="Match Check In Timer"
    >
      <Input
        id={`phase-${index}-match-checkin-timer`}
        disabled={!phase.matchCheckIn}
        type="number"
        min={5}
        value={phase.checkInTime}
        className={cn("", { "text-muted": !phase.matchCheckIn })}
        onChange={({ target: { value } }) =>
          setPhaseKeyValue(index, "checkInTime")(value)
        }
      />
    </InputWrapper>
  );
}
