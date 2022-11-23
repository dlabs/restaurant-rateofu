class SessionsController < ApplicationController
  def new
    # TODO: make user login with password and JWT secrets
    employee = Employee.find_or_create_by(username: user_params[:username], role: user_params[:role])
    payload = { username: employee.username, role: employee.role }
    @token = JWT.encode payload, nil, 'none'
  end

  def destroy
  end

  private

  def user_params
    params.require(:session).permit(:username, :role)
  end
end
