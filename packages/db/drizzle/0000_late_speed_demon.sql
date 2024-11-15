-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "chat_messages" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"match_id" bigint NOT NULL,
	"content" text,
	"message_type" varchar,
	"sent_at" timestamp(6),
	"account_id" bigint,
	"profile_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clerk_users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"clerk_user_id" varchar NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"account_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friendly_id_slugs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"sluggable_id" integer NOT NULL,
	"sluggable_type" varchar(50),
	"scope" varchar,
	"created_at" timestamp(6)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_games" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"match_id" bigint NOT NULL,
	"winner_id" bigint,
	"loser_id" bigint,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"game_number" integer DEFAULT 1 NOT NULL,
	"ended_at" timestamp(6),
	"started_at" timestamp(6),
	"reporter_profile_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_staff_members" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"organization_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"account_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"species" varchar,
	"ability" varchar,
	"tera_type" varchar,
	"nature" varchar,
	"item" varchar,
	"move1" varchar,
	"move2" varchar,
	"move3" varchar,
	"move4" varchar,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"nickname" varchar,
	"pokemon_team_id" bigint DEFAULT 0 NOT NULL,
	"form" varchar,
	"position" integer DEFAULT 0 NOT NULL,
	"gender" integer DEFAULT 2 NOT NULL,
	"shiny" boolean DEFAULT false NOT NULL,
	"ev_hp" integer,
	"ev_atk" integer,
	"ev_def" integer,
	"ev_spa" integer,
	"ev_spd" integer,
	"ev_spe" integer,
	"iv_hp" integer,
	"iv_atk" integer,
	"iv_def" integer,
	"iv_spa" integer,
	"iv_spd" integer,
	"iv_spe" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"logo_url" varchar,
	"partner" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"slug" varchar,
	"limitless_org_id" bigint,
	"owner_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "phases" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tournament_id" bigint NOT NULL,
	"number_of_rounds" integer,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"type" varchar NOT NULL,
	"name" varchar,
	"best_of" integer DEFAULT 3 NOT NULL,
	"started_at" timestamp(6),
	"ended_at" timestamp(6),
	"order" integer DEFAULT 0 NOT NULL,
	"current_round_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tournament_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"team_sheet_submitted" boolean DEFAULT false NOT NULL,
	"checked_in_at" timestamp,
	"in_game_name" varchar DEFAULT '' NOT NULL,
	"pokemon_team_id" bigint,
	"dropped" boolean DEFAULT false NOT NULL,
	"disqualified" boolean DEFAULT false NOT NULL,
	"round_wins" integer DEFAULT 0 NOT NULL,
	"round_losses" integer DEFAULT 0 NOT NULL,
	"game_wins" integer DEFAULT 0 NOT NULL,
	"game_losses" integer DEFAULT 0 NOT NULL,
	"resistance" numeric(5, 2),
	"account_id" bigint NOT NULL,
	"profile_id" bigint NOT NULL,
	"show_country_flag" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "phase_players" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"player_id" bigint NOT NULL,
	"phase_type" varchar NOT NULL,
	"phase_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_teams" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"name" varchar,
	"format_id" bigint NOT NULL,
	"game_id" bigint NOT NULL,
	"archived_at" timestamp(6),
	"pokepaste_id" varchar,
	"profile_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rk9_tournaments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"rk9_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament_formats" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tournament_id" bigint NOT NULL,
	"format_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"image_url" varchar,
	"slug" varchar,
	"archived_at" timestamp(6),
	"account_id" bigint,
	"default" boolean DEFAULT false NOT NULL,
	"type" varchar DEFAULT 'Profile' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar DEFAULT '' NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"pronouns" varchar DEFAULT '' NOT NULL,
	"image_url" text,
	"admin" boolean DEFAULT false NOT NULL,
	"archived_at" timestamp(6),
	"default_profile_id" bigint,
	"country" varchar,
	"timezone" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"round_id" bigint NOT NULL,
	"table_number" integer,
	"player_one_id" bigint,
	"player_two_id" bigint,
	"winner_id" bigint,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"player_one_check_in" timestamp(6),
	"player_two_check_in" timestamp(6),
	"loser_id" bigint,
	"ended_at" timestamp(6),
	"tournament_id" bigint,
	"phase_id" bigint,
	"bye" boolean DEFAULT false NOT NULL,
	"reset_by_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "formats" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"game_id" bigint,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rounds" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"phase_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"round_number" integer DEFAULT 1 NOT NULL,
	"started_at" timestamp(6),
	"ended_at" timestamp(6)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"start_at" timestamp(6),
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"organization_id" bigint,
	"check_in_start_at" timestamp(6),
	"game_id" bigint,
	"format_id" bigint,
	"ended_at" timestamp(6),
	"registration_start_at" timestamp(6),
	"registration_end_at" timestamp(6),
	"player_cap" integer,
	"autostart" boolean DEFAULT false NOT NULL,
	"started_at" timestamp(6),
	"late_registration" boolean DEFAULT true NOT NULL,
	"teamlists_required" boolean DEFAULT true NOT NULL,
	"open_team_sheets" boolean DEFAULT true NOT NULL,
	"end_at" timestamp(6),
	"limitless_id" bigint,
	"published" boolean DEFAULT false NOT NULL,
	"current_phase_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schema_migrations" (
	"version" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ar_internal_metadata" (
	"key" varchar PRIMARY KEY NOT NULL,
	"value" varchar,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_messages" ADD CONSTRAINT "fk_rails_8e0becf885" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_messages" ADD CONSTRAINT "fk_rails_f9ae4172ee" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_messages" ADD CONSTRAINT "fk_rails_ef9208f8a6" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clerk_users" ADD CONSTRAINT "fk_rails_07d17e1c78" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_76cefaebc0" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_a2c90fc36d" FOREIGN KEY ("loser_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_be3d6ef1eb" FOREIGN KEY ("winner_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_8599a8b8df" FOREIGN KEY ("reporter_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_staff_members" ADD CONSTRAINT "fk_rails_c2051734c8" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_staff_members" ADD CONSTRAINT "fk_rails_a177a0142c" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon" ADD CONSTRAINT "fk_rails_5b6022737b" FOREIGN KEY ("pokemon_team_id") REFERENCES "public"."pokemon_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "fk_rails_ab574863f6" FOREIGN KEY ("owner_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phases" ADD CONSTRAINT "fk_rails_2909e41898" FOREIGN KEY ("current_round_id") REFERENCES "public"."rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phases" ADD CONSTRAINT "fk_rails_75e775589e" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "fk_rails_3c8ccf56fb" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "fk_rails_aeec102047" FOREIGN KEY ("pokemon_team_id") REFERENCES "public"."pokemon_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "fk_rails_d331b0f746" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "fk_rails_f96ec8a72f" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phase_players" ADD CONSTRAINT "fk_rails_71fbe65d92" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_teams" ADD CONSTRAINT "fk_rails_6e351688b8" FOREIGN KEY ("format_id") REFERENCES "public"."formats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_teams" ADD CONSTRAINT "fk_rails_e0513d6a9c" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_teams" ADD CONSTRAINT "fk_rails_5264a490c6" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_formats" ADD CONSTRAINT "fk_rails_08c15d3c37" FOREIGN KEY ("format_id") REFERENCES "public"."formats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_formats" ADD CONSTRAINT "fk_rails_c679052dc0" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "fk_rails_f44be28d09" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "fk_rails_5ce7a2836a" FOREIGN KEY ("default_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_af814604cc" FOREIGN KEY ("reset_by_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_36efc9f0f5" FOREIGN KEY ("phase_id") REFERENCES "public"."phases"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_973a5646ac" FOREIGN KEY ("loser_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_bfcd6a3c9f" FOREIGN KEY ("player_one_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_b58c6c3513" FOREIGN KEY ("player_two_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_9d0deeb219" FOREIGN KEY ("winner_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_e7c0250650" FOREIGN KEY ("round_id") REFERENCES "public"."rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_700eaa2935" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "formats" ADD CONSTRAINT "fk_rails_a0e0605606" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "fk_rails_8ef7ba6258" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "fk_rails_325ccadea6" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "fk_rails_40bc0fb494" FOREIGN KEY ("current_phase_id") REFERENCES "public"."phases"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_chat_messages_on_account_id" ON "chat_messages" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_chat_messages_on_match_id" ON "chat_messages" USING btree ("match_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_clerk_users_on_account_id" ON "clerk_users" USING btree ("account_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_clerk_users_on_clerk_user_id" ON "clerk_users" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_games_on_lower_name" ON "games" USING btree (lower((name)::text));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_friendly_id_slugs_on_slug_and_sluggable_type" ON "friendly_id_slugs" USING btree ("slug","sluggable_type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope" ON "friendly_id_slugs" USING btree ("slug","sluggable_type","scope");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id" ON "friendly_id_slugs" USING btree ("sluggable_type","sluggable_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_match_games_on_loser_id" ON "match_games" USING btree ("loser_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_match_games_on_match_id" ON "match_games" USING btree ("match_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_match_games_on_winner_id" ON "match_games" USING btree ("winner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_organization_staff_members_on_account_id" ON "organization_staff_members" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_organization_staff_members_on_organization_id" ON "organization_staff_members" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_pokemon_on_pokemon_team_id" ON "pokemon" USING btree ("pokemon_team_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_pokemon_on_pokemon_team_id_and_position" ON "pokemon" USING btree ("pokemon_team_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_organizations_on_name" ON "organizations" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_organizations_on_owner_id" ON "organizations" USING btree ("owner_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_organizations_on_slug" ON "organizations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_phases_on_current_round_id" ON "phases" USING btree ("current_round_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_phases_on_tournament_id" ON "phases" USING btree ("tournament_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_phases_on_type" ON "phases" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_players_on_account_id" ON "players" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_players_on_pokemon_team_id" ON "players" USING btree ("pokemon_team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_players_on_tournament_id" ON "players" USING btree ("tournament_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_phase_players_on_player_id" ON "phase_players" USING btree ("player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournament_phase_players_on_phase" ON "phase_players" USING btree ("phase_type","phase_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_pokemon_teams_on_format_id" ON "pokemon_teams" USING btree ("format_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_pokemon_teams_on_game_id" ON "pokemon_teams" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_rk9_tournaments_on_end_date" ON "rk9_tournaments" USING btree ("end_date");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_rk9_tournaments_on_name" ON "rk9_tournaments" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_rk9_tournaments_on_rk9_id" ON "rk9_tournaments" USING btree ("rk9_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_rk9_tournaments_on_start_and_end_date" ON "rk9_tournaments" USING btree ("start_date","end_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_rk9_tournaments_on_start_date" ON "rk9_tournaments" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournament_formats_on_format_id" ON "tournament_formats" USING btree ("format_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournament_formats_on_tournament_id" ON "tournament_formats" USING btree ("tournament_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_profiles_on_account_id" ON "profiles" USING btree ("account_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_profiles_on_slug" ON "profiles" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_profiles_on_username" ON "profiles" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_accounts_on_email" ON "accounts" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_loser_id" ON "matches" USING btree ("loser_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_phase_id" ON "matches" USING btree ("phase_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_player_one_id" ON "matches" USING btree ("player_one_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_player_two_id" ON "matches" USING btree ("player_two_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_matches_on_round_and_players_unique" ON "matches" USING btree ("round_id","player_one_id","player_two_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_tournament_id" ON "matches" USING btree ("tournament_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_winner_id" ON "matches" USING btree ("winner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_formats_on_game_id" ON "formats" USING btree ("game_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_formats_on_name_and_game_id" ON "formats" USING btree ("name","game_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_rounds_on_phase_id" ON "rounds" USING btree ("phase_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_rounds_on_phase_id_and_round_number" ON "rounds" USING btree ("phase_id","round_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournaments_on_current_phase_id" ON "tournaments" USING btree ("current_phase_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournaments_on_format_id" ON "tournaments" USING btree ("format_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournaments_on_game_id" ON "tournaments" USING btree ("game_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_tournaments_on_limitless_id" ON "tournaments" USING btree ("limitless_id") WHERE (limitless_id IS NOT NULL);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournaments_on_organization_id" ON "tournaments" USING btree ("organization_id");
*/