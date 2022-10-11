# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AuthorizeApiRequest' do
  describe '#call' do
    let(:user) { create(:user) }
    let(:token) { Jwt::JsonWebToken.encode(user_id: user.id) }
    let(:service) { Api::AuthorizeApiRequest.new(headers) }

    context 'when have correct params' do
      let(:headers) { { 'Authorization' => token } }

      it 'sets user' do
        service.call

        result = service.user
        expected_result = user.id
        expect(result.id).to eql(expected_result)
      end
    end

    context 'when have incorrect params' do
      let(:headers) { {} }

      it 'sets errors' do
        service.call

        result = service.errors
        expected_result = 'Invalid token'
        expect(result).to eql(expected_result)
      end
    end
  end
end
