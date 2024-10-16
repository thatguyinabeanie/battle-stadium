# typed: false

# file deepcode ignore HardcodedCredential: <please specify a reason of ignoring this>

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "faker"

if Rails.env.production?
  Rails.logger.info("Seeding is disabled in production.")
  exit
end

if ENV.fetch("SEED_DATA", "false") == "false"
  Rails.logger.info("Seeding is disabled by the SEED_DATA environment variable.")
  exit
end

# require 'factory_bot'

def create_battlestadium_bot
  Account.find_or_create_by!(username: "battlestadiumbot") do |account|
    account.email = "battlestadium@beanie.gg"
    account.pronouns = "they/them"
    account.first_name = "Battle"
    account.last_name = "Stadium"
    account.admin = true
  end
end

def create_account(username: nil, first_name: nil, last_name: nil, email: nil, pronouns: nil)
  first_name ||= Faker::Name.first_name
  last_name ||= Faker::Name.last_name
  email || "#{username}@beanie.com"
  pronouns ||= "they/them"
  username ||= Faker::Internet.unique.username
  # Check if Account already exists
  account = Account.find_or_create_by!(username:) do |account|
    account.email = "#{account.username}@beanie.gg"
    account.pronouns = pronouns
    account.first_name = last_name
    account.last_name = first_name
  end

  # Check if profile with the given username already exists
  profile = Profile.find_or_create_by!(username:) do |p|
    p.account = account
  end

  account.update!(default_profile: profile)
  account
end

def create_tournament(name:, organization:, format:, game:, start_at:, end_at:)
  Tournaments::Tournament.find_or_create_by!(name:, organization:, format:, game:) do |tournament|
    tournament.published = true
    tournament.start_at = start_at
    tournament.check_in_start_at = start_at - 1.hour
    tournament.end_at = end_at

    tournament.phases << Phases::Swiss.create!(
      name: "#{tournament.name} - Swiss Rounds",
      tournament:,
      number_of_rounds: 5
    )

    tournament.phases << Phases::SingleEliminationBracket.create!(
      name: "#{tournament.name} - Top Cut!",
      tournament:
    )
  end
end

def generate_organization_name
  adjective = Faker::Company.buzzword
  noun = Faker::Company.type

  "#{adjective} #{noun} #{rand(1..100)}"
end

def create_format(name:, game:)
  Tournaments::Format.find_or_create_by!(name:, game:)
end

scarlet_violet = Game.find_or_create_by!(name: "Pokemon Scarlet & Violet")

(1..10).to_a.map { |series| Game.find_or_create_by!(name: "Pokemon Series #{series}") }

format = Tournaments::Format.find_or_create_by!(name: "Regulation H", game: scarlet_violet)

fuecoco_supremacy_account = create_account(username: "fuecoco-supremacy", first_name: "Pablo", last_name: "Escobar", pronouns: "he/him")
fuecoco_supremacy_account.admin = true
fuecoco_supremacy_account.save!

org_owners = (1..25).to_a.map { create_account }

orgs = org_owners.map do |owner|
  Organization.find_or_create_by!(owner:) do |org|
    org.description = Faker::Lorem.sentence
    org.staff = (1..5).to_a.map { create_account }
    org.staff << fuecoco_supremacy_account
    org.name = generate_organization_name
  end
end.uniq

count = 0
accounts = (1..50).to_a.map { create_accounts }.uniq

future_tournaments = orgs.flat_map do |organization|
  (1..10).to_a.map do
    name = "#{organization.name} # #{organization.tournaments.count + 1}"
    start_at = (1.day.from_now.beginning_of_day + rand(8..20).hours) + (count % 10).weeks
    end_at = start_at + 10.hours
    tour = create_tournament(name:, organization:, format:, game: format.game, start_at:, end_at:)
    count += 1
    tour
  end
end

future_tournaments.flat_map do |tournament|
  accounts.map do |account|
    next if tournament.players.exists?(account:) || !tournament.registration_open?

    tournament.players.create!(account:, in_game_name: Faker::Games::Pokemon.name, profile: account.default_profile).tap do |player|
      player.pokemon_team = PokemonTeam.create(profile: player.profile).tap do |pokemon_team|
        pokemon_team.pokemon = (1..6).to_a.map do
          Pokemon.create(pokemon_team:)
        end
      end
    end
  end
end

in_progress_tournaments = orgs.flat_map do |organization|
  name = "#{organization.name} Tournament #{organization.tournaments.count + 1}"
  end_at = Time.zone.today + 1.week
  game = format.game
  start_at = 1.hour.from_now
  create_tournament(name:, organization:, format:, game:, start_at:, end_at:).tap do |tournament|
    tournament.players = accounts.map do |account|
      next if tournament.players.exists?(account:)

      tournament.players.create!(account:, in_game_name: Faker::Games::Pokemon.name, profile: account.default_profile).tap do |player|
        player.pokemon_team = PokemonTeam.create(profile: player.profile).tap do |pokemon_team|
          pokemon_team.pokemon = (1..6).to_a.map do
            Pokemon.create(pokemon_team:)
          end
        end
      end
    end
  end
end

in_progress_tournaments.each do |tournament|
  tournament.start! if tournament.players.checked_in_and_submitted_team_sheet.count.positive?
end
