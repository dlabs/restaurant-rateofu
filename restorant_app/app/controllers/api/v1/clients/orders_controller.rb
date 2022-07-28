class Api::V1::Clients::OrdersController < ApplicationController
  def index
    @orders = order_scope
  end

  def create
    @order = Order.create(order_params)
  end

  def show
    @order = Order.find(params[:id])
  end

  private

  def order_params
    order_params = params.permit(:table_id, { items: %i[item_id quantity] })
    order_params[:order_items_attributes] = order_params[:items]
    order_params.delete(:items)
    order_params.permit!
  end

  def order_scope
    if params[:has_unfinished_items]
      Order.has_unfinished_items
    else
      Order.all
    end
  end
end
