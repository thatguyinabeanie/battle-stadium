/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type {
  APIEmbed,
  APIInteractionDataOptionBase,
  ApplicationCommandOptionType,
} from "discord-api-types/v10";
import type { NextRequest } from "next/server";
import type Pokedex from "pokedex-promise-v2";
import { NextResponse } from "next/server";
import {
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "discord-api-types/v10";
import { nanoid } from "nanoid";

import type { RandomPicType } from "~/lib/discord/commands";
import { env } from "~/env";
import { commands } from "~/lib/discord/commands";
import { verifyInteractionRequest } from "~/lib/discord/verify-incoming-request";
import { auth } from "@clerk/nextjs/server";

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * If you want to use node runtime, you can change this to `node`, but you'll also have to polyfill fetch (and maybe other things).
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */
export const runtime = "edge";

const ROOT_URL = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : env.ROOT_URL;

function capitalizeFirstLetter (s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Handle Discord interactions. Discord will send interactions to this endpoint.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
 */
export async function POST (request: NextRequest) {

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Logged in account is required" },
      { status: 401 },
    );
  }

  if (!env.DISCORD_APP_PUBLIC_KEY || !env.DISCORD_APP_ID) {
    return new NextResponse(
      "DISCORD_APP_PUBLIC_KEY or DISCORD_APP_ID not initialized",
      { status: 500 },
    );
  }

  const verifyResult = await verifyInteractionRequest(
    request,
    env.DISCORD_APP_PUBLIC_KEY,
  );

  if (!verifyResult.isValid || !verifyResult.interaction) {
    return new NextResponse("Invalid request", { status: 401 });
  }
  const { interaction } = verifyResult;

  if (interaction.type === InteractionType.Ping) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return NextResponse.json({ type: InteractionResponseType.Pong });
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
    const { name } = interaction.data;

    switch (name) {
      case commands.ping.name: {
        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: `Pong` },
        });
      }
      case commands.invite.name: {
        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: `Click this link to add NextBot to your server: https://discord.com/api/oauth2/authorize?client_id=${env.DISCORD_APP_ID}&permissions=2147485696&scope=bot%20applications.commands`,
            flags: MessageFlags.Ephemeral,
          },
        });
      }
      case commands.pokemon.name: {
        if (!interaction.data.options || interaction.data.options.length < 1) {
          return NextResponse.json({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: "Oops! Please enter a Pokemon name or Pokedex number.",
              flags: MessageFlags.Ephemeral,
            },
          });
        }

        const option = interaction.data.options[0];

        // @ts-expect-error copy pasta
        const idOrName = String(option.value).toLowerCase();

        try {
          const pokemon: Pokedex.PokemonSpecies = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${idOrName}`,
          ).then((res) => {
            return res.json();
          });
          const types = pokemon.types.reduce(
            (prev: string[], curr: { type: { name: string } }) => [
              ...prev,
              capitalizeFirstLetter(curr.type.name),
            ],
            [],
          );

          return NextResponse.json({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              embeds: [
                {
                  title: capitalizeFirstLetter(pokemon.name),
                  image: {
                    url: `${ROOT_URL}/api/pokemon/${idOrName}`,
                  },
                  fields: [
                    {
                      name: "Pokedex",
                      value: `#${String(pokemon.id).padStart(3, "0")}`,
                    },
                    {
                      name: "Type",
                      value: types.join("/"),
                    },
                  ],
                },
              ],
            },
          });
        } catch (error) {
          console.error("error fetching pokemon", error);
          throw new Error("Something went wrong :(");
        }
      }
      case commands.randompic.name: {
        const { options } = interaction.data;

        if (!options) {
          return new NextResponse("Invalid request", { status: 400 });
        }

        const { value } = options[0] as APIInteractionDataOptionBase<
          ApplicationCommandOptionType.String,
          RandomPicType
        >;
        const embed = await getRandomPic(value);

        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { embeds: [embed] },
        });
      }
      default:
      // Pass through, return error at end of function
    }
  }

  return new NextResponse("Unknown command", { status: 400 });
}

const baseRandomPicEmbed = {
  title: "Random Pic",
  description: "Here's your random pic!",
};

/**
 * @see https://discord.com/developers/docs/resources/channel#embed-object
 */
const createEmbedObject = (source: string, path: string): APIEmbed => {
  return {
    ...baseRandomPicEmbed,
    fields: [{ name: "source", value: source }],
    image: {
      url: `${source}${path}`,
    },
  };
};

/**
 * Fetches a random picture and returns it as a Discord image embed.
 */
const getRandomPic = async (value: RandomPicType) => {
  switch (value) {
    case "cat": {
      const catResponse = await fetch("https://cataas.com/cat?json=true");
      const catData = await catResponse.json();
      const { url: catUrl } = catData;

      return {
        ...createEmbedObject("https://cataas.com", catUrl as string),
        description: "Here's a random cat picture!",
      };
    }
    case "dog": {
      const dogResponse = await fetch(
        "https://dog.ceo/api/breeds/image/random",
      );
      const dogData = await dogResponse.json();
      const { message: dogUrl } = dogData;

      return {
        ...baseRandomPicEmbed,
        description: "Here's a random dog picture!",
        fields: [{ name: "source", value: "https://dog.ceo/api" }],
        image: { url: dogUrl },
      };
    }
    default:
      return createEmbedObject(
        "https://picsum.photos",
        `/seed/${nanoid()}/500`,
      );
  }
};
