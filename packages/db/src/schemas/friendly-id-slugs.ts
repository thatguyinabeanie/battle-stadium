import {
  bigserial,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const friendlyIdSlugs = pgTable(
  "friendly_id_slugs",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    slug: varchar().notNull(),
    sluggableId: integer("sluggable_id").notNull(),
    sluggableType: varchar("sluggable_type", { length: 50 }),
    scope: varchar(),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
  },
  (table) => {
    return {
      indexFriendlyIdSlugsOnSlugAndSluggableType: index(
        "index_friendly_id_slugs_on_slug_and_sluggable_type",
      ).using(
        "btree",
        table.slug.asc().nullsLast(),
        table.sluggableType.asc().nullsLast(),
      ),
      indexFriendlyIdSlugsOnSlugAndSluggableTypeAndScope: uniqueIndex(
        "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope",
      ).using(
        "btree",
        table.slug.asc().nullsLast(),
        table.sluggableType.asc().nullsLast(),
        table.scope.asc().nullsLast(),
      ),
      indexFriendlyIdSlugsOnSluggableTypeAndSluggableId: index(
        "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id",
      ).using(
        "btree",
        table.sluggableType.asc().nullsLast(),
        table.sluggableId.asc().nullsLast(),
      ),
    };
  },
);
