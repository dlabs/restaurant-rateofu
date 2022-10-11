# frozen_string_literal: true

class MenuItemSerializer < ActiveModel::Serializer
  attributes :item_id, :item_title, :item_price, :item_description,
             :item_type, :item_image

  include Rails.application.routes.url_helpers

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
