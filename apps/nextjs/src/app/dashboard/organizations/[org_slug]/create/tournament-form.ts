// TODO: refactor to use enums for pairingSystem, bestOf, and advancement
export interface Phase {
  name: string;
  pairingSystem: string; // "Swiss" | "Single Elimination";
  bestOf: number; //1 | 3 | 5 | 7;
  roundTimer: boolean;
  roundTime: number;
  matchCheckIn: boolean;
  checkInTime: number;
  advancement: string; //"traditional" | "minimum-point" | "points-min-players";
}

// TODO: refactor to use an enum for registrationType
export interface TournamentForm {
  name: string;
  description: string;
  startDate?: Date;
  requireCheckIn: boolean;
  game: string;
  format: string;
  teamSheetRequired: boolean;
  openTeamSheet: boolean;
  registrationType: string; //| "Open" | "Entry Code" | "Single-Use Code" | "Invite Only",
  playerCap: boolean;
  maxPlayers: number;
  allowLateRegistration: boolean;
  allowLateTeamSheet: boolean;
  allowLateCheckIn: boolean;
  phases: Phase[];
}
