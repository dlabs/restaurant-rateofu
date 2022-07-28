require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :request do
  describe 'POST #login' do
    it 'returns a token' do
      user = create(:user)
      params = {
        username: user.username,
        role: user.role
      }

      post api_login_path, params: params, xhr: true

      expect(response).to have_http_status(200)
      expect(response.body).to include('token')
    end

    it 'returns an error if the username or role is invalid' do
      params = {
        username: 'invalid',
        role: 'invalid'
      }

      post api_login_path, params: params, xhr: true

      expect(response).to have_http_status(401)
      expect(response.body).to include('Invalid username or role')
    end
  end
end
