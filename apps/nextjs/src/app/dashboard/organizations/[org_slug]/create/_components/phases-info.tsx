// import type { z } from "zod";
// import { Controller, useFieldArray } from "react-hook-form";

// import {
//   Button,
//   CardContent,
//   CardFooter,
//   cn,
//   Input,
//   Label,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   Switch,
// } from "@battle-stadium/ui";

// import type { SelectOptionItem } from "./shared";
// import type { PhaseSchema, TournamentFormProps } from "./zod-schema";
// import { CardWrapper } from "./shared";

// export function TournamentPhases({ form }: TournamentFormProps) {
//   const { fields, append } = useFieldArray({
//     control: form.control,
//     name: "phases",
//   });
//   // prepend, remove, swap, move, insert
//   return (
//     <CardWrapper
//       disableCardContentWrapper
//       title="Phases"
//       classNames={{
//         header: "pb-4",
//       }}
//     >
//       <CardContent className="space-y-4">
//         {fields.map((phase, index) => (
//           <PhaseDetailsNestedCard
//             phase={phase}
//             form={form}
//             index={index}
//             key={phase.name}
//           />
//         ))}
//       </CardContent>

//       <CardFooter className="flex w-full justify-end p-4">
//         <Button
//           variant="outline"
//           onClick={() =>
//             append({
//               name: `Phase ${fields.length}`,
//               bestOf: 3,
//               pairingSystem: "single_elimination_bracket",
//               roundTimer: true,
//               matchCheckIn: true,
//               checkInTime: 10,
//               order: fields.length,
//             })
//           }
//         >
//           Add Phase
//         </Button>
//       </CardFooter>
//     </CardWrapper>
//   );
// }

// interface PhaseFormProps extends TournamentFormProps {
//   phase: z.infer<typeof PhaseSchema>;
//   index: number;
// }
// function PhaseDetailsNestedCard(props: PhaseFormProps) {
//   const { index } = props;

//   return (
//     <CardWrapper
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

// // function AdditionalPhase({index, phase}: AdditionalPhaseProps) {
// //   return (
// //     <InputWrapper label={`Phase ${index}`} htmlFor="">
// //     <div id={`phase-${index}`}>
// //       <Select
// //         name={`advancement-${index}`}
// //         value={phase.advancement}
// //         onValueChange={(value) =>
// //           setFormData({
// //             ...formData,
// //             phases: formData.phases.map((p, i) =>
// //               i === index ? { ...p, advancement: value } : p,
// //             ),
// //           })
// //         }
// //       >
// //         <option value="traditional">Traditional Cut</option>
// //         <option value="minimum-point">
// //           Minimum Points Requirement
// //         </option>
// //         <option value="points-min-players">Points + Min Players</option>
// //       </Select>
// //     </div>
// //   </InputWrapper>
// //   )
// // }

// function PhaseNameInput({ index, form }: PhaseFormProps) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <Label className="col-span-1 text-right">Phase Name</Label>
//       <div className="col-span-2">
//         <Controller
//           name={`phases.${index}.name`}
//           control={form.control}
//           render={({ field }) => <Input {...field} />}
//         />
//       </div>
//     </div>
//   );
// }

// const pairing_system_options: SelectOptionItem[] = [
//   { value: "swiss", label: "Swiss", disabled: false },
//   {
//     value: "single_elimination_bracket",
//     label: "Single Elimination Bracket",
//     disabled: false,
//   },
//   {
//     value: "double_elimination_bracket",
//     label: "Double Elimination Bracket (Coming Soon)",
//     disabled: true,
//   },
//   { value: "round_robin", label: "Round Robin (Coming Soon)", disabled: true },
// ];

// function PairingSystemSelect({ index, form }: PhaseFormProps) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <Label className="col-span-1 text-right">Pairing System</Label>

//       <div className="col-span-2">
//         <Controller
//           name={`phases.${index}.pairingSystem`}
//           control={form.control}
//           render={({ field }) => (
//             <Select value={field.value} onValueChange={field.onChange}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Pairing System..." />
//               </SelectTrigger>
//               <SelectContent className="bg-background p-3">
//                 {pairing_system_options.map(({ value, label, disabled }) => (
//                   <SelectItem
//                     key={value}
//                     value={value}
//                     disabled={disabled}
//                     className={cn({ "text-muted-foreground": disabled })}
//                   >
//                     {label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// function BestOfSelect({ index, form }: PhaseFormProps) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <Label className="col-span-1 text-right">Best Of</Label>

//       <div className="col-span-2">
//         <Controller
//           name={`phases.${index}.bestOf`}
//           control={form.control}
//           render={({ field }) => <Input type="number" {...field} />}
//         />
//       </div>
//     </div>
//   );
// }

// function RoundTimerSwitch({ index, form }: PhaseFormProps) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <Label className="col-span-1 text-right">Round Timer?</Label>

//       <div className="col-span-2">
//         <Controller
//           name={`phases.${index}.roundTimer`}
//           control={form.control}
//           render={({ field }) => (
//             <Switch onChange={field.onChange} checked={field.value} />
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// function RoundTimerInput({ index, form, phase }: PhaseFormProps) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <Label className="col-span-1 text-right">Round Time</Label>

//       <div className="col-span-2">
//         <Controller
//           name={`phases.${index}.roundTime`}
//           control={form.control}
//           render={({ field }) => (
//             <Input
//               {...field}
//               disabled={!phase.roundTimer}
//               type="number"
//               min={20}
//             />
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// function MatchCheckIn({ index, form }: PhaseFormProps) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <Label className="col-span-1 text-right">Match Check In?</Label>

//       <div className="col-span-2">
//         <Controller
//           name={`phases.${index}.matchCheckIn`}
//           control={form.control}
//           render={({ field }) => (
//             <Switch checked={field.value} onChange={field.onChange} />
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// function MatchCheckinTimerInput({ index, form }: PhaseFormProps) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <Label className="col-span-1 text-right">Match Check In Time</Label>

//       <div className="col-span-2">
//         <Controller
//           name={`phases.${index}.checkInTime`}
//           control={form.control}
//           render={({ field }) => (
//             <Input
//               id={`phase-${index}-match-checkin-timer`}
//               type="number"
//               min={5}
//               value={field.value}
//               onChange={field.onChange}
//             />
//           )}
//         />
//       </div>
//     </div>
//   );
// }
