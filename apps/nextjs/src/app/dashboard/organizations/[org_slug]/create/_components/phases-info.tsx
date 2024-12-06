import { Button, Input, Label, Select, Switch } from "@battle-stadium/ui";

import type { TournamentFormProps } from "./shared";
import { CardWrapper } from "./shared";

export function TournamentPhases({
  formData,
  setFormData,
  addPhase,
}: TournamentFormProps) {
  return (
    <CardWrapper title="Phases">
      {formData.phases.map((phase, index) => (
        <div key={index} className="space-y-4">
          {index > 0 && (
            <div>
              <Label htmlFor={`advancement-${index}`}>Advancement</Label>
              <Select
                name={`advancement-${index}`}
                value={phase.advancement}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    phases: formData.phases.map((p, i) =>
                      i === index ? { ...p, advancement: value } : p,
                    ),
                  })
                }
              >
                <option value="traditional">Traditional Cut</option>
                <option value="minimum-point">
                  Minimum Points Requirement
                </option>
                <option value="points-min-players">Points + Min Players</option>
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor={`phase-name-${index}`}>Phase Name</Label>
            <Input
              id={`phase-name-${index}`}
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
          </div>
          <div>
            <Label htmlFor={`pairing-system-${index}`}>Pairing System</Label>
            <Select
              name={`pairing-system-${index}`}
              value={phase.pairingSystem}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  phases: formData.phases.map((p, i) =>
                    i === index ? { ...p, pairingSystem: value } : p,
                  ),
                })
              }
            >
              <option value="Swiss">Swiss Rounds</option>
              <option value="Single Elimination">Single Elimination</option>
            </Select>
          </div>
          <div>
            <Label htmlFor={`best-of-${index}`}>Best Of</Label>
            <Select
              name={`best-of-${index}`}
              value={String(phase.bestOf)}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  phases: formData.phases.map((p, i) =>
                    i === index ? { ...p, bestOf: Number(value) } : p,
                  ),
                })
              }
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={7}>7</option>
            </Select>
          </div>
          <div>
            <Label>Round Timer</Label>
            <Switch
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
          </div>
          {phase.roundTimer && (
            <div>
              <Label htmlFor={`round-time-${index}`}>Round Time</Label>
              <Input
                id={`round-time-${index}`}
                type="number"
                value={phase.roundTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: formData.phases.map((p, i) =>
                      i === index ? { ...p, roundTime: +e.target.value } : p,
                    ),
                  })
                }
              />
            </div>
          )}
          <div>
            <Label>Match Check-In</Label>
            <Switch
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
          </div>
          {phase.matchCheckIn && (
            <div>
              <Label htmlFor={`check-in-time-${index}`}>Check-In Time</Label>
              <Input
                id={`check-in-time-${index}`}
                type="number"
                value={phase.checkInTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: formData.phases.map((p, i) =>
                      i === index ? { ...p, checkInTime: +e.target.value } : p,
                    ),
                  })
                }
              />
            </div>
          )}
        </div>
      ))}
      <Button onClick={addPhase}>Add Phase</Button>
    </CardWrapper>
  );
}
