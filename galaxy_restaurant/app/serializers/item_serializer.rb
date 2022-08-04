class ItemSerializer < ActiveModel::Serializer
  attribute :id, key: :item_id
  attribute :title, key: :item_title
  attribute :price, key: :item_price
  attribute :description, key: :item_description
  attribute :kind, key: :item_type
  attribute :image, key: :item_image
end
