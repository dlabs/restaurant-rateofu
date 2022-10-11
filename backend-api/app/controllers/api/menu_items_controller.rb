# frozen_string_literal: true

module Api
  class MenuItemsController < ApplicationController
    skip_before_action :authenticate_request, only: %i[index]

    def index
      @menu_items = MenuItem.all

      render json: @menu_items, each_serializer: MenuItemSerializer
    end
  end
end
