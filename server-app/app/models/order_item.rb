class OrderItem < ApplicationRecord
  belongs_to :order, dependent: :destroy

  self.primary_key = "id"

  module Status
    Ordered = "ordered"
    Preparing = "preparing"
    ReadyToServe = "ready_to_serve"
  end

  def self.update(id, new_status)
    order_item = OrderItem.find(id)
    order_item.status = new_status
    order_item.save
  end

  def self.create_from_order(params)
    order, items = nil, nil
    ActiveRecord::Base.transaction do
      items = params[:items]
      order = Order.new(table_id: params[:table_id])
      order.save
      items.map! do |item|
        {
          id: SecureRandom.uuid,
          order_id: order.id,
          item_id: item[:item_id],
          quantity: item[:quantity],
          status: "ordered"
        }
      end
      OrderItem.insert_all(items)
    end

    [order, items]
  end

  def self.items_and_total_for(order)
    items = OrderItem.where(order_id: order.id)
    items_price_cents = Item.where(id: items.map(&:item_id)).pluck(:price_cents).sum
    total = Monetize.parse(items_price_cents / 100.0, "EUR")
    [items, total]
  end
end
