# frozen_string_literal: true

module Api
  class OrdersController < ApplicationController
    before_action :set_table, only: %i[create]
    before_action :set_order, only: %i[show]

    skip_before_action :authenticate_request, only: %i[create show]

    def index
      form = Forms::Orders::OrderSearchForm.new(order_search_form_params)
      form.submit

      render json: form.results, each_serializer: OrderSerializer
    end

    def show
      render json: @order, serializer: OrderSerializer
    end

    def create
      service = Services::Orders::Create.new(@table, order_params)
      service.call

      if service.errors.blank?
        render json: service.order, status: :created, serializer: OrderSerializer
      else
        render json: service.errors, status: :unprocessable_entity
      end
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

    def set_table
      @table = Table.find(params[:table_id])
    end

    def order_params
      params.permit(items: %i[
                      item_id
                      quantity
                    ]).require(:items)
    end

    def order_search_form_params
      params.permit(:has_unfinished_items)
    end
  end
end
