class OrdersController < ApplicationController
  def index
    @orders = Order.all.limit(100)
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
    new_status = params["order"]["status"]
    OrderItem.update(params["orderItemId"], new_status)
  end
end
