import {
  bigint,
  bigserial,
  foreignKey,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";

export const clerkUsers = pgTable(
  "clerk_users",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    clerkUserId: varchar("clerk_user_id").notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    accountId: bigint("account_id", { mode: "number" }),
  },
  (table) => {
    return {
      indexClerkUsersOnAccountId: index(
        "index_clerk_users_on_account_id",
      ).using("btree", table.accountId.asc().nullsLast()),
      indexClerkUsersOnClerkUserId: uniqueIndex(
        "index_clerk_users_on_clerk_user_id",
      ).using("btree", table.clerkUserId.asc().nullsLast()),
      fkRails982E94E92D: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_982e94e92d",
      }),
    };
  },
);

export type ClerkUser = typeof clerkUsers.$inferSelect;
export type ClerkUserInsert = typeof clerkUsers.$inferInsert;
