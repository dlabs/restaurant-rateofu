# frozen_string_literal: true

class OrderSerializer < ActiveModel::Serializer
  attributes :order_id, :table_id, :order_items, :order_total

  def order_id
    object.id
  end

  def table_id
    object.table.id
  end

  def order_items
    items = []
    object.order_items.each do |item|
      items << order_(item)
    end
    items
  end

  def order_(item)
    {
      order_item_id: item.id,
      item_id: item.menu_item.id,
      status: item.status(:symbol)
    }
  end

  def order_total
    ActionController::Base.helpers.humanized_money(object.total)
  end
end
