json.array! @order_items do |o|
  json.order_id o[:order_id]
  json.table_id o[:table_id]
  json.order_items o[:order_items] do |item|
    json.order_item_id item.id
    json.item_id item.item_id
    json.status item.status
  end
end
