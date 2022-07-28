class Item < ApplicationRecord
  enum item_type: %i[food drink]

  has_many :order_items, dependent: :destroy
  has_many :orders, through: :order_items

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :item_type, presence: true
end
