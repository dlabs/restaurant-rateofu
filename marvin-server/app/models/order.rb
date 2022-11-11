class Order < ApplicationRecord
  self.primary_key = :order_id

  has_many :order_items

  accepts_nested_attributes_for :order_items
end
