import { Switch } from "@battle-stadium/ui";

import type { SelectOptionItem, TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper, Select } from "./shared";

const game_options: SelectOptionItem[] = [
  { value: "sv", label: "Scarlet & Violet" },
  { value: "swsh", label: "Sword & Shield" },
  { value: "sm", label: "Sun & Moon" },
];

const format_options: SelectOptionItem[] = [
  { value: "rg", label: "Regulation G" },
  { value: "s1", label: "Series 1" },
];
export function GameInformation({
  formData,
  setFormKeyValue,
}: TournamentFormProps) {
  return (
    <CardWrapper title="Game and Format">
      <InputWrapper htmlFor="game" label="Game">
        <Select
          id="game"
          placeholder="Select Game..."
          options={game_options}
          value={formData.game}
          onValueChange={setFormKeyValue("game")}
        />
      </InputWrapper>

      <InputWrapper htmlFor="format" label="Format">
        <Select
          id="format"
          placeholder="Select Format..."
          options={format_options}
          value={formData.format}
          onValueChange={setFormKeyValue("format")}
        />
      </InputWrapper>

      <InputWrapper htmlFor="team-sheet-required" label="Team Sheet Required?">
        <div id="team-sheet-required">
          <Switch
            checked={formData.teamSheetRequired}
            onCheckedChange={setFormKeyValue("teamSheetRequired")}
          />
        </div>
      </InputWrapper>

      <InputWrapper htmlFor="open-team-sheet" label="Open Team Sheet">
        <div id="open-team-sheet">
          <Switch
            checked={formData.openTeamSheet}
            onCheckedChange={setFormKeyValue("openTeamSheet")}
          />
        </div>
      </InputWrapper>
    </CardWrapper>
  );
}
