class OrdersController < ApplicationController
  skip_before_action :authorized, except: :index

  def index
    if params[:has_unfinished_items] == "true"
      orders_with_unfinished_items = Order.with_unfinished_items
      render json:
        ActiveModelSerializers::SerializableResource.new(
          orders_with_unfinished_items,
          each_serializer: OrderSerializer
        ).to_json,
        status: 200
    else
      render json: {
        message: "Parameter is missing!"
      },
      status: 404
    end
  end

  def create
    order = Order.new(order_params)
    if order.save!
      render json:
        ActiveModelSerializers::SerializableResource.new(
        order,
        each_serializer: OrderSerializer
      ).to_json,
      status: :created
    else
      render json: order.errors, status: :unprocessable_entity
    end
  end

  def show
    order = Order.find(params[:id])
    if order
      render json:
        ActiveModelSerializers::SerializableResource.new(
          order,
          each_serializer: OrderSerializer
        ).to_json,
        status: 200
    else
      render json: {
        message: "The requested order could not be found!"
      },
      status: 404
    end
  end

  private

  def order_params
    order_params = params.slice(:table_id, :items)
    order_params[:order_items_attributes] = order_params[:items]
    order_params.delete(:items)
    order_params.permit!
  end
end
