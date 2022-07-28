class OrderItem < ApplicationRecord
  enum status: %i[ordered preparing ready_to_serve delivered]
  belongs_to :order
  belongs_to :item

  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }

  def total_price
    item.price * quantity
  end
end
