class Api::V1::Staff::OrderItemsController < ApplicationController
  before_action :authorize

  def show
    @order_item = OrderItem.find(params[:id])
    render json: @order_item
  end

  def update
    @order_item = OrderItem.find(params[:id])
    if @order_item.update(order_item_params)
      render json: @order_item
    else
      render json: { error: @order_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def order_item_params
    params.require(:order_item).permit(:status)
  end
end
