import { Button, cn, Input, Switch } from "@battle-stadium/ui";

import type { Phase, SelectOptionItem, TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper, Select } from "./shared";

interface PhaseFormProps extends TournamentFormProps {
  index: number;
  phase: Phase;
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

export function TournamentPhases({
  formData,
  setFormData,
  addPhase,
}: TournamentFormProps) {
  return (
    <CardWrapper title="Phases">
      {formData.phases.map((phase, index) => (
        <div key={index} className="space-y-4">
          <PhaseNameInput
            index={index}
            phase={phase}
            formData={formData}
            setFormData={setFormData}
          />

          <PairingSystemSelect index={index} />

          <BestOfSelect index={index} />

          <RoundTimerSwitch
            index={index}
            phase={phase}
            formData={formData}
            setFormData={setFormData}
          />

          <RoundTimerInput
            index={index}
            phase={phase}
            formData={formData}
            setFormData={setFormData}
          />

          <MatchCheckIn
            index={index}
            phase={phase}
            formData={formData}
            setFormData={setFormData}
          />

          <MatchCheckinTimerInput
            index={index}
            phase={phase}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      ))}
      <Button onClick={addPhase}>Add Phase</Button>
    </CardWrapper>
  );
}

function PhaseNameInput({
  index,
  phase,
  formData,
  setFormData,
}: PhaseFormProps) {
  return (
    <InputWrapper htmlFor={`phase-${index}-name`} label="Phase Name">
      <Input
        id={`phase-${index}-name`}
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
    </InputWrapper>
  );
}

const pairing_system_options: SelectOptionItem[] = [
  { value: "swiss", label: "Swiss" },
  { value: "single_elimination_bracket", label: "Single Elimination Bracket" },
];

function PairingSystemSelect({ index }: { index: number }) {
  return (
    <InputWrapper
      htmlFor={`phase-${index}-pairing-system`}
      label="Pairing System"
    >
      <Select
        id={`phase-${index}-pairing-system`}
        placeholder="Select Pairing System"
        options={pairing_system_options}
      />
    </InputWrapper>
  );
}

function BestOfSelect({ index }: { index: number }) {
  return (
    <InputWrapper htmlFor={`phase-${index}-best-of`} label="Best of">
      <Select
        id={`phase-${index}-best-of`}
        placeholder="Select Best Of..."
        options={[
          { value: "one", label: "1" },
          { value: "three", label: "3" },
        ]}
      />
    </InputWrapper>
  );
}

function RoundTimerSwitch({
  index,
  phase,
  setFormData,
  formData,
}: PhaseFormProps) {
  return (
    <InputWrapper htmlFor={`phase-${index}-round-timer`} label="Round Timer">
      <Switch
        id={`phase-${index}-round-timer`}
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
    </InputWrapper>
  );
}

function RoundTimerInput({
  index,
  phase,
  setFormData,
  formData,
}: PhaseFormProps) {
  return (
    <InputWrapper htmlFor={`phase-${index}-round-time`} label="Round Time">
      <Input
        id={`phase-${index}-round-time`}
        disabled={!phase.roundTimer}
        type="number"
        value={phase.roundTime}
        className={cn("", { "text-muted": !phase.roundTimer })}
        onChange={(e) =>
          setFormData({
            ...formData,
            phases: formData.phases.map((p, i) =>
              i === index ? { ...p, roundTime: +e.target.value } : p,
            ),
          })
        }
      />
    </InputWrapper>
  );
}

function MatchCheckIn({ index, phase, setFormData, formData }: PhaseFormProps) {
  return (
    <InputWrapper
      htmlFor={`phase-${index}-match-checkin`}
      label="Match Check In"
    >
      <Switch
        id={`phase-${index}-match-checkin`}
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
    </InputWrapper>
  );
}

function MatchCheckinTimerInput({
  index,
  phase,
  setFormData,
  formData,
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
        value={phase.checkInTime}
        className={cn("", { "text-muted": !phase.matchCheckIn })}
        onChange={(e) =>
          setFormData({
            ...formData,
            phases: formData.phases.map((p, i) =>
              i === index ? { ...p, checkInTime: +e.target.value } : p,
            ),
          })
        }
      />
    </InputWrapper>
  );
}
