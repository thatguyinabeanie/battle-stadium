require "pundit"
require_relative "../../lib/auth/clerk/session"
require_relative "../../lib/auth/clerk/token_verifier"
require_relative "../../lib/auth/vercel/token_verifier"

class ApplicationController < ActionController::Base
  attr_reader :current_account
  include Pundit::Authorization

  after_action :verify_authorized
  before_action :authenticate_clerk_user_session!
  before_action :validate_vercel_oidc_token! unless Rails.env.development?
  skip_before_action :authenticate_clerk_user_session!, only: %i[index show]

  def self.policy_class
    ::ApplicationPolicy
  end

  def index
    authorize self.class, :index?
  end

  def show
    authorize @object, :show?
  end

  protected

  def validate_vercel_oidc_token!
    unless ::Auth::Vercel::TokenVerifier.verify(request:)
      render json: { error: "Invalid OIDC token" }, status: :unauthorized
    end
  rescue
    render json: { error: "Invalid OIDC token" }, status: :unauthorized
  end

  def authenticate_clerk_user_session!
    @current_account = ::Auth::Clerk::Session.authenticate!(request:)
    @current_account
  rescue StandardError => e
    Rails.logger.error(e.message)
  end

  def pundit_user
    current_account
  end
end
