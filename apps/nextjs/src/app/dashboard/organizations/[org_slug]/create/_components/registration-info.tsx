import { Checkbox, Input, Switch } from "@battle-stadium/ui";

import type { SelectOptionItem, TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper, Select } from "./shared";

const registration_restrictions_options: SelectOptionItem[] = [
  { value: "open", label: "Open Registration" },
  { value: "entry-code", label: "Entry Code (Coming Soon)", disabled: true },
  {
    value: "single-use-code",
    label: "Single Use Code (Coming Soon)",
    disabled: true,
  },
  { value: "invite", label: "Invite Only (Coming Soon)", disabled: true },
];
export function Registration({
  formData,
  setFormData,
  setFormKeyValue,
}: TournamentFormProps) {
  return (
    <CardWrapper title="Registration">
      <InputWrapper htmlFor="registration-restrictions" label="Restrictions">
        <Select
          id="registration-restrictions"
          placeholder="Select Restrictions"
          options={registration_restrictions_options}
        />
      </InputWrapper>

      <InputWrapper htmlFor="player-cap" label="Player Cap">
        <div id="player-cap">
          <Switch
            checked={formData.playerCap}
            onCheckedChange={setFormKeyValue("playerCap")}
          />
        </div>
      </InputWrapper>

      {formData.playerCap && (
        <InputWrapper htmlFor="max-players" label="Max Players">
          <Input
            id="max-players"
            name="max-players"
            type="number"
            value={formData.maxPlayers}
            onChange={({ target: { value } }) =>
              setFormKeyValue("maxPlayers")(Number.parseInt(value, 10))
            }
          />
        </InputWrapper>
      )}

      <InputWrapper htmlFor="require-check-in" label="Check In Required?">
        <div id="require-check-in">
          <Switch
            checked={formData.requireCheckIn}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, requireCheckIn: checked })
            }
          />
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="late-registration" label="Late Registration">
        <Checkbox
          id="late-registration"
          checked={formData.allowLateRegistration}
          onChange={() =>
            setFormKeyValue("allowLateRegistration")(!formData.allowLateCheckIn)
          }
        />
      </InputWrapper>

      <InputWrapper
        htmlFor="late-teamsheet-submission"
        label="Allow Late Team Sheet Submission"
      >
        <Checkbox
          id="late-teamsheet-submission"
          checked={formData.allowLateTeamSheet}
          onChange={() =>
            setFormKeyValue("allowLateTeamSheet")(!formData.allowLateTeamSheet)
          }
        />
      </InputWrapper>

      <InputWrapper htmlFor="late-checkin" label="Late Check In">
        <Checkbox
          id="late-checkin"
          checked={formData.allowLateCheckIn}
          onChange={() =>
            setFormKeyValue("allowLateCheckIn")(!formData.allowLateCheckIn)
          }
        />
      </InputWrapper>
    </CardWrapper>
  );
}
