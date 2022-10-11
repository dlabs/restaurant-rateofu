# frozen_string_literal: true

module Users
  class Authenticate
    attr_reader :token, :errors

    def initialize(username, role)
      @username = username
      @role = role
    end

    def call
      set_user
      create_token if @user.present?
    end

    private

    def create_token
      @token = Jwt::JsonWebToken.encode(user_id: @user.id)
    end

    def set_user
      @user = User.where(username: @username, role: UserRoleTypes[@role]).first
      return @user if @user

      @errors = 'invalid credentials'
      nil
    end
  end
end
