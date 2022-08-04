class AuthenticationController < ApplicationController
  skip_before_action :authorized

  def login
    staff_member = StaffMember.find_by(username: params[:username], role: params[:role])
    if staff_member
      token = encode_token({staff_member_id: staff_member.id})
      render json: { bearer_token: token }
    else
      render json: { error: "Invalid username or role" }
    end
  end
end
