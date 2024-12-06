import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@battle-stadium/ui";

import type { TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper } from "./shared";

export function GameInformation({
  formData,
  setFormData,
}: TournamentFormProps) {
  return (
    <CardWrapper title="Game and Format">
      <InputWrapper htmlFor="game" label="Game">
        <div id="game">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Game..." />
            </SelectTrigger>
            <SelectContent className="bg-black p-3">
              <SelectItem value="sv">Scarlet and Violet</SelectItem>
              <SelectItem value="swsh">Sword and Shield</SelectItem>
              <SelectItem value="system">Sun and Moon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="format" label="Format">
        <div id="format">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Format..." />
            </SelectTrigger>
            <SelectContent className="bg-black p-2">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="team-sheet-required" label="Team Sheet Required?">
        <div id="team-sheet-required">
          <Switch
            checked={formData.teamSheetRequired}
            onCheckedChange={(checked) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                teamSheetRequired: checked,
              }))
            }
          />
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="open-team-sheet" label="Open Team Sheet">
        <div id="open-team-sheet">
          <Switch
            checked={formData.openTeamSheet}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, openTeamSheet: checked })
            }
          />
        </div>
      </InputWrapper>
    </CardWrapper>
  );
}
