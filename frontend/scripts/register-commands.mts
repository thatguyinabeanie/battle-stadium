// frontend/scripts/registerCommands.ts

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import { join } from "path";
dotenv.config({ path: join(process.cwd(), ".env") });
// import { env } from "../env.mjs";

const commands = [
  {
    name: "invite",
    description: "Get the invite link for NextBot.",
  },
  {
    name: "pokemon",
    description: "Get information about a Pokemon.",
    options: [
      {
        name: "name",
        description: "The name or Pokedex number of the Pokemon.",
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_APP_TOKEN as string);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, process.env.DISCORD_GUILD_ID as string),
      {
        body: Object.values(commands),
      },
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
})();
