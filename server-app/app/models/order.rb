class Order < ApplicationRecord
  before_create :generate_uuid
  has_many :order_items

  self.primary_key = "id"
end
