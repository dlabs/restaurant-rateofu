# frozen_string_literal: true

module Services
  module Orders
    class Create
      attr_reader :errors, :order

      def initialize(table, params)
        @table = table
        @params = params
      end

      def call
        ActiveRecord::Base.transaction do
          create_order
          create_order_items
          update_total
        end
      rescue ActiveRecord::ActiveRecordError => e
        Rails.logger.error(e.message)
        @errors = e
      end

      private

      def create_order_items
        @total = 0
        @params.each do |item_params|
          item_params[:quantity].times do |_a|
            order_item = @order.order_items.new
            order_item.menu_item = menu_item(item_params[:item_id])
            @total += order_item.menu_item.price
            order_item.status = OrderItemStatusTypes[:ordered]
            order_item.save!
          end
        end
      end

      def create_order
        @order = @table.orders.create!
      end

      def menu_item(id)
        MenuItem.where(id: id).first
      end

      def update_total
        @order.total = @total
        @order.save!
      end
    end
  end
end
