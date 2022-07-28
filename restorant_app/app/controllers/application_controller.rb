class ApplicationController < ActionController::API
  include JsonWebToken

  def authorize
    header = request.headers['Authorization']
    if header.present?
      header = header.split(' ').last
      decoded = jwt_decode(header)
      @current_user = User.find(decoded[:user_id])
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end
end
