class ItemsController < ApplicationController
  def index
    @items = Item.all.limit(100)
  end
end
