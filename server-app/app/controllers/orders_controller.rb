class OrdersController < ApplicationController
  def index
    if params["has_unfinished_items"] == "true"
      @order_items = Order.only_unfinished_items
    else
      @order_items = Order.all_items
    end
  end

  def create
    @order, @items = OrderItem.create_from_order(params)
    render :create, status: :created
  end

  def show
    @order = Order.find_by(id: params["id"])
    @items, @total = OrderItem.items_and_total_for(@order)
  end

  def update
    new_status = params["status"]
    OrderItem.update(params["orderItemId"], new_status)
  end
end
