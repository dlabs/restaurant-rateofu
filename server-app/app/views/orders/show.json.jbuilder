json.order_id @order.id
json.table_id @order.table_id
json.order_items do
  json.array! @items do |item|
    json.order_item_id item.order_id
    json.item_id item.item_id
    json.status item.status
  end
end
json.order_total @total.to_f
