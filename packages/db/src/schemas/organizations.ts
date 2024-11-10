import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";

export const organizations = pgTable(
  "organizations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: varchar(),
    description: text(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    logoUrl: varchar("logo_url"),
    partner: boolean().default(false).notNull(),
    hidden: boolean().default(false).notNull(),
    slug: varchar(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    limitlessOrgId: bigint("limitless_org_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    ownerId: bigint("owner_id", { mode: "number" }),
  },
  (table) => {
    return {
      indexOrganizationsOnName: uniqueIndex(
        "index_organizations_on_name",
      ).using("btree", table.name.asc().nullsLast()),
      indexOrganizationsOnOwnerId: index(
        "index_organizations_on_owner_id",
      ).using("btree", table.ownerId.asc().nullsLast()),
      indexOrganizationsOnSlug: uniqueIndex(
        "index_organizations_on_slug",
      ).using("btree", table.slug.asc().nullsLast()),
      fkRailsAb574863F6: foreignKey({
        columns: [table.ownerId],
        foreignColumns: [accounts.id],
        name: "fk_rails_ab574863f6",
      }),
    };
  },
);

export type Organization = typeof organizations.$inferSelect;
export type OrganizationInsert = typeof organizations.$inferInsert;
