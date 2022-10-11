# frozen_string_literal: true

module Forms
  module Orders
    class OrderSearchForm
      include ActiveModel::Model

      attr_accessor :has_unfinished_items

      def submit
        @results = Order.all
        if has_unfinished_items.present?
          @results = @results.includes(:order_items)
                             .where
                             .not('order_items.status' => OrderItemStatusTypes['Delivered'])
        end
        @results
      end

      def results
        @results || []
      end
    end
  end
end
