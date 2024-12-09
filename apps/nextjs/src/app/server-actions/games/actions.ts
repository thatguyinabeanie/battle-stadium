"use server";

import { db, eq } from "@battle-stadium/db";
import { formats, games } from "@battle-stadium/db/schema";

import type { SelectOptionItem } from "~/app/dashboard/organizations/[org_slug]/create/_components/shared";

export async function getGames() {
  const games_only = await db.query.games.findMany();

  const results = await db
    .select({
      gameId: games.id,
      gameName: games.name,
      formatId: formats.id,
      formatName: formats.name,
    })
    .from(games)
    .leftJoin(formats, eq(games.id, formats.gameId))
    .groupBy(games.id, formats.id)
    .orderBy(games.name, formats.name);

  const games_options = results.reduce(
    (acc, { gameId, formatId, formatName }) => {
      if (gameId) {
        if (!acc[Number(gameId)]) {
          acc[Number(gameId)] = [];
        }

        if (gameId && formatName && formatId) {
          acc[Number(gameId)]?.push({
            id: formatId,
            label: formatName,
            disabled: false,
          });
        }
      }
      return acc;
    },
    {} as Record<number, SelectOptionItem[]>,
  );

  return {
    games_options_with_formats: games_options,
    games: games_only,
  };
}
