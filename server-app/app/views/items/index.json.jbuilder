json.array! @items do |item|
  json.item_id item.id
  json.item_title item.title
  json.item_price item.price_cents / 100.0
  json.item_description item.description
  json.item_type item.item_type
  json.item_image item.image_url
end
