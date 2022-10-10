# frozen_string_literal: true

class OrderItem < ApplicationRecord
  enumerate :status, with: OrderItemStatusTypes

  belongs_to :order
  belongs_to :menu_item
end
