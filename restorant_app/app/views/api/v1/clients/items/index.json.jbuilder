json.array!(@items) do |item|
  json.item_id item.id
  json.name item.name
  json.item_type item.item_type
  json.price item.price
end
