import {
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@battle-stadium/ui";

import type { TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper } from "./shared";

export function Registration({ formData, setFormData }: TournamentFormProps) {
  return (
    <CardWrapper title="Registration">
      <InputWrapper htmlFor="registration-type" label="Registration Type">
        <div id="registration-type">
          <Select
            onValueChange={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                registrationType: value,
              }))
            }
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Registration..." />
            </SelectTrigger>
            <SelectContent className="bg-black p-2">
              <SelectItem value="open-registration">
                Open Registration
              </SelectItem>
              <SelectItem value="entry-code" disabled>
                Entry Code (Coming Soon)
              </SelectItem>
              <SelectItem value="single-use-code" disabled>
                Single-Use Code (Coming Soon)
              </SelectItem>
              <SelectItem value="invite-only" disabled>
                Invite Only (Coming Soon)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
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
