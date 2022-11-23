class Order < ApplicationRecord
  before_create :generate_uuid
  has_many :order_items

  self.primary_key = "id"

  def self.only_unfinished_items
    res = []
    order_items = OrderItem.where("status != 'delivered'")
    order_items.group_by(&:order_id).each do |order_id, order_items|
      order = Order.find(order_id)
      curr = {
        order_id: order.id,
        table_id: order.table_id,
        order_items: order_items,
      }
      res << curr
    end
    res
  end

  def self.all_items
    res = []
    order_items = OrderItem.all
    order_items.group_by(&:order_id).each do |order_id, order_items|
      order = Order.find(order_id)
      curr = {
        order_id: order.id,
        table_id: order.table_id,
        order_items: order_items,
      }
      res << curr
    end
    res
  end
end
