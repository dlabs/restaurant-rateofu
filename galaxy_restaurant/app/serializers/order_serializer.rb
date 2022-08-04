class OrderSerializer < ActiveModel::Serializer
  attribute :id, key: :order_id

  attributes :table_id, :order_items

  attribute :total, key: :order_total

  def order_items
    object.order_items.map do |order_item|
      {
        order_item_id: order_item.id,
        item_id: order_item.item_id,
        status: order_item.status
      }
    end
  end
end
