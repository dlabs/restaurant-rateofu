class Order < ApplicationRecord
  belongs_to :table
  has_many :order_items, dependent: :destroy
  has_many :items, through: :order_items

  accepts_nested_attributes_for :order_items

  after_create :calculate_total_price

  scope :with_unfinished_items, -> {
    joins(:order_items).
    where(order_items: { status: %i[ordered preparing ready_to_serve] }).
    includes(:order_items)
  }

  private

  def calculate_total_price
    total_price = order_items.sum(&:price)
    self.update_attribute(:total, total_price)
  end
end
