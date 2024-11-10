import {
  bigint,
  bigserial,
  foreignKey,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { matches } from "./matches";
import { profiles } from "./profiles";

export const chatMessages = pgTable(
  "chat_messages",
  {
    matchId: bigint("match_id", { mode: "bigint" }).notNull(),
    content: text(),
    messageType: varchar("message_type"),
    sentAt: timestamp("sent_at", { precision: 6, mode: "string" }),
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    accountId: bigint("account_id", { mode: "bigint" }),
    profileId: bigint("profile_id", { mode: "bigint" }).notNull(),
  },
  (table) => {
    return {
      indexChatMessagesOnAccountId: index(
        "index_chat_messages_on_account_id",
      ).using("btree", table.accountId.asc().nullsLast()),
      indexChatMessagesOnMatchId: index(
        "index_chat_messages_on_match_id",
      ).using("btree", table.matchId.asc().nullsLast()),
      fkRailsF9Ae4172Ee: foreignKey({
        columns: [table.matchId],
        foreignColumns: [matches.id],
        name: "fk_rails_f9ae4172ee",
      }),
      fkRails918Ef7Acc4: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_918ef7acc4",
      }),
      fkRailsF531Ed39E3: foreignKey({
        columns: [table.profileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_f531ed39e3",
      }),
    };
  },
);

export type ChatMessage = typeof chatMessages.$inferInsert;
export type ChatMessageInsert = typeof chatMessages.$inferInsert;
