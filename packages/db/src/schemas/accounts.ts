import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { profiles } from "./profiles";

export const accounts = pgTable(
  "accounts",
  {
    email: varchar().default("").notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    unlockToken: varchar("unlock_token"),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    pronouns: varchar().default("").notNull(),
    jti: varchar().default("invalid").notNull(),
    name: varchar(),
    imageUrl: text("image_url"),
    admin: boolean().default(false).notNull(),
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    defaultProfileId: bigint("default_profile_id", { mode: "number" }),
    archivedAt: timestamp("archived_at", { precision: 6, mode: "string" }),
    country: varchar(),
    timezone: varchar(),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (table): Record<string, any> => {
    return {
      indexAccountsOnEmail: uniqueIndex("index_accounts_on_email").using(
        "btree",
        table.email.asc().nullsLast(),
      ),
      indexAccountsOnJti: uniqueIndex("index_accounts_on_jti").using(
        "btree",
        table.jti.asc().nullsLast(),
      ),
      indexAccountsOnUnlockToken: uniqueIndex(
        "index_accounts_on_unlock_token",
      ).using("btree", table.unlockToken.asc().nullsLast()),
      fkRailsCee78B4B7D: foreignKey({
        columns: [table.defaultProfileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_cee78b4b7d",
      }),
    };
  },
);

export type Account = typeof accounts.$inferSelect;
export type AccountInsert = typeof accounts.$inferInsert;
