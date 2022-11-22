json.order_id @order.id
json.table_id @order.table_id
json.order_items do
  json.array! @items do |item|
    json.item_id item[:id]
    json.quantity item[:quantity]
  end
end
