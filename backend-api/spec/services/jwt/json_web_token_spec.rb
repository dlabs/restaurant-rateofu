# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'JsonWebToken' do
  describe '#encode' do
    let(:user) { create(:user) }
    let(:token) { Jwt::JsonWebToken.encode(user_id: user.id) }

    it 'generates token' do
      key = Rails.application.secrets.secret_key_base
      expect { JWT.decode(token, key) }.not_to raise_error(JWT::DecodeError)
    end
  end

  describe '#decode' do
    let(:user) { create(:user) }
    let(:token) { Jwt::JsonWebToken.encode(user_id: user.id) }
    let(:headers) { { 'Authorization' => token } }
    let(:key) { headers['Authorization'].split(' ').last }

    it 'decodes token' do
      expect { Jwt::JsonWebToken.decode(key) }.not_to raise_error(JWT::DecodeError)
    end

    it 'returns user_id' do
      decoded_token = Jwt::JsonWebToken.decode(key)
      expect(decoded_token['user_id']).to eql(user.id)
    end
  end
end
