import {
  bigint,
  bigserial,
  foreignKey,
  index,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { organizations } from "./organizations";

export const organizationStaffMembers = pgTable(
  "organization_staff_members",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    organizationId: bigint("organization_id", { mode: "bigint" }).notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    accountId: bigint("account_id", { mode: "bigint" }),
  },
  (table) => {
    return {
      indexOrganizationStaffMembersOnAccountId: index(
        "index_organization_staff_members_on_account_id",
      ).using("btree", table.accountId.asc().nullsLast()),
      indexOrganizationStaffMembersOnOrganizationId: index(
        "index_organization_staff_members_on_organization_id",
      ).using("btree", table.organizationId.asc().nullsLast()),
      fkRailsA177A0142C: foreignKey({
        columns: [table.organizationId],
        foreignColumns: [organizations.id],
        name: "fk_rails_a177a0142c",
      }),
      fkRails65Be078Ae6: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_65be078ae6",
      }),
    };
  },
);

export type OrganizationStaffMember =
  typeof organizationStaffMembers.$inferSelect;
export type OrganizationStaffMemberInsert =
  typeof organizationStaffMembers.$inferInsert;
