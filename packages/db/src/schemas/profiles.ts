import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";

export const profiles = pgTable(
  "profiles",
  {
    username: varchar().notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    imageUrl: varchar("image_url"),
    slug: varchar(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    accountId: bigint("account_id", { mode: "number" }),
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    archivedAt: timestamp("archived_at", { precision: 6, mode: "string" }),
    default: boolean().default(false).notNull(),
    type: varchar().default("Profile").notNull(),
  },
  (table) => {
    return {
      indexProfilesOnAccountId: index("index_profiles_on_account_id").using(
        "btree",
        table.accountId.asc().nullsLast(),
      ),
      indexProfilesOnSlug: uniqueIndex("index_profiles_on_slug").using(
        "btree",
        table.slug.asc().nullsLast(),
      ),
      indexProfilesOnUsername: uniqueIndex("index_profiles_on_username").using(
        "btree",
        table.username.asc().nullsLast(),
      ),
      fkRailsE424190865: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_e424190865",
      }),
    };
  },
);

export type Profile = typeof profiles.$inferSelect;
export type ProfileInsert = typeof profiles.$inferInsert;
