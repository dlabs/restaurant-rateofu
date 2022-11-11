class OrdersController < ApplicationController
  def index
    @orders = Order.all
    render json: @orders, include: [:order_items]
  end

  def show
    @order = Order.find(params[:id])
    render json: @order, include: [:order_items]
  end

  def create
    @order = Order.new(order_params)

    # Since the API call is legacy and doesn't have the Rails structure
    # for nested attributes, we have to create everything explicitly
    if @order.save
      items_params[:items].each do |item|
        order_item = OrderItem.new
        order_item.item_id = item[:item_id]
        order_item.quantity = item[:quantity]
        order_item.order_id = @order.id
        order_item.save
      end
    end
    render json: @order, include: [:order_items]
  end

  private

  def order_params
    params.require(:order).permit(:table_id)
  end

  def items_params
    params.permit(:table_id, order: [:table_id], items: %i[item_id quantity])
  end
end
