import type { ValidatedPokemon, PokePasteMetadata } from "~/lib/pokemon/common";
import { PokemonCard } from "./pokemon-card";

interface PokemonShowdownSetFormProps {
  validatedTeam: ValidatedPokemon[] | null;
  metaData: PokePasteMetadata | null;
}

export function PokemonTeamDisplayGrid ({
  validatedTeam,
  metaData,
}: Readonly<PokemonShowdownSetFormProps>) {
  return (
    <>
      <div className="mb-4">
        <h1 className="flex items-center justify-center text-2xl font-bold">
          { metaData?.title ?? "Custom Team" }
        </h1>
        { metaData?.author && <p>Author: { metaData.author }</p> }
        { metaData?.format && <p>Format: { metaData.format }</p> }
      </div>

      <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-1 lg:grid-cols-2">
        { validatedTeam?.map(({ pokemon, invalid }, index) =>
        (
          <PokemonCard
            key={ pokemon.species || `pokemon-${index}` }
            ots
            invalid={ invalid }
            pokemon={ pokemon }
          />
        )
        ) }
      </div>
    </>
  );
}
