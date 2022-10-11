# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

  def authenticate_request
    service = Api::AuthorizeApiRequest.new(request.headers)
    service.call
    @current_user = service.user
    render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_user
  end
end
