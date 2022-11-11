class OrderItem < ApplicationRecord
  self.primary_key = :order_item_id

  belongs_to :order
  belongs_to :item, class_name: 'MenuItem'
end
