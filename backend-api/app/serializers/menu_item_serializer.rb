# frozen_string_literal: true

class MenuItemSerializer < ActiveModel::Serializer
  attributes :item_id, :item_title, :item_price, :item_description,
             :item_type, :item_image

  include Rails.application.routes.url_helpers

  # GET /api/menu-items
  # Example response payload
  # [
  #   {
  #     "item_id": "e95321ac-f0d5-4009-8420-da8fc17c7731",
  #     "item_title": "Example item",
  #     "item_price": 29.25,
  #     "item_description": "Example description",
  #     "item_type": "food" | "drink",
  #     "item_image": "https://miro.medium.com/max/699/1*UfV5sxZUkgyUQIyZf8Wzjg.png"
  #   },
  #   ...
  # ]

  def item_id
    object.id
  end

  def item_title
    object.title
  end

  def item_price
    object.price
  end

  def item_description
    object.description
  end

  def item_type
    object.type(:name)
  end

  def item_image
    rails_blob_url(object.image, host: ENV['APPLICATION_HOST']) if object.image.attached?
  end
end
