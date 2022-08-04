class ApplicationController < ActionController::API
  SECRET_KEY = Rails.application.secret_key_base

  before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, SECRET_KEY)
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_staff_member
    if decoded_token
      staff_member_id = decoded_token[0]['staff_member_id']
      staff_member = StaffMember.find(staff_member_id)
    end
  end

  def logged_in?
    !!logged_in_staff_member
  end

  def authorized
    render json: { message: 'Please log in!' }, status: :unauthorized unless logged_in?
  end

end
