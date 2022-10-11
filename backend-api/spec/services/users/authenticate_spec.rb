# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Authenticate' do
  describe '#call' do
    let(:user) { create(:user) }
    let(:service) { Users::Authenticate.new(params[:username], params[:role]) }

    context 'when have correct params' do
      let(:params) { { username: user.username, role: 'Chef' } }

      it 'generates token' do
        service.call

        token = service.token
        key = Rails.application.secrets.secret_key_base
        expect { JWT.decode(token, key) }.not_to raise_error(JWT::DecodeError)
      end
    end

    context 'when have incorrect params' do
      let(:params) { { username: user.username, role: 'TestTestTest' } }

      it 'adds error' do
        service.call

        result = service.errors
        expected_result = 'invalid credentials'
        expect(result).to eql(expected_result)
      end
    end
  end
end
