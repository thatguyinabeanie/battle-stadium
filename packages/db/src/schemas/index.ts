import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const schemaMigrations = pgTable("schema_migrations", {
  version: varchar().primaryKey().notNull(),
});

export const arInternalMetadata = pgTable("ar_internal_metadata", {
  key: varchar().primaryKey().notNull(),
  value: varchar(),
  createdAt: timestamp("created_at", {
    precision: 6,
    mode: "string",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    mode: "string",
  }).notNull(),
});

export * from "./accounts";
export * from "./chat-messages";
export * from "./clerk-users";
export * from "./formats";
export * from "./friendly-id-slugs";
export * from "./games";
export * from "./matches";
export * from "./match-games";
export * from "./organizations";
export * from "./organization-staff-members";
export * from "./players";
export * from "./phase-players";
export * from "./phases";
export * from "./pokemon";
export * from "./pokemon-teams";
export * from "./rounds";
export * from "./profiles";
export * from "./tournaments";
export * from "./tournaments-formats";
