class LoginsController < ApplicationController
  def create
    render json: { bearer_token: 'sdsdsdsdsd' }
  end
end
