"use server";

// import { cacheLife } from "next/dist/server/use-cache/cache-life";
// import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { db } from "@battle-stadium/db";
import { pokemon, pokemonTeams } from "@battle-stadium/db/schema";

import type { PokePasteMetadata, ValidatedPokemon } from "~/lib/pokemon/common";

export async function getPokemonTeams() {
  // "use cache";
  // cacheTag("getPokemonTeams");
  // cacheLife("minutes");
  // TODO: revalidate on team creation

  return await db.query.pokemonTeams.findMany();
}

export async function postPokemonTeam(
  validatedTeam: ValidatedPokemon[],
  metadata: PokePasteMetadata,
  profileId: number,
  gameId: number,
  formatId: number,
) {
  const body = {
    pokepasteId: metadata.id,
    profileId,
    name: metadata.title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    gameId,
    formatId,
  };

  const pokemonTeamResult = await db
    .insert(pokemonTeams)
    .values(body)
    .returning();

  if (!pokemonTeamResult.length) {
    throw new Error("Failed to insert Pokemon Team");
  }

  const pokemonList = validatedTeam.map(({ pokemon }) => ({
    pokemonTeamId: pokemonTeamResult[0]?.id,
    nickname: pokemon.name,
    species: pokemon.species,
    item: pokemon.item,
    ability: pokemon.ability,
    teraType: pokemon.teraType ?? "",
    nature: pokemon.nature,
    form: null, // TODO: #7 Update to pass through form
    move1: pokemon.moves[0] ?? null,
    move2: pokemon.moves[1] ?? null,
    move3: pokemon.moves[2] ?? null,
    move4: pokemon.moves[3] ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const pokemonResult = await db
    .insert(pokemon)
    .values(pokemonList)
    .returning();

  return {
    pokemonTeam: pokemonTeamResult[0],
    pokemon: pokemonResult,
  };
}
