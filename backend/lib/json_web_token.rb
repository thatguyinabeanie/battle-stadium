# lib/json_web_token.rb

require "openssl"
require "json/jwt"

module JsonWebToken
  BACKEND_PRIVATE_KEY_PEM = File.read(Rails.root.join("../config/keys/backend_private.pem"))
  FRONTEND_PUBLIC_KEY_PEM = File.read(Rails.root.join("../config/keys/frontend_public.pem"))

  BACKEND_PRIVATE_KEY = OpenSSL::PKey::RSA.new(BACKEND_PRIVATE_KEY_PEM)
  FRONTEND_PUBLIC_KEY = OpenSSL::PKey::RSA.new(FRONTEND_PUBLIC_KEY_PEM)
  def self.decrypt(token)
    Rails.logger.info "Attempting to decrypt token"

    if token.nil? || token.empty?
      Rails.logger.error "Token is nil or empty"
      return nil
    end

    Rails.logger.debug "Input token size: #{token.bytesize} bytes"

    begin
      # Decode the JWE using the backend's private key
      jwe = JSON::JWT.decode(token, BACKEND_PRIVATE_KEY)
      Rails.logger.debug "JWE decoded successfully"

      # Decode the JWS using the frontend's public key
      jws = JSON::JWT.decode(jwe.plain_text, FRONTEND_PUBLIC_KEY)
      Rails.logger.debug "JWS decoded successfully"

      jws
    rescue JSON::JWT::InvalidFormat => e
      Rails.logger.error "Invalid token format: #{e.message}"
    rescue OpenSSL::PKey::RSAError => e
      Rails.logger.error "RSA key error: #{e.message}"
    rescue OpenSSL::Cipher::CipherError => e
      Rails.logger.error "Decryption error: #{e.message}"
    rescue JSON::JWT::VerificationFailed => e
      Rails.logger.error "JWT verification failed: #{e.message}"
    rescue StandardError => e
      Rails.logger.error "Unexpected error during decryption: #{e.class} - #{e.message}"
      Rails.logger.error e.backtrace.join("\n")
    end

    Rails.logger.error "Failed to decrypt token"
    nil
  end

  def self.encrypt(payload)
    begin
      # Sign the payload with the backend's private key
      jws = JSON::JWT.new(payload).sign(BACKEND_PRIVATE_KEY, :RS512)

      # Encrypt the signed JWT with the frontend's public key
      jwe = JSON::JWE.new(jws).encrypt(FRONTEND_PUBLIC_KEY, :RSA_OAEP_256, :A256GCM)

      jwe.to_s
    rescue StandardError => e
      Rails.logger.error "Failed to encrypt token: #{e.message}"
      nil
    end
  end
end
