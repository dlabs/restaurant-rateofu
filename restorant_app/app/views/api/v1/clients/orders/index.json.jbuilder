json.array!(@orders) do |order|
  json.order_id order.id
  json.table_id order.table_id
  json.order_items do
    json.array!(order.order_items) do |item|
      json.order_item_id item.id
      json.item_id item.item_id
      json.status item.status
    end
  end
end
