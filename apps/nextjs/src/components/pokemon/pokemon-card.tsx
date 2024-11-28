import type { StatsTable } from "@pkmn/types";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chip,
} from "@battle-stadium/ui";

import type {
  InvalidPokemonAttributes,
  ParsedPokemon,
} from "~/lib/pokemon/common";

const POKEMON_SIZE = 100;
const ITEM_SIZE = 30;

const formatStats = (stats?: Partial<StatsTable>, showAll = true) => {
  if (!stats) return "";

  return Object.entries(stats)
    .filter(([_, value]) => showAll || value !== 31)
    .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
    .join(" / ");
};

interface PokemonCardProps {
  pokemon: ParsedPokemon;
  invalid?: InvalidPokemonAttributes;
  ots?: boolean;
}

function PokemonName({ pokemon }: Readonly<PokemonCardProps>) {
  const { name, species } = pokemon;

  if (name && name !== species) {
    return (
      <div className="flex flex-row">
        <h2 className="text-lg font-bold">{name}</h2>
        <h2 className="text-lg"> ({species})</h2>
      </div>
    );
  }

  return <h2 className="text-lg font-bold">{species}</h2>;
}

function PokemonAttributes({ pokemon, ots }: Readonly<PokemonCardProps>) {
  return (
    <div className="text-md flex flex-col p-2">
      <p>
        <strong>Ability:</strong> {pokemon.ability}
      </p>
      <p>
        <strong>Tera Type:</strong> {pokemon.teraType}
      </p>
      <p>
        <strong>Nature:</strong> {pokemon.nature}
      </p>
      <span className="flex flex-row">
        <p>
          <span className="flex flex-row justify-around">
            <strong>Item:</strong>
            {pokemon.item}
            <Image
              priority
              alt={pokemon.item}
              height={ITEM_SIZE}
              src={pokemon.imgItem}
              width={ITEM_SIZE}
            />
          </span>
        </p>
      </span>
      {!ots && (
        <p>
          <strong>EVs:</strong> {formatStats(pokemon.evs, true)}
        </p>
      )}
      {!ots && pokemon.ivs && Object.keys(pokemon.ivs).length > 0 && (
        <p>
          <strong>IVs:</strong> {formatStats(pokemon.ivs, false)}
        </p>
      )}
    </div>
  );
}

function PokemonMoveChip({ move }: Readonly<{ move: string }>) {
  return <Chip>{move}</Chip>;
}

export function PokemonCard(props: Readonly<PokemonCardProps>) {
  const { pokemon, ots } = props;

  return (
    <Card className="border-small border-primary-700/50 h-[250px] w-[350px] justify-center rounded-3xl bg-transparent pb-5 backdrop-blur">
      <CardHeader className="flex items-center justify-center pb-2 pt-4">
        <PokemonName pokemon={pokemon} />
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-center overflow-hidden px-2">
        <Image
          alt={pokemon.species}
          height={POKEMON_SIZE}
          src={pokemon.imgPokemon}
          width={POKEMON_SIZE}
        />
        <PokemonAttributes ots={ots} pokemon={pokemon} />
      </CardContent>

      <CardFooter className="w-full justify-center p-4">
        <div className="grid grid-cols-2 items-center justify-center gap-2">
          {pokemon.moves.map((move) => (
            <PokemonMoveChip key={`${pokemon.species}.${move}`} move={move} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
