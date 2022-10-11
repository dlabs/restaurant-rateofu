# frozen_string_literal: true

module Api
  class OrderItemsController < ApplicationController
    before_action :set_order_item, only: %i[update]

    skip_before_action :authenticate_request, only: %i[update]

    def update
      service = Services::OrderItems::Update.new(@order_item, order_item_params)
      service.call

      if service.errors.blank?
        render json: service.order_item
      else
        render json: service.errors, status: :unprocessable_entity
      end
    end

    private

    def set_order_item
      @order_item = OrderItem.find(params[:id])
    end

    def order_item_params
      params.require(:order_item).permit(:status)
    end
  end
end
