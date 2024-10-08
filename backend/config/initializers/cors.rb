# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  if Rails.env.development?
    allow do
      origins ["*"]

      resource "*",
              headers: :any,
              methods: %i[get post put patch delete options head],
              expose: [:Authorization]
    end
  else
    allow do
      origins (ENV["CORS_ALLOWED_ORIGINS"] || "").split(",")

      resource "*",
              headers: :any,
              methods: %i[get post put patch delete options head],
              expose: [:Authorization]
    end
  end
end
