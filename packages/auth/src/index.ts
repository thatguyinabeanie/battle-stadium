import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@battle-stadium/db/client";
import { Account, Session, User } from "@battle-stadium/db/schema";

import { env } from "../env";

const adapter = DrizzleAdapter(db, {
  usersTable: User,
  accountsTable: Account,
  sessionsTable: Session,
});

export const isSecureContext = env.NODE_ENV !== "development";

export { adapter };
