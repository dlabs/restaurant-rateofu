class Item < ApplicationRecord
  has_many :order_items, dependent: :destroy
  has_many :orders, through: :order_items

  enum :kind, { food: 0, drink: 1 }

  validates :title, presence: true, uniqueness: true
  validates :price, presence: true
  validates :description, presence: true
  validates :kind, presence: true
end
