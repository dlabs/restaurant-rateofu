# frozen_string_literal: true

class Order < ApplicationRecord
  monetize :total_cents

  belongs_to :table
  has_many :order_items, dependent: :destroy
end
