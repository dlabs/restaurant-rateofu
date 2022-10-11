# frozen_string_literal: true

module Api
  class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request, only: %i[authenticate]

    def authenticate
      service = Users::Authenticate.new(params[:username], params[:role])
      service.call

      if service.token.present?
        render json: { bearer_token: service.token }
      else
        render json: { error: service.errors }, status: :unauthorized
      end
    end
  end
end
