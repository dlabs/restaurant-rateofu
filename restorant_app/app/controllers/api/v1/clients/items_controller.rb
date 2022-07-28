class Api::V1::Clients::ItemsController < ApplicationController
  def index
    @items = Item.all
  end
end
