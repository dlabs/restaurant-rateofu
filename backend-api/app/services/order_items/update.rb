# frozen_string_literal: true

module Services
  module OrderItems
    class Update
      attr_reader :errors, :order_item

      def initialize(order_item, params)
        @order_item = order_item
        @params = params
      end

      def call
        update_status if @params[:status]
      rescue ActiveRecord::ActiveRecordError => e
        Rails.logger.error(e.message)
        @errors = e
      end

      private

      def update_status
        @order_item.status = status_id
        @order_item.save!
      end

      def status_id
        OrderItemStatusTypes.values.find { |item| item[2][:symbol] == @params[:status].to_sym }[0]
      end
    end
  end
end
