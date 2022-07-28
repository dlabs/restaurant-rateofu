class Order < ApplicationRecord
  belongs_to :table
  has_many :order_items, dependent: :destroy
  has_many :items, through: :order_items
  accepts_nested_attributes_for :order_items, allow_destroy: true

  validates :table, presence: true

  scope :has_unfinished_items, -> { joins(:order_items).where(order_items: { status: %i[ordered preparing] }) }

  def total_price
    order_items.sum(&:total_price)
  end
end
