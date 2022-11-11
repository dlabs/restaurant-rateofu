class OrderItemsController < ApplicationController
  def update
    @order_item = OrderItem.find(params[:id])
    @order_item.status = params[:status]
    @order_item.save
    render json: @order_item
  end
end
