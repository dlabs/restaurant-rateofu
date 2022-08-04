class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :item

  validates :quantity, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(ordered preparing ready_to_serve delivered) }

  enum :status, { ordered: 0, preparing: 1, ready_to_serve: 2, delivered: 3 }

  def price
    item.price * quantity
  end
end
