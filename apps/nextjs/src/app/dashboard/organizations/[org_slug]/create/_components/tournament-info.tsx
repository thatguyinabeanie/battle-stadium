import { DatePicker, Input, Switch } from "@battle-stadium/ui";

import type { TournamentFormProps } from "./shared";
import { CardWrapper, InputWrapper } from "./shared";

export function TournamentInformation({
  formData,
  setFormData,
}: TournamentFormProps) {
  return (
    <CardWrapper title="Tournament Information">
      <InputWrapper htmlFor="tournament-name" label="Tournament Name">
        <Input
          id="tournament-name"
          type="text"
          className="w-[250px]"
          placeholder="Enter Tournament Name..."
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </InputWrapper>

      <InputWrapper label="Start Date and Time" htmlFor="start-date">
        <DatePicker
          id="start-date"
          date={formData.startDate}
          setDate={(date) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              startDate: date,
            }))
          }
          classNames={{
            calendar: {
              className: "w-[250px]",
            },
          }}
        />
      </InputWrapper>

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
    </CardWrapper>
  );
}
