class Api::AuthenticationController < ApplicationController
  def login
    @user = User.find_by(username: params[:username], role: params[:role])
    if @user
      token = jwt_encode(user_id: @user.id)
      render json: { token: }, status: :ok
    else
      render json: { error: 'Invalid username or role' }, status: :unauthorized
    end
  end
end
