require_relative "serializer_mixin"
require_relative "game_serializer"
require_relative "format_serializer"
require_relative "organization_serializer"
require_relative "phase_serializer"

module Serializers
  module TournamentMixin
    extend ActiveSupport::Concern
    included do
      class_attribute :organization_serializer

      include SerializerMixin::Id
      include SerializerMixin::Name
      attributes :player_cap, :player_count
      attributes :game, :format
      attributes :organization
      attributes :registration_start_at, :registration_end_at, :late_registration
      attributes :start_at, :started_at, :end_at, :ended_at, :published
      belongs_to :game, serializer: Serializers::Game
      belongs_to :format, serializer: Serializers::Format
      has_many :phases, serializer: Serializers::Phase

      def player_count
        object.players.count
      end

      def organization
        @organization ||= organization_serializer.new(object.organization)
      end
    end
  end

  class Tournament < ActiveModel::Serializer
    include TournamentMixin
    self.organization_serializer = Serializers::Organization
  end

  class TournamentDetails < ActiveModel::Serializer
    include TournamentMixin
    self.organization_serializer = Serializers::Organization
    attributes :check_in_start_at
    attributes :autostart
    # attributes :description
    attributes :open_team_sheets, :teamlists_required

    # has_many :phases, serializer: PhaseSerializer
  end
end
