# frozen_string_literal: true

module Api
  class MenuItemsController < ApplicationController
    def index
      @menu_items = MenuItem.all

      render json: @menu_items, each_serializer: MenuItemSerializer
    end
  end
end
