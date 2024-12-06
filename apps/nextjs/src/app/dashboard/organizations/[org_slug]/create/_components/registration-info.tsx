import { Checkbox, Input, Switch } from "@battle-stadium/ui";

import type { SelectOptionItem, TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper, Select } from "./shared";

const registration_restrictions_options: SelectOptionItem[] = [
  { value: "open", label: "Open Registration" },
  { value: "entry-code", label: "Entry Code (Coming Soon)" },
  { value: "single-use-code", label: "Single Use Code (Coming Soon)" },
  { value: "invite", label: "Invite Only (Coming Soon)" },
];
export function Registration({ formData, setFormData }: TournamentFormProps) {
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
            onCheckedChange={(checked) =>
              setFormData({ ...formData, playerCap: checked })
            }
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
            onChange={(e) =>
              setFormData({
                ...formData,
                maxPlayers: Number.parseInt(e.target.value, 10),
              })
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
            setFormData((prevFormData) => ({
              ...prevFormData,
              allowLateRegistration: !prevFormData.allowLateRegistration,
            }))
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
            setFormData((prevFormData) => ({
              ...prevFormData,
              allowLateTeamSheet: !prevFormData.allowLateTeamSheet,
            }))
          }
        />
      </InputWrapper>

      <InputWrapper htmlFor="late-checkin" label="Late Check In">
        <Checkbox
          id="late-checkin"
          checked={formData.allowLateCheckIn}
          onChange={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              allowLateCheckIn: !prevFormData.allowLateCheckIn,
            }))
          }
        />
      </InputWrapper>
    </CardWrapper>
  );
}
