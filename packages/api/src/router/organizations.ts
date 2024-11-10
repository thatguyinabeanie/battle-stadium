import type { TRPCRouterRecord } from "@trpc/server";

import { eq } from "@battle-stadium/db";
import { organizations } from "@battle-stadium/db/schema";

import { publicProcedure } from "../trpc";

export const organizationsRouter = {
  getOrganizations: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.organizations.findMany();
  }),

  getPartneredOrganizations: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.organizations.findMany({
      where: eq(organizations.partner, true),
    });
  }),
} satisfies TRPCRouterRecord;
