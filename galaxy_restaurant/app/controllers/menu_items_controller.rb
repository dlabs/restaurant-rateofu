class MenuItemsController < ApplicationController
  skip_before_action :authorized

  def index
    items = Item.all
    render json:
      ActiveModelSerializers::SerializableResource.new(
        items,
        each_serializer: ItemSerializer
      ).to_json,
      status: 200
  end
end
