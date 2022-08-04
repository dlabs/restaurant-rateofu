class OrderItemsController < ApplicationController

  def update
    order_item = OrderItem.find(params[:orderItemId])
    if order_item.update!(update_params)
      render json:
        ActiveModelSerializers::SerializableResource.new(
          order_item,
          each_serializer: OrderItemSerializer
        ).to_json,
        status: 200
    else
      render json: {
        message: "Please try again!"
      },
      status: :unprocessable_entity
    end
  end

  private

  def update_params
    params.permit(:status)
  end
end
