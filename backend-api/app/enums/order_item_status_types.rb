# frozen_string_literal: true

class OrderItemStatusTypes < ActiveEnum::Base
  value id: 1, name: 'Ordered', symbol: :ordered
  value id: 2, name: 'Preparing', symbol: :preparing
  value id: 3, name: 'Ready to serve', symbol: :ready_to_serve
  value id: 4, name: 'Delivered', symbol: :delivered
end
