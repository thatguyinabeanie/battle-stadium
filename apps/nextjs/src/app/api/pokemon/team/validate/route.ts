import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Pokedex from "pokedex-promise-v2";

import type { ParsedPokemon } from "~/lib/pokemon/common";

export const runtime = "edge";

function createPokedexInstance() {
  try {
    return new Pokedex();
  } catch (error) {
    console.error("Error initializing Pokedex:", error);
    throw new Error("Failed to initialize Pokedex");
  }
}

const P = createPokedexInstance();

const validTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const validTeraTypes = [...validTypes, "stellar"];

function toLowerCaseReplaceSpace(value: string) {
  return value.toLowerCase().replace(/ /g, "-");
}

const species_modifiers = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
  "gmax",
  "blooddmoon",
  "origin",
  "female",
  "male",
  "mega",
  "white",
  "black",
  "o",
  "lele",
  "koko",
  "bulu",
  "unbound",
  "wellspring",
  "hearthflame",
  "cornerstone",
  "terastal",
  "stellar",
  "droopy",
  "curly",
  "stretchy",
];

const special_cases: Record<string, string> = {
  maushold: "maushold-family-of-four",
  tatsugiri: "tatsugiri-curly",
};

async function fetchPokemonData(pokemon: ParsedPokemon) {
  try {
    const lowerCaseSpecies = toLowerCaseReplaceSpace(pokemon.species);

    if (pokemon.species.includes("-")) {
      if (
        species_modifiers.includes(
          pokemon.species.split("-")[1]?.toLocaleLowerCase() ?? "",
        )
      ) {
        return await P.getPokemonByName(lowerCaseSpecies);
      }

      return await P.getPokemonByName(
        toLowerCaseReplaceSpace(pokemon.species.split("-")[0] ?? ""),
      );
    } else {
      const special_case_pokemon = special_cases[lowerCaseSpecies];

      if (special_case_pokemon) {
        return await P.getPokemonByName(special_case_pokemon);
      }

      return await P.getPokemonByName(lowerCaseSpecies);
    }
  } catch (error) {
    const message = `Error fetching Pokemon data for ${pokemon.species}: ${error instanceof Error ? error.message : String(error)}`;
    console.error(message);
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const { pokemon } = (await req.json()) as { pokemon: ParsedPokemon };

  const pokemonData = await fetchPokemonData(pokemon);

  if (pokemonData instanceof NextResponse) {
    return pokemonData;
  }

  try {
    const validItem = pokemon.item
      ? await P.getItemByName(toLowerCaseReplaceSpace(pokemon.item))
      : null;

    const lowercaseAbility = toLowerCaseReplaceSpace(pokemon.ability);

    const validAbility = pokemonData.abilities.find(
      ({ ability }) => ability.name === lowercaseAbility,
    );
    const invalidMoves = pokemon.moves
      .map(toLowerCaseReplaceSpace)
      .filter(
        (pokemon_move: string) =>
          !pokemonData.moves.find(({ move }) => move.name === pokemon_move),
      )
      .map((move) =>
        move.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
      );

    const validTeraType = validTeraTypes.includes(
      pokemon.teraType?.toLowerCase() ?? "",
    );

    if (!validTeraType) {
      return NextResponse.json(
        { message: "Invalid Tera Type" },
        { status: 400 },
      );
    }

    const invalid = {
      item: !validItem,
      ability: !validAbility,
      moves: invalidMoves,
      teraType: !validTeraType,
    };

    const officialArtwork = pokemonData.sprites.other["official-artwork"];

    const parsedPokemon = {
      ...pokemon,
      imgPokemon: pokemon.shiny
        ? officialArtwork.front_shiny
        : officialArtwork.front_default,
      imgItem: validItem?.sprites.default,
    };

    // if (pokemon.form) {
    //   const formName = `${pokemon.baseSpecies}-${pokemon.form}`.toLowerCase();
    //   const formData = await P.getPokemonFormByName(formName);
    //   if (formData.sprites.front_default) {
    //     parsedPokemon.imgPokemon = formData.sprites.front_default;
    //   }
    // }

    return NextResponse.json(
      { pokemon: parsedPokemon, invalid },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching Pokemon data", error);
    return NextResponse.json(
      { message: `Error fetching Pokemon data}` },
      { status: 500 },
    );
  }
}
