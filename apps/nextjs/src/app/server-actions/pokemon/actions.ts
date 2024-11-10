"use server";

import { db } from "@battle-stadium/db";
import { pokemon, pokemonTeams } from "@battle-stadium/db/schema";

import type { PokePasteMetadata, ValidatedPokemon } from "~/lib/pokemon/common";

export async function getPokemonTeams() {
  return await db.query.pokemonTeams.findMany();
}

export async function postPokemonTeam(
  validatedTeam: ValidatedPokemon[],
  metadata: PokePasteMetadata,
) {
  const body = {
    pokepasteId: metadata.id,
    profileId: null,
    name: metadata.title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    gameId: BigInt(1),
    formatId: BigInt(1),
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
    form: null,
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
