# frozen_string_literal: true

module Api
  class AuthorizeApiRequest
    attr_reader :errors, :user, :headers

    def initialize(headers = {})
      @headers = headers
    end

    def call
      auth_user
    end

    private

    def auth_user
      @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
      @user || add_error('Invalid token')
    end

    def add_error(message)
      @errors = message
    end

    def decoded_auth_token
      @decoded_auth_token ||= Jwt::JsonWebToken.decode(http_auth_header)
    end

    def http_auth_header
      return headers['Authorization'].split(' ').last if headers['Authorization'].present?
    end
  end
end
