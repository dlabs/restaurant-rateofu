class OrderItemSerializer < ActiveModel::Serializer
  attribute :id, key: :order_item_id
  attributes :item_id, :status
end
