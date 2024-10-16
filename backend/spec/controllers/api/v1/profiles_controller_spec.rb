require "swagger_helper"
require_relative "../../../support/auth/token_verifier_mock"

RSpec.describe Api::V1::ProfilesController do
  include Auth::TokenVerifier::Mock
  include_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification"

  let(:account) { create(:account) }
  let(:profile) { create(:profile, account:) }
  let(:valid_attributes) { { user_name: "new_user", image_url: "http://example.com/image.png" } }
  let(:invalid_attributes) { { user_name: "", image_url: "" } }

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET #show" do
    context "with valid slug" do
      it "returns the profile" do
        get :show, params: { slug: profile.slug }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid slug" do
      it "returns not found" do
        get :show, params: { slug: "invalid-slug" }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Profile" do
        expect {
          post :create, params: valid_attributes
        }.to change(Profile, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid params" do
      it "returns unprocessable entity" do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
